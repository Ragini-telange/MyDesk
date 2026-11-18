// routes/dsa.js
// DSA Code Execution & Submission Routes using OnlineCompiler.io (Phase 7.3 & 7.4)
// Evaluates sample & hidden test cases, records submissions in MongoDB, and tracks student progress.

const express = require('express');
const router = express.Router();
const path = require('path');
const { protect } = require('../middleware/auth');
const Submission = require('../models/Submission');
const { adaptSourceCode } = require('../utils/driverAdapter');
const { getTestCasesForProblem } = require('../data/dsaTestCases');

// OnlineCompiler.io Language ID Mapping (verified from https://api.onlinecompiler.io/api/judge0/languages)
const LANGUAGE_ID_MAP = {
  c: 103,      // C (GCC 15)
  cpp: 105,    // C++ (GCC 15)
  java: 91,    // Java (OpenJDK 25)
  python: 113  // Python (3.14)
};

// Maximum payload limits
const MAX_SOURCE_CODE_BYTES = 64 * 1024; // 64 KB
const MAX_STDIN_BYTES = 16 * 1024;       // 16 KB

// Cache for DSA questions metadata
let dsaQuestions = [];
(async () => {
  try {
    const dsaPath = path.resolve(__dirname, '../../client/src/data/dsaQuestions.js');
    const fileUrl = 'file:///' + dsaPath.replace(/\\/g, '/');
    const mod = await import(fileUrl);
    dsaQuestions = mod.DSA_QUESTIONS || [];
  } catch (err) {
    // In isolated test environments, dsaQuestions remains available
  }
})();

// Helper to decode Base64 safely
const decodeBase64 = (val) => {
  if (!val) return '';
  try {
    return Buffer.from(val, 'base64').toString('utf8');
  } catch (err) {
    return String(val);
  }
};

// Helper to normalize stdout and expected output for fair comparison
const normalizeOutput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .split('\n')
    .map((line) => line.trim().replace(/\s+/g, ' '))
    .join('\n');
};

/**
 * Execute a single test case payload via OnlineCompiler.io
 */
async function executeSingleTestCase(finalSourceCode, languageId, stdin, apiUrl, apiKey) {
  const encodedSource = Buffer.from(finalSourceCode, 'utf8').toString('base64');
  const encodedStdin = stdin ? Buffer.from(stdin, 'utf8').toString('base64') : '';

  const payload = {
    source_code: encodedSource,
    language_id: languageId,
    stdin: encodedStdin,
    cpu_time_limit: 5.0,
    wall_time_limit: 10.0,
    memory_limit: 128000
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-Auth-Token': apiKey,
    'Authorization': apiKey
  };

  const endpoint = `${apiUrl}/submissions?base64_encoded=true&wait=true`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000)
  });

  if (!response.ok) {
    const errText = await response.text();
    let parsedErr = {};
    try {
      parsedErr = JSON.parse(errText);
    } catch (e) {
      parsedErr = { error: errText };
    }
    const errorObj = new Error(parsedErr.message || parsedErr.error || `HTTP ${response.status}`);
    errorObj.status = response.status;
    errorObj.details = parsedErr;
    throw errorObj;
  }

  const result = await response.json();
  return {
    status: result.status || { id: 3, description: 'Completed' },
    stdout: decodeBase64(result.stdout),
    stderr: decodeBase64(result.stderr),
    compile_output: decodeBase64(result.compile_output),
    message: decodeBase64(result.message),
    time: result.time || '0.00',
    memory: result.memory || 0
  };
}

/**
 * @route   POST /api/dsa/run
 * @desc    Execute code against sample input via OnlineCompiler.io (Phase 7.3)
 * @access  Private (JWT protected)
 */
router.post('/run', protect, async (req, res) => {
  try {
    const { source_code, language, stdin = '', problem_id } = req.body;

    if (!source_code || typeof source_code !== 'string' || source_code.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Source code cannot be empty.'
      });
    }

    if (Buffer.byteLength(source_code, 'utf8') > MAX_SOURCE_CODE_BYTES) {
      return res.status(400).json({
        success: false,
        error: 'Payload Too Large',
        message: 'Source code exceeds the maximum allowed size of 64 KB.'
      });
    }

    const langKey = String(language).toLowerCase();
    const languageId = LANGUAGE_ID_MAP[langKey];
    if (!languageId) {
      return res.status(400).json({
        success: false,
        error: 'Unsupported Language',
        message: `Language '${language}' is not supported. Allowed languages are: c, cpp, java, python.`
      });
    }

    if (stdin && Buffer.byteLength(stdin, 'utf8') > MAX_STDIN_BYTES) {
      return res.status(400).json({
        success: false,
        error: 'Input Too Large',
        message: 'Sample input exceeds the maximum allowed size of 16 KB.'
      });
    }

    const apiUrl = (process.env.ONLINECOMPILER_API_URL || process.env.JUDGE0_API_URL || 'https://api.onlinecompiler.io/api/judge0').replace(/\/+$/, '');
    const apiKey = (process.env.ONLINECOMPILER_API_KEY || process.env.JUDGE0_API_KEY || '').trim();

    if (!apiKey) {
      return res.status(200).json({
        success: false,
        configured: false,
        error: 'OnlineCompiler.io Credentials Not Configured',
        message: 'OnlineCompiler.io API key is not set in server/.env.\n\nTo enable free remote compiler execution:\n1. Get a free API key at https://onlinecompiler.io (100,000 free runs/month, no credit card required).\n2. Add ONLINECOMPILER_API_KEY=your_key to your backend server/.env file.\n3. Restart the backend server.',
        status: { id: 0, description: 'Credentials Required' }
      });
    }

    const question = problem_id ? dsaQuestions.find((q) => q.id === Number(problem_id)) : null;
    const finalSourceCode = adaptSourceCode(source_code, langKey, question);

    const result = await executeSingleTestCase(finalSourceCode, languageId, stdin, apiUrl, apiKey);

    return res.json({
      success: true,
      configured: true,
      data: {
        status: result.status,
        stdout: result.stdout,
        stderr: result.stderr,
        compile_output: result.compile_output,
        message: result.message,
        time: result.time,
        memory: result.memory,
        language: langKey,
        problem_id: problem_id || null
      }
    });

  } catch (error) {
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      return res.status(504).json({
        success: false,
        error: 'Execution Service Timeout',
        message: 'The code execution request timed out after 15 seconds. Please try again.'
      });
    }

    if (error.status === 401 || error.status === 403 || (error.status === 404 && error.details?.error?.includes('API key'))) {
      return res.status(502).json({
        success: false,
        configured: false,
        error: 'OnlineCompiler Authentication Failed',
        message: 'The ONLINECOMPILER_API_KEY in server/.env was rejected by OnlineCompiler.io (Invalid or inactive API key). Please verify your key at https://onlinecompiler.io.',
        status: { id: 13, description: 'Authentication Error' }
      });
    }

    console.error('OnlineCompiler Run Error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Execution Failed',
      message: 'Failed to communicate with OnlineCompiler.io execution service: ' + error.message
    });
  }
});

/**
 * @route   POST /api/dsa/submit
 * @desc    Submit code, evaluate against all test cases (sample + hidden), and record submission (Phase 7.4)
 * @access  Private (JWT protected)
 */
router.post('/submit', protect, async (req, res) => {
  try {
    const { source_code, language, problem_id } = req.body;

    if (!problem_id) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'problem_id is required for submission evaluation.'
      });
    }

    if (!source_code || typeof source_code !== 'string' || source_code.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Source code cannot be empty.'
      });
    }

    if (Buffer.byteLength(source_code, 'utf8') > MAX_SOURCE_CODE_BYTES) {
      return res.status(400).json({
        success: false,
        error: 'Payload Too Large',
        message: 'Source code exceeds the maximum allowed size of 64 KB.'
      });
    }

    const langKey = String(language).toLowerCase();
    const languageId = LANGUAGE_ID_MAP[langKey];
    if (!languageId) {
      return res.status(400).json({
        success: false,
        error: 'Unsupported Language',
        message: `Language '${language}' is not supported. Allowed languages are: c, cpp, java, python.`
      });
    }

    const apiUrl = (process.env.ONLINECOMPILER_API_URL || process.env.JUDGE0_API_URL || 'https://api.onlinecompiler.io/api/judge0').replace(/\/+$/, '');
    const apiKey = (process.env.ONLINECOMPILER_API_KEY || process.env.JUDGE0_API_KEY || '').trim();

    if (!apiKey) {
      return res.status(200).json({
        success: false,
        configured: false,
        error: 'OnlineCompiler.io Credentials Not Configured',
        message: 'OnlineCompiler.io API key is not set in server/.env.\n\nTo enable full test suite evaluation:\n1. Get your free API key at https://onlinecompiler.io (100,000 free runs/month).\n2. Add ONLINECOMPILER_API_KEY=your_key in server/.env.\n3. Restart the backend server.',
        status: { id: 0, description: 'Credentials Required' }
      });
    }

    const question = dsaQuestions.find((q) => q.id === Number(problem_id));
    if (!question) {
      return res.status(404).json({
        success: false,
        error: 'Question Not Found',
        message: `Question #${problem_id} does not exist in the DSA catalog.`
      });
    }

    // Retrieve real test cases (sample + real hidden test cases)
    const testCases = getTestCasesForProblem(question);
    const finalSourceCode = adaptSourceCode(source_code, langKey, question);

    let testCasesPassed = 0;
    let finalStatus = 'Accepted';
    let failedTestCase = null;
    let maxTime = '0.00';
    let maxMemory = 0;
    let lastCompileOutput = '';
    let lastErrorMessage = '';

    // Evaluate against each test case sequentially
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      let execResult;

      try {
        execResult = await executeSingleTestCase(finalSourceCode, languageId, tc.input, apiUrl, apiKey);
      } catch (err) {
        if (err.status === 401 || err.status === 403) {
          return res.status(502).json({
            success: false,
            configured: false,
            error: 'Authentication Error',
            message: 'Invalid ONLINECOMPILER_API_KEY in server/.env'
          });
        }
        throw err;
      }

      // Track max runtime and memory
      if (parseFloat(execResult.time) > parseFloat(maxTime)) {
        maxTime = execResult.time;
      }
      if (execResult.memory > maxMemory) {
        maxMemory = execResult.memory;
      }

      const statusId = execResult.status?.id;

      // 1. Compilation Error (Status ID 6)
      if (statusId === 6) {
        finalStatus = 'Compilation Error';
        lastCompileOutput = execResult.compile_output || execResult.stderr || 'Compilation failed';
        break;
      }

      // 2. Time Limit Exceeded (Status ID 5)
      if (statusId === 5) {
        finalStatus = 'Time Limit Exceeded';
        failedTestCase = {
          testCaseNumber: tc.testCaseNumber,
          name: tc.name,
          isHidden: tc.isHidden
        };
        break;
      }

      // 3. Runtime Error (Status IDs 7 to 12)
      if (statusId >= 7 && statusId <= 12) {
        finalStatus = 'Runtime Error';
        lastErrorMessage = execResult.stderr || execResult.message || 'Runtime error occurred';
        failedTestCase = {
          testCaseNumber: tc.testCaseNumber,
          name: tc.name,
          isHidden: tc.isHidden
        };
        break;
      }

      // 4. Output verification
      const normActual = normalizeOutput(execResult.stdout);
      const normExpected = normalizeOutput(tc.expectedOutput);

      if (normActual === normExpected) {
        testCasesPassed++;
      } else {
        finalStatus = 'Wrong Answer';
        failedTestCase = {
          testCaseNumber: tc.testCaseNumber,
          name: tc.name,
          isHidden: tc.isHidden,
          input: tc.isHidden ? '(Hidden test case)' : tc.input,
          expectedOutput: tc.isHidden ? '(Hidden test case)' : tc.expectedOutput,
          actualOutput: tc.isHidden ? normActual.slice(0, 100) : normActual
        };
        break;
      }
    }

    // Save submission to MongoDB
    const submission = await Submission.create({
      user: req.user._id,
      questionId: Number(problem_id),
      language: langKey,
      code: source_code,
      status: finalStatus,
      runtime: maxTime,
      memory: maxMemory,
      testCasesPassed,
      totalTestCases: testCases.length,
      compileOutput: lastCompileOutput,
      errorMessage: lastErrorMessage,
      failedTestCase
    });

    // Query distinct solved and attempted problem counts for the student
    const solvedIds = await Submission.distinct('questionId', {
      user: req.user._id,
      status: 'Accepted'
    });

    const attemptedIds = await Submission.distinct('questionId', {
      user: req.user._id
    });

    return res.status(201).json({
      success: true,
      configured: true,
      data: {
        submissionId: submission._id,
        status: submission.status,
        testCasesPassed: submission.testCasesPassed,
        totalTestCases: submission.totalTestCases,
        runtime: submission.runtime,
        memory: submission.memory,
        compileOutput: submission.compileOutput,
        errorMessage: submission.errorMessage,
        failedTestCase: submission.failedTestCase,
        createdAt: submission.createdAt,
        stats: {
          solvedCount: solvedIds.length,
          attemptedCount: attemptedIds.length,
          isSolved: solvedIds.includes(Number(problem_id))
        }
      }
    });

  } catch (error) {
    console.error('DSA Submission Error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Submission Failed',
      message: 'Failed to process submission evaluation: ' + error.message
    });
  }
});

/**
 * @route   GET /api/dsa/progress
 * @desc    Get overall solved & attempted problem IDs and statistics for the authenticated student (Phase 7.4)
 * @access  Private (JWT protected)
 */
router.get('/progress', protect, async (req, res) => {
  try {
    const solvedIds = await Submission.distinct('questionId', {
      user: req.user._id,
      status: 'Accepted'
    });

    const attemptedIds = await Submission.distinct('questionId', {
      user: req.user._id
    });

    const totalSubmissions = await Submission.countDocuments({ user: req.user._id });

    return res.json({
      success: true,
      data: {
        solvedIds,
        attemptedIds,
        solvedCount: solvedIds.length,
        attemptedCount: attemptedIds.length,
        totalCount: 100,
        totalSubmissions
      }
    });
  } catch (error) {
    console.error('DSA Progress Query Error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch DSA progress'
    });
  }
});

/**
 * @route   GET /api/dsa/submissions/:problemId
 * @desc    Get student submission history for a specific problem (Phase 7.4)
 * @access  Private (JWT protected)
 */
router.get('/submissions/:problemId', protect, async (req, res) => {
  try {
    const problemId = Number(req.params.problemId);
    if (isNaN(problemId)) {
      return res.status(400).json({ success: false, error: 'Invalid problem ID' });
    }

    const submissions = await Submission.find({
      user: req.user._id,
      questionId: problemId
    })
      .sort({ createdAt: -1 })
      .limit(30)
      .select('questionId language status runtime memory testCasesPassed totalTestCases code createdAt');

    return res.json({
      success: true,
      submissions
    });
  } catch (error) {
    console.error('DSA Submissions Query Error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch submission history'
    });
  }
});

module.exports = router;
