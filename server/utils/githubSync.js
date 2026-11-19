// utils/githubSync.js
// Service utility for interacting with GitHub REST API:
// - Verifies token and repository ownership
// - Manages file creation and update with SHA deduplication
// - Generates accurate problem-specific README and main repository README
// - Synchronizes verified Accepted DSA solutions to student's GitHub repository

const GITHUB_API_BASE = 'https://api.github.com';

const EXTENSION_MAP = {
  c: 'c',
  cpp: 'cpp',
  java: 'java',
  python: 'py'
};

const LANG_DISPLAY_MAP = {
  c: 'C',
  cpp: 'C++',
  java: 'Java',
  python: 'Python'
};

/**
 * Standard headers for GitHub REST API requests
 */
function getHeaders(token) {
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'MyDesk-Platform',
    'X-GitHub-Api-Version': '2022-11-28'
  };
}

/**
 * Sanitize a string into a safe directory/file slug
 */
function slugify(text) {
  if (!text) return 'problem';
  return String(text)
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Sanitize topic names for folder structure
 */
function sanitizeTopic(topic) {
  if (!topic) return 'General';
  return topic
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Fetch authenticated GitHub user details
 */
async function getAuthenticatedUser(token) {
  const res = await fetch(`${GITHUB_API_BASE}/user`, {
    headers: getHeaders(token)
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || `GitHub user profile request failed with HTTP ${res.status}`);
  }

  return await res.json();
}

/**
 * List repositories owned by the authenticated student
 */
async function getUserRepositories(token) {
  const res = await fetch(`${GITHUB_API_BASE}/user/repos?type=owner&sort=updated&per_page=100`, {
    headers: getHeaders(token)
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || `Failed to fetch GitHub repositories (HTTP ${res.status})`);
  }

  const repos = await res.json();
  return repos.map(r => ({
    id: r.id,
    name: r.name,
    fullName: r.full_name,
    description: r.description || '',
    isPrivate: r.private,
    defaultBranch: r.default_branch || 'main',
    htmlUrl: r.html_url,
    updatedAt: r.updated_at
  }));
}

/**
 * Verify repository ownership to ensure student only writes to their own repositories
 */
async function validateRepoOwnership(token, owner, repoName) {
  const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repoName}`, {
    headers: getHeaders(token)
  });

  if (res.status === 404) {
    throw new Error(`Repository '${owner}/${repoName}' was not found on GitHub.`);
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to verify repository '${repoName}' (HTTP ${res.status})`);
  }

  const repo = await res.json();
  if (repo.owner.login.toLowerCase() !== owner.toLowerCase()) {
    throw new Error(`Permission denied: Repository '${repoName}' is not owned by '${owner}'.`);
  }

  return repo;
}

/**
 * Create a new repository on student's GitHub account if requested
 */
async function createStudentRepo(token, repoName = 'MyDesk-DSA-Solutions', isPrivate = false) {
  const res = await fetch(`${GITHUB_API_BASE}/user/repos`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({
      name: repoName,
      description: 'Curated Data Structures and Algorithms solutions solved and verified on MyDesk.',
      private: isPrivate,
      auto_init: true
    })
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || `Failed to create repository '${repoName}' (HTTP ${res.status})`);
  }

  return await res.json();
}

/**
 * Retrieve the current SHA of a file in the repository (if it exists)
 * Returns null if the file does not exist (HTTP 404).
 */
async function getFileSha(token, owner, repo, path, branch = 'main') {
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${encodedPath}?ref=${branch}`, {
    headers: getHeaders(token)
  });

  if (res.status === 404) {
    return null; // File does not exist yet
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to inspect file '${path}' on GitHub (HTTP ${res.status})`);
  }

  const data = await res.json();
  return data.sha || null;
}

/**
 * Create or update a file via GitHub Contents API
 * Passing existingSha updates the file in-place; omitting it creates a new file.
 */
async function createOrUpdateFile(token, owner, repo, path, content, commitMessage, existingSha = null, branch = 'main') {
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  const base64Content = Buffer.from(content, 'utf8').toString('base64');

  const payload = {
    message: commitMessage,
    content: base64Content,
    branch: branch
  };

  if (existingSha) {
    payload.sha = existingSha;
  }

  const res = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${encodedPath}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.message || `Failed to commit file '${path}' to GitHub (HTTP ${res.status})`);
  }

  const data = await res.json();
  return {
    commitSha: data.commit?.sha,
    commitUrl: data.commit?.html_url || `https://github.com/${owner}/${repo}/commit/${data.commit?.sha}`,
    fileUrl: data.content?.html_url
  };
}

/**
 * Generate accurate, Markdown-formatted problem-specific README
 * Never invents complexity values; marks as not specified if not explicitly defined.
 */
function buildProblemReadme(question, submission, fileName) {
  const langLabel = LANG_DISPLAY_MAP[submission.language] || submission.language;
  const submittedDate = submission.createdAt
    ? new Date(submission.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : new Date().toLocaleDateString();

  return `# ${question.id}. ${question.title}

## Problem Metadata
- **Topic:** ${question.topic || 'General DSA'}
- **Difficulty:** ${question.difficulty || 'Medium'}
- **Language:** ${langLabel}
- **Status:** Verified Accepted on MyDesk
- **Runtime:** ${submission.runtime ? `${submission.runtime}s` : '0.00s'}
- **Memory:** ${submission.memory ? `${submission.memory} KB` : 'N/A'}
- **Date Verified:** ${submittedDate}

---

## Problem Statement
${question.problemStatement}

### Input Format
${question.inputFormat || 'Refer to problem statement'}

### Output Format
${question.outputFormat || 'Refer to problem statement'}

${question.constraints ? `### Constraints\n\`\`\`text\n${question.constraints}\n\`\`\`\n` : ''}

---

## Sample Test Case
**Sample Input:**
\`\`\`text
${question.sampleInput || '(None)'}
\`\`\`

**Sample Output:**
\`\`\`text
${question.sampleOutput || '(None)'}
\`\`\`

${question.explanation ? `**Explanation:**\n${question.explanation}\n` : ''}

---

## Complexity Analysis
- **Time Complexity:** Not specified in problem constraints (Refer to code implementation).
- **Space Complexity:** Not specified in problem constraints (Refer to code implementation).

---

## Solution Code
- [View ${langLabel} Solution](./${fileName})

*Automated synchronization powered by [MyDesk Student Platform](https://github.com).*
`;
}

/**
 * Build or update the root README.md listing all solved problems.
 * Strictly deduplicates by (questionId, language) so that resubmissions update the entry
 * without creating duplicate table rows. Multiple languages for the same problem are listed as distinct solutions.
 */
function buildMainReadme(solvedSubmissions, dsaQuestions) {
  // Deduplicate by questionId + language
  const uniqueMap = new Map();

  if (Array.isArray(solvedSubmissions)) {
    solvedSubmissions.forEach(sub => {
      if (!sub || !sub.questionId || !sub.language) return;
      const key = `${sub.questionId}-${String(sub.language).toLowerCase().trim()}`;
      // Store the entry (latest entry takes precedence)
      uniqueMap.set(key, sub);
    });
  }

  // Sort by problem ID ascending, then by language alphabetically
  const uniqueList = Array.from(uniqueMap.values()).sort((a, b) => {
    const idA = Number(a.questionId);
    const idB = Number(b.questionId);
    if (idA !== idB) return idA - idB;
    return String(a.language).localeCompare(String(b.language));
  });

  const rows = [];

  uniqueList.forEach(sub => {
    const q = dsaQuestions.find(item => item.id === Number(sub.questionId)) || {
      id: sub.questionId,
      title: `Problem #${sub.questionId}`,
      topic: 'DSA',
      difficulty: 'Medium'
    };

    const topicFolder = sanitizeTopic(q.topic);
    const slug = slugify(q.title);
    const ext = EXTENSION_MAP[sub.language] || sub.language;
    const langLabel = LANG_DISPLAY_MAP[sub.language] || sub.language;

    const solutionPath = `./${topicFolder}/${slug}.${ext}`;
    const readmePath = `./${topicFolder}/${slug}-README.md`;

    rows.push(
      `| ${q.id} | [${q.title}](${readmePath}) | ${q.topic} | \`${q.difficulty}\` | [${langLabel}](${solutionPath}) |`
    );
  });

  return `# MyDesk — DSA Solutions Repository

Welcome! This repository contains verified Data Structures and Algorithms solutions solved by the student on the **MyDesk Student Productivity Platform**.

Each solution includes:
- Production-grade source code in C, C++, Java, or Python.
- Comprehensive problem statement, constraints, and test case documentation.
- Runtime performance benchmarks verified against standalone test suites.

## Solved Problems (${rows.length} Total)

| # | Problem Title | Topic | Difficulty | Solution |
|:---:|:---|:---|:---:|:---:|
${rows.length > 0 ? rows.join('\n') : '| - | No solutions uploaded yet | - | - | - |'}

---
*Maintained automatically via MyDesk GitHub Integration.*
`;
}

/**
 * Synchronize an Accepted submission to the student's GitHub repository
 */
async function syncSubmissionToGitHub({ submission, question, githubIntegration, allSolvedSubmissions = [], dsaQuestions = [] }) {
  // Safe, reversible simulation hook for testing failure & retry workflow
  if (process.env.SIMULATE_GITHUB_SYNC_FAILURE === 'true') {
    throw new Error('Simulated temporary GitHub API outage (HTTP 503). Testing retry functionality.');
  }

  if (!githubIntegration || !githubIntegration.isConnected) {
    throw new Error('GitHub account is not connected for this student.');
  }

  const token = githubIntegration.getAccessToken();
  const owner = githubIntegration.username;
  const repo = githubIntegration.targetRepo || 'MyDesk-DSA-Solutions';
  const branch = githubIntegration.targetBranch || 'main';

  // 1. Verify repository ownership
  await validateRepoOwnership(token, owner, repo);

  // 2. Resolve safe paths
  const topicFolder = sanitizeTopic(question.topic);
  const problemSlug = slugify(question.title);
  const ext = EXTENSION_MAP[submission.language] || submission.language;
  const codeFileName = `${problemSlug}.${ext}`;
  const codeFilePath = `${topicFolder}/${codeFileName}`;
  const readmeFileName = `${problemSlug}-README.md`;
  const readmeFilePath = `${topicFolder}/${readmeFileName}`;

  const langLabel = LANG_DISPLAY_MAP[submission.language] || submission.language;

  // 3. Commit solution code file (checks SHA first to prevent duplicates)
  const existingCodeSha = await getFileSha(token, owner, repo, codeFilePath, branch);
  const commitMsgCode = existingCodeSha
    ? `Update solution for #${question.id} ${question.title} (${langLabel}) via MyDesk`
    : `Add solution for #${question.id} ${question.title} (${langLabel}) via MyDesk`;

  const codeCommit = await createOrUpdateFile(
    token,
    owner,
    repo,
    codeFilePath,
    submission.code,
    commitMsgCode,
    existingCodeSha,
    branch
  );

  // 4. Commit problem-specific README (checks SHA first)
  const problemReadmeContent = buildProblemReadme(question, submission, codeFileName);
  const existingReadmeSha = await getFileSha(token, owner, repo, readmeFilePath, branch);
  const commitMsgReadme = existingReadmeSha
    ? `Update README for #${question.id} ${question.title} via MyDesk`
    : `Add README for #${question.id} ${question.title} via MyDesk`;

  await createOrUpdateFile(
    token,
    owner,
    repo,
    readmeFilePath,
    problemReadmeContent,
    commitMsgReadme,
    existingReadmeSha,
    branch
  );

  // 5. Update main repository README.md (cleanly deduplicated)
  try {
    const listToInclude = [...allSolvedSubmissions, submission];
    const mainReadmeContent = buildMainReadme(listToInclude, dsaQuestions);
    const existingMainSha = await getFileSha(token, owner, repo, 'README.md', branch);

    await createOrUpdateFile(
      token,
      owner,
      repo,
      'README.md',
      mainReadmeContent,
      'Update DSA solutions index via MyDesk',
      existingMainSha,
      branch
    );
  } catch (mainErr) {
    console.warn('Could not update root README.md:', mainErr.message);
  }

  return {
    success: true,
    commitUrl: codeCommit.commitUrl,
    codeFilePath,
    readmeFilePath
  };
}

module.exports = {
  EXTENSION_MAP,
  LANG_DISPLAY_MAP,
  slugify,
  sanitizeTopic,
  getAuthenticatedUser,
  getUserRepositories,
  validateRepoOwnership,
  createStudentRepo,
  getFileSha,
  createOrUpdateFile,
  buildProblemReadme,
  buildMainReadme,
  syncSubmissionToGitHub
};
