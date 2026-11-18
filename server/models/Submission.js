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

module.exports = mongoose.model('Submission', submissionSchema);
