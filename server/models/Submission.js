// models/Submission.js
// Mongoose schema and model for student DSA problem code submissions.

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Submission must belong to a student user']
    },
    questionId: {
      type: Number,
      required: [true, 'Submission must reference a question ID']
    },
    language: {
      type: String,
      required: [true, 'Programming language is required'],
      enum: {
        values: ['c', 'cpp', 'java', 'python'],
        message: 'Language must be c, cpp, java, or python'
      }
    },
    code: {
      type: String,
      required: [true, 'Submitted source code cannot be empty']
    },
    status: {
      type: String,
      required: [true, 'Submission status is required'],
      enum: {
        values: [
          'Accepted',
          'Wrong Answer',
          'Compilation Error',
          'Runtime Error',
          'Time Limit Exceeded'
        ],
        message: 'Invalid submission status'
      }
    },
    runtime: {
      type: String,
      default: '0.00'
    },
    memory: {
      type: Number,
      default: 0
    },
    testCasesPassed: {
      type: Number,
      default: 0
    },
    totalTestCases: {
      type: Number,
      default: 1
    },
    compileOutput: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    failedTestCase: {
      testCaseNumber: Number,
      name: String,
      isHidden: Boolean,
      input: String,
      expectedOutput: String,
      actualOutput: String
    },
    // GitHub Synchronization fields (Phase 8)
    githubSyncStatus: {
      type: String,
      enum: {
        values: ['Not Connected', 'Pending', 'Synced', 'Failed'],
        message: 'Invalid GitHub sync status'
      },
      default: 'Not Connected'
    },
    githubCommitUrl: {
      type: String,
      default: ''
    },
    githubSyncedAt: {
      type: Date
    },
    githubSyncError: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Indexes to optimize querying student progress and submission history
submissionSchema.index({ user: 1, questionId: 1, status: 1 });
submissionSchema.index({ user: 1, createdAt: -1 });
submissionSchema.index({ user: 1, status: 1 });
submissionSchema.index({ user: 1, githubSyncStatus: 1 });
submissionSchema.index({ user: 1, status: 1, githubSyncStatus: 1, questionId: 1, language: 1 });

/**
 * Returns the count of unique (questionId, language) combinations successfully synced to GitHub.
 * Resubmissions for the same problem and language do not increment this count.
 */
submissionSchema.statics.getUniqueSyncedCount = async function (userId) {
  if (!userId) return 0;
  const userObjId = typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;

  const results = await this.aggregate([
    {
      $match: {
        user: userObjId,
        status: 'Accepted',
        githubSyncStatus: 'Synced'
      }
    },
    {
      $group: {
        _id: { questionId: '$questionId', language: '$language' }
      }
    }
  ]);

  return results.length;
};

/**
 * Returns the latest unique synced submissions per (questionId, language) for README index generation.
 * Guarantees exactly one entry per unique problem-language pair.
 */
submissionSchema.statics.getUniqueSyncedSubmissions = async function (userId) {
  if (!userId) return [];
  const userObjId = typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;

  return await this.aggregate([
    {
      $match: {
        user: userObjId,
        status: 'Accepted',
        githubSyncStatus: 'Synced'
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $group: {
        _id: { questionId: '$questionId', language: '$language' },
        submissionId: { $first: '$_id' },
        questionId: { $first: '$questionId' },
        language: { $first: '$language' },
        code: { $first: '$code' },
        runtime: { $first: '$runtime' },
        memory: { $first: '$memory' },
        githubCommitUrl: { $first: '$githubCommitUrl' },
        createdAt: { $first: '$createdAt' }
      }
    },
    {
      $sort: { questionId: 1, language: 1 }
    }
  ]);
};

/**
 * Returns distinct (questionId, language) combinations that are Accepted but not yet synced to GitHub.
 * Avoids re-syncing combinations that are already Synced.
 */
submissionSchema.statics.getUnsyncedAcceptedSubmissions = async function (userId) {
  if (!userId) return [];
  const userObjId = typeof userId === 'string' ? new mongoose.Types.ObjectId(userId) : userId;

  // 1. Find all combinations that are already successfully synced
  const syncedPairs = await this.aggregate([
    {
      $match: {
        user: userObjId,
        status: 'Accepted',
        githubSyncStatus: 'Synced'
      }
    },
    {
      $group: {
        _id: { questionId: '$questionId', language: '$language' }
      }
    }
  ]);
  const syncedSet = new Set(syncedPairs.map(p => `${p._id.questionId}-${p._id.language}`));

  // 2. Find latest Accepted submission for each combination
  const acceptedList = await this.aggregate([
    {
      $match: {
        user: userObjId,
        status: 'Accepted'
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $group: {
        _id: { questionId: '$questionId', language: '$language' },
        latestSubmissionId: { $first: '$_id' },
        questionId: { $first: '$questionId' },
        language: { $first: '$language' },
        code: { $first: '$code' },
        createdAt: { $first: '$createdAt' }
      }
    }
  ]);

  // 3. Return only combinations that have NOT been synced yet
  return acceptedList.filter(item => !syncedSet.has(`${item.questionId}-${item.language}`));
};

module.exports = mongoose.model('Submission', submissionSchema);
