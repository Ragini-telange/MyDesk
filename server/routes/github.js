// routes/github.js
// Express router for GitHub OAuth authentication, repository management,
// and DSA solution synchronization.

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const path = require('path');
const { protect } = require('../middleware/auth');
const OAuthState = require('../models/OAuthState');
const GitHubIntegration = require('../models/GitHubIntegration');
const Submission = require('../models/Submission');
const {
  getAuthenticatedUser,
  getUserRepositories,
  validateRepoOwnership,
  createStudentRepo,
  syncSubmissionToGitHub
} = require('../utils/githubSync');

// Load DSA questions metadata cache for README generation
let dsaQuestions = [];
(async () => {
  try {
    const dsaPath = path.resolve(__dirname, '../../client/src/data/dsaQuestions.js');
    const fileUrl = 'file:///' + dsaPath.replace(/\\/g, '/');
    const mod = await import(fileUrl);
    dsaQuestions = mod.DSA_QUESTIONS || [];
  } catch (err) {
    // In test environments
  }
})();

/**
 * GET /api/github/auth-url
 * Generates GitHub OAuth authorization URL with one-time expiring state token
 */
router.get('/auth-url', protect, async (req, res) => {
  try {
    const clientId = (process.env.GITHUB_CLIENT_ID || '').trim();
    const callbackUrl = (process.env.GITHUB_CALLBACK_URL || 'http://localhost:5000/api/github/callback').trim();

    if (!clientId) {
      return res.status(200).json({
        success: false,
        configured: false,
        message: 'GITHUB_CLIENT_ID is not configured in server/.env. Please configure GitHub OAuth credentials.'
      });
    }

    // Generate random one-time state to prevent CSRF
    const stateToken = crypto.randomBytes(24).toString('hex');

    // Save state associated with authenticated student (expires automatically in 10 minutes)
    await OAuthState.create({
      state: stateToken,
      user: req.user._id
    });

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: callbackUrl,
      scope: 'repo read:user',
      state: stateToken
    });

    const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;

    return res.json({
      success: true,
      configured: true,
      authUrl
    });
  } catch (error) {
    console.error('Error generating GitHub auth URL:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to initiate GitHub authorization flow.'
    });
  }
});

/**
 * GET /api/github/callback
 * Handles OAuth redirect from GitHub, validates one-time state, exchanges token, and saves encrypted credentials
 */
router.get('/callback', async (req, res) => {
  const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/+$/, '');
  const { code, state, error, error_description } = req.query;

  if (error) {
    console.error('GitHub OAuth callback returned error:', error, error_description);
    return res.redirect(`${clientUrl}/github?error=${encodeURIComponent(error_description || error)}`);
  }

  if (!code || !state) {
    return res.redirect(`${clientUrl}/github?error=missing_code_or_state`);
  }

  try {
    // 1. One-time expiring state verification: Consume immediately
    const stateRecord = await OAuthState.findOneAndDelete({ state: String(state) });
    if (!stateRecord) {
      return res.redirect(`${clientUrl}/github?error=invalid_or_expired_state`);
    }

    const clientId = (process.env.GITHUB_CLIENT_ID || '').trim();
    const clientSecret = (process.env.GITHUB_CLIENT_SECRET || '').trim();
    const callbackUrl = (process.env.GITHUB_CALLBACK_URL || 'http://localhost:5000/api/github/callback').trim();

    if (!clientId || !clientSecret) {
      return res.redirect(`${clientUrl}/github?error=oauth_credentials_missing_on_server`);
    }

    // 2. Exchange code for access token with GitHub
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'MyDesk-Platform'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: callbackUrl
      })
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error || !tokenData.access_token) {
      console.error('GitHub token exchange error:', tokenData.error_description || tokenData.error);
      return res.redirect(`${clientUrl}/github?error=token_exchange_failed`);
    }

    const accessToken = tokenData.access_token;

    // 3. Fetch authenticated user profile from GitHub
    const ghUser = await getAuthenticatedUser(accessToken);

    // 4. Save or update integration record with encrypted access token
    let integration = await GitHubIntegration.findOne({ user: stateRecord.user });
    if (!integration) {
      integration = new GitHubIntegration({
        user: stateRecord.user,
        githubId: String(ghUser.id),
        username: ghUser.login,
        avatarUrl: ghUser.avatar_url || '',
        profileUrl: ghUser.html_url || '',
        targetRepo: 'MyDesk-DSA-Solutions',
        targetBranch: 'main',
        isConnected: true
      });
    } else {
      integration.githubId = String(ghUser.id);
      integration.username = ghUser.login;
      integration.avatarUrl = ghUser.avatar_url || '';
      integration.profileUrl = ghUser.html_url || '';
      integration.isConnected = true;
      integration.connectedAt = new Date();
    }

    // Encrypt token at rest
    integration.setAccessToken(accessToken);
    await integration.save();

    return res.redirect(`${clientUrl}/github?connected=1`);
  } catch (error) {
    console.error('Error during GitHub OAuth callback:', error.message);
    return res.redirect(`${clientUrl}/github?error=internal_server_error`);
  }
});

/**
 * GET /api/github/status
 * Get connection status, connected username, target repo, and sync counts
 */
router.get('/status', protect, async (req, res) => {
  try {
    const integration = await GitHubIntegration.findOne({ user: req.user._id });

    if (!integration || !integration.isConnected) {
      return res.json({
        success: true,
        isConnected: false,
        repoName: null,
        message: 'No GitHub account connected.'
      });
    }

    // Count unique successfully synced problem-language combinations
    const syncedCount = await Submission.getUniqueSyncedCount(req.user._id);

    // Get unique accepted problem-language combinations that have not been synced yet
    const unSyncedList = await Submission.getUnsyncedAcceptedSubmissions(req.user._id);
    const unSyncedCount = unSyncedList.length;

    // Count failed combinations that haven't been resolved yet
    const failedDocs = await Submission.aggregate([
      {
        $match: {
          user: req.user._id,
          status: 'Accepted',
          githubSyncStatus: 'Failed'
        }
      },
      {
        $group: {
          _id: { questionId: '$questionId', language: '$language' }
        }
      }
    ]);
    const failedCount = failedDocs.length;

    return res.json({
      success: true,
      isConnected: true,
      data: {
        username: integration.username,
        avatarUrl: integration.avatarUrl,
        profileUrl: integration.profileUrl,
        targetRepo: integration.targetRepo,
        targetBranch: integration.targetBranch,
        connectedAt: integration.connectedAt,
        lastSyncedAt: integration.lastSyncedAt,
        syncedCount,
        failedCount,
        unSyncedCount
      }
    });
  } catch (error) {
    console.error('Error fetching GitHub status:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve GitHub connection status.'
    });
  }
});

/**
 * POST /api/github/disconnect
 * Disconnect student's GitHub integration and remove stored credentials
 */
router.post('/disconnect', protect, async (req, res) => {
  try {
    const integration = await GitHubIntegration.findOne({ user: req.user._id }).select('+encryptedAccessToken');
    if (integration) {
      // 1. Attempt token revocation with GitHub Applications API
      try {
        const token = integration.getAccessToken();
        const clientId = (process.env.GITHUB_CLIENT_ID || '').trim();
        const clientSecret = (process.env.GITHUB_CLIENT_SECRET || '').trim();

        if (token && clientId && clientSecret) {
          const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
          await fetch(`https://api.github.com/applications/${clientId}/grant`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Basic ${basicAuth}`,
              'Accept': 'application/vnd.github+json',
              'User-Agent': 'MyDesk-Platform',
              'X-GitHub-Api-Version': '2022-11-28'
            },
            body: JSON.stringify({ access_token: token })
          });
        }
      } catch (revokeErr) {
        // Log warning but continue local cleanup even if remote revoke network call fails
        console.warn('GitHub remote grant revocation skipped/failed:', revokeErr.message);
      }

      // 2. Destroy local credentials in MongoDB
      integration.isConnected = false;
      integration.encryptedAccessToken = 'revoked';
      await integration.save();
    }

    return res.json({
      success: true,
      message: 'GitHub account disconnected and credentials removed successfully.'
    });
  } catch (error) {
    console.error('Error disconnecting GitHub account:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to disconnect GitHub account.'
    });
  }
});

/**
 * GET /api/github/repos
 * Retrieve list of student's GitHub repositories
 */
router.get('/repos', protect, async (req, res) => {
  try {
    const integration = await GitHubIntegration.findOne({
      user: req.user._id,
      isConnected: true
    }).select('+encryptedAccessToken');

    if (!integration) {
      return res.status(400).json({
        success: false,
        message: 'Please connect your GitHub account first.'
      });
    }

    const token = integration.getAccessToken();
    const repos = await getUserRepositories(token);

    return res.json({
      success: true,
      repos,
      currentRepo: integration.targetRepo
    });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch repositories from GitHub.'
    });
  }
});

/**
 * POST /api/github/select-repo
 * Select an existing repository to synchronize solutions
 */
router.post('/select-repo', protect, async (req, res) => {
  try {
    const { repoName, branch = 'main' } = req.body;
    if (!repoName || typeof repoName !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Valid repository name is required.'
      });
    }

    const integration = await GitHubIntegration.findOne({
      user: req.user._id,
      isConnected: true
    }).select('+encryptedAccessToken');

    if (!integration) {
      return res.status(400).json({
        success: false,
        message: 'Please connect your GitHub account first.'
      });
    }

    const token = integration.getAccessToken();
    // Validate that student actually owns this repository
    const validatedRepo = await validateRepoOwnership(token, integration.username, repoName.trim());

    integration.targetRepo = validatedRepo.name;
    integration.targetBranch = branch || validatedRepo.default_branch || 'main';
    await integration.save();

    return res.json({
      success: true,
      message: `Target repository updated to '${validatedRepo.name}'.`,
      targetRepo: integration.targetRepo,
      targetBranch: integration.targetBranch
    });
  } catch (error) {
    console.error('Error selecting GitHub repo:', error.message);
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to select repository.'
    });
  }
});

/**
 * POST /api/github/create-repo
 * Explicitly create a dedicated MyDesk solutions repository upon student request
 */
router.post('/create-repo', protect, async (req, res) => {
  try {
    const { repoName = 'MyDesk-DSA-Solutions', isPrivate = false } = req.body;

    const integration = await GitHubIntegration.findOne({
      user: req.user._id,
      isConnected: true
    }).select('+encryptedAccessToken');

    if (!integration) {
      return res.status(400).json({
        success: false,
        message: 'Please connect your GitHub account first.'
      });
    }

    const token = integration.getAccessToken();
    const createdRepo = await createStudentRepo(token, repoName.trim(), isPrivate);

    integration.targetRepo = createdRepo.name;
    integration.targetBranch = createdRepo.default_branch || 'main';
    await integration.save();

    return res.status(201).json({
      success: true,
      message: `Repository '${createdRepo.name}' created and set as target.`,
      repo: {
        name: createdRepo.name,
        fullName: createdRepo.full_name,
        htmlUrl: createdRepo.html_url
      }
    });
  } catch (error) {
    console.error('Error creating GitHub repo:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create repository on GitHub.'
    });
  }
});

/**
 * POST /api/github/sync/:submissionId
 * Manual or retry sync for a specific Accepted submission
 */
router.post('/sync/:submissionId', protect, async (req, res) => {
  try {
    const { submissionId } = req.params;

    const submission = await Submission.findOne({
      _id: submissionId,
      user: req.user._id
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found or unauthorized.'
      });
    }

    if (submission.status !== 'Accepted') {
      return res.status(400).json({
        success: false,
        message: 'Only Accepted submissions can be synchronized to GitHub.'
      });
    }

    const integration = await GitHubIntegration.findOne({
      user: req.user._id,
      isConnected: true
    }).select('+encryptedAccessToken');

    if (!integration) {
      return res.status(400).json({
        success: false,
        message: 'Please connect your GitHub account first in the GitHub Sync tab.'
      });
    }

    const question = dsaQuestions.find(q => q.id === submission.questionId) || {
      id: submission.questionId,
      title: `Problem #${submission.questionId}`,
      topic: 'DSA',
      difficulty: 'Medium',
      problemStatement: 'Problem solved on MyDesk.'
    };

    // Find all unique synced submissions for this user to maintain root README index
    const allSolved = await Submission.getUniqueSyncedSubmissions(req.user._id);

    // Prevent duplicate simultaneous sync
    if (submission.githubSyncStatus === 'Pending') {
      return res.status(409).json({
        success: false,
        message: 'A synchronization operation is already in progress for this submission.'
      });
    }

    submission.githubSyncStatus = 'Pending';
    await submission.save();

    try {
      const syncResult = await syncSubmissionToGitHub({
        submission,
        question,
        githubIntegration: integration,
        allSolvedSubmissions: allSolved,
        dsaQuestions
      });

      submission.githubSyncStatus = 'Synced';
      submission.githubCommitUrl = syncResult.commitUrl;
      submission.githubSyncedAt = new Date();
      submission.githubSyncError = '';
      await submission.save();

      integration.lastSyncedAt = new Date();
      await integration.save();

      return res.json({
        success: true,
        message: 'Solution synchronized to GitHub successfully!',
        data: {
          submissionId: submission._id,
          status: submission.githubSyncStatus,
          commitUrl: submission.githubCommitUrl,
          syncedAt: submission.githubSyncedAt
        }
      });
    } catch (syncErr) {
      submission.githubSyncStatus = 'Failed';
      submission.githubSyncError = syncErr.message || 'GitHub synchronization failed.';
      await submission.save();

      return res.status(502).json({
        success: false,
        message: `GitHub sync failed: ${syncErr.message}`
      });
    }
  } catch (error) {
    console.error('Error retrying GitHub sync:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to process synchronization request.'
    });
  }
});

/**
 * POST /api/github/sync-all
 * Batch sync past Accepted submissions for a student who connected GitHub after solving problems
 */
router.post('/sync-all', protect, async (req, res) => {
  try {
    const integration = await GitHubIntegration.findOne({
      user: req.user._id,
      isConnected: true
    }).select('+encryptedAccessToken');

    if (!integration) {
      return res.status(400).json({
        success: false,
        message: 'Please connect your GitHub account first.'
      });
    }

    // Find unique Accepted problem-language combinations that have not been synced yet
    const unSyncedItems = await Submission.getUnsyncedAcceptedSubmissions(req.user._id);

    if (unSyncedItems.length === 0) {
      return res.json({
        success: true,
        message: 'All accepted solutions are already synchronized to GitHub.',
        syncedCount: 0
      });
    }

    let successCount = 0;
    let failCount = 0;

    for (const item of unSyncedItems) {
      const sub = await Submission.findById(item.latestSubmissionId);
      if (!sub) continue;

      const question = dsaQuestions.find(q => q.id === sub.questionId) || {
        id: sub.questionId,
        title: `Problem #${sub.questionId}`,
        topic: 'DSA',
        difficulty: 'Medium',
        problemStatement: 'Problem solved on MyDesk.'
      };

      const allSolved = await Submission.getUniqueSyncedSubmissions(req.user._id);

      try {
        const syncResult = await syncSubmissionToGitHub({
          submission: sub,
          question,
          githubIntegration: integration,
          allSolvedSubmissions: allSolved,
          dsaQuestions
        });

        sub.githubSyncStatus = 'Synced';
        sub.githubCommitUrl = syncResult.commitUrl;
        sub.githubSyncedAt = new Date();
        sub.githubSyncError = '';
        await sub.save();
        successCount++;
      } catch (err) {
        sub.githubSyncStatus = 'Failed';
        sub.githubSyncError = err.message;
        await sub.save();
        failCount++;
      }
    }

    integration.lastSyncedAt = new Date();
    await integration.save();

    return res.json({
      success: true,
      message: `Batch sync completed: ${successCount} synced, ${failCount} failed.`,
      syncedCount: successCount,
      failedCount: failCount
    });
  } catch (error) {
    console.error('Error running batch sync:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to process batch sync.'
    });
  }
});

module.exports = router;
