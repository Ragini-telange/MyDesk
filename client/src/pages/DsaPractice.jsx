// pages/DsaPractice.jsx
// DSA Practice Platform & Monaco Coding Workspace (Phases 7.1, 7.2, 7.3, 7.4)
// Features: 100-problem catalog with real MongoDB solved/attempted tracking,
// topic/difficulty/status filters, pagination, split-screen Monaco Editor workspace,
// C, C++, Java, Python language support with independent state retention,
// Dark/Light themes, isolated OnlineCompiler.io Run Code, full test suite Submit Code
// with hidden test-case evaluation, and submission history with code restoration.

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { DSA_QUESTIONS, DSA_TOPICS, DSA_DIFFICULTIES } from '../data/dsaQuestions';

const PAGE_SIZE = 15;

const CODE_LANGUAGES = [
  { id: 'cpp', label: 'C++', monacoLang: 'cpp' },
  { id: 'java', label: 'Java', monacoLang: 'java' },
  { id: 'python', label: 'Python', monacoLang: 'python' },
  { id: 'c', label: 'C', monacoLang: 'c' }
];

const STATUS_FILTERS = ['All', 'Solved', 'Attempted', 'Todo'];

function DsaPractice() {
  const { token } = useAuth();
  const { id: paramProblemId } = useParams();
  const navigate = useNavigate();

  // Active workspace problem (when in coding view)
  const [activeWorkspaceProblem, setActiveWorkspaceProblem] = useState(null);

  // Catalog view filter states
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Student progress state from MongoDB (Phase 7.4)
  const [userProgress, setUserProgress] = useState({
    solvedIds: [],
    attemptedIds: [],
    solvedCount: 0,
    attemptedCount: 0,
    totalCount: 100
  });

  // Preview modal states (Phase 7.1 modal)
  const [activeModalQuestion, setActiveModalQuestion] = useState(null);
  const [modalLang, setModalLang] = useState('cpp');
  const [modalCopied, setModalCopied] = useState(false);

  // Workspace editor states (Phase 7.2, 7.3 & 7.4)
  const [selectedLang, setSelectedLang] = useState('cpp');
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [problemCodes, setProblemCodes] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Workspace console and submissions history states
  const [activeConsoleTab, setActiveConsoleTab] = useState('output'); // 'output' | 'history'
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);

  const [consoleOutput, setConsoleOutput] = useState({
    type: 'idle',
    badge: 'Ready',
    timestamp: null,
    content: 'Terminal Console Idle.\n\nClick "Run Code" to compile and execute your solution against the sample test case via OnlineCompiler.io.\nClick "Submit Code" to test against hidden test suites and save progress to your student dashboard.'
  });

  // Fetch real student DSA progress from MongoDB
  const fetchUserProgress = useCallback(async () => {
    try {
      const authToken = token || localStorage.getItem('mydesk_token');
      if (!authToken) return;
      const res = await fetch('http://localhost:5000/api/dsa/progress', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setUserProgress(data.data);
        }
      }
    } catch (e) {
      console.warn('Could not fetch DSA progress:', e);
    }
  }, [token]);

  // Fetch submission history for the active problem
  const fetchSubmissionsForProblem = useCallback(async (problemId) => {
    if (!problemId) return;
    setLoadingSubmissions(true);
    try {
      const authToken = token || localStorage.getItem('mydesk_token');
      if (!authToken) return;
      const res = await fetch(`http://localhost:5000/api/dsa/submissions/${problemId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSubmissions(data.submissions || []);
        }
      }
    } catch (e) {
      console.warn('Could not fetch submissions:', e);
    } finally {
      setLoadingSubmissions(false);
    }
  }, [token]);

  // Initial mount: load student progress
  useEffect(() => {
    fetchUserProgress();
  }, [fetchUserProgress]);

  // Sync active problem from URL param /dsa/:id
  useEffect(() => {
    if (paramProblemId) {
      const found = DSA_QUESTIONS.find((q) => q.id === Number(paramProblemId));
      if (found) {
        setActiveWorkspaceProblem(found);
        fetchSubmissionsForProblem(found.id);
      } else {
        navigate('/dsa');
      }
    } else {
      setActiveWorkspaceProblem(null);
      setSubmissions([]);
    }
  }, [paramProblemId, navigate, fetchSubmissionsForProblem]);

  // Close preview modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModalQuestion) {
        setActiveModalQuestion(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalQuestion]);

  // Retrieve student code for a specific problem and language
  const getCodeFor = (problemId, lang) => {
    if (problemCodes[problemId] && problemCodes[problemId][lang] !== undefined) {
      return problemCodes[problemId][lang];
    }
    const problem = DSA_QUESTIONS.find((q) => q.id === problemId);
    return problem?.starterCode?.[lang] || '';
  };

  // Update student code for the active problem and selected language
  const handleEditorChange = (newCode) => {
    if (!activeWorkspaceProblem) return;
    const pId = activeWorkspaceProblem.id;
    setProblemCodes((prev) => ({
      ...prev,
      [pId]: {
        ...(prev[pId] || activeWorkspaceProblem.starterCode),
        [selectedLang]: newCode ?? ''
      }
    }));
  };

  // Reset starter code for the active language
  const handleResetCode = () => {
    if (!activeWorkspaceProblem) return;
    const pId = activeWorkspaceProblem.id;
    const langLabel = CODE_LANGUAGES.find((l) => l.id === selectedLang)?.label || selectedLang;
    if (window.confirm(`Reset ${langLabel} code back to the original starter template?`)) {
      setProblemCodes((prev) => ({
        ...prev,
        [pId]: {
          ...(prev[pId] || activeWorkspaceProblem.starterCode),
          [selectedLang]: activeWorkspaceProblem.starterCode?.[selectedLang] || ''
        }
      }));
    }
  };

  // Restore past submitted code into Monaco editor
  const handleLoadSubmittedCode = (sub) => {
    if (!sub || !sub.code) return;
    if (
      window.confirm(
        `Load your ${sub.language.toUpperCase()} submission from ${new Date(sub.createdAt).toLocaleDateString()} into the editor?`
      )
    ) {
      setSelectedLang(sub.language);
      setProblemCodes((prev) => ({
        ...prev,
        [activeWorkspaceProblem.id]: {
          ...(prev[activeWorkspaceProblem.id] || activeWorkspaceProblem.starterCode),
          [sub.language]: sub.code
        }
      }));
      setActiveConsoleTab('output');
    }
  };

  // Run Code handler (OnlineCompiler.io Judge0-compatible execution for Phase 7.3)
  const handleRunCode = async () => {
    if (!activeWorkspaceProblem || isRunning || isSubmitting) return;
    const currentCode = getCodeFor(activeWorkspaceProblem.id, selectedLang);
    const langLabel = CODE_LANGUAGES.find((l) => l.id === selectedLang)?.label || selectedLang;
    const now = new Date().toLocaleTimeString();

    if (!currentCode || currentCode.trim().length === 0) {
      setConsoleOutput({
        type: 'error',
        badge: 'Validation Error',
        timestamp: now,
        content: `[RUN CODE ERROR]\nNo source code provided in the editor. Please write some code before executing.`
      });
      setActiveConsoleTab('output');
      return;
    }

    setIsRunning(true);
    setActiveConsoleTab('output');
    setConsoleOutput({
      type: 'running',
      badge: 'Compiling...',
      timestamp: now,
      content: `[EXECUTING IN ONLINECOMPILER SANDBOX]\nTimestamp: ${now}\nProblem: #${activeWorkspaceProblem.id} — ${activeWorkspaceProblem.title}\nLanguage: ${langLabel}\nStatus: Compiling and running against sample test case...\n\nPlease wait a moment.`
    });

    try {
      const authToken = token || localStorage.getItem('mydesk_token');
      const response = await fetch('http://localhost:5000/api/dsa/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          source_code: currentCode,
          language: selectedLang,
          stdin: activeWorkspaceProblem.sampleInput || '',
          problem_id: activeWorkspaceProblem.id
        })
      });

      const resData = await response.json();
      const finishedAt = new Date().toLocaleTimeString();

      if (resData.configured === false) {
        setConsoleOutput({
          type: 'warning',
          badge: resData.status?.description || 'Credentials Required',
          timestamp: finishedAt,
          content: `[ONLINECOMPILER SETUP REQUIRED]\n${resData.message}\n\nSecurity Notice: API keys must only be saved in server/.env and never exposed in the frontend.`
        });
        return;
      }

      if (!response.ok || !resData.success) {
        setConsoleOutput({
          type: 'error',
          badge: resData.error || 'Execution Error',
          timestamp: finishedAt,
          content: `[EXECUTION FAILED — HTTP ${response.status}]\nError: ${resData.error || 'Failed to execute code'}\nMessage: ${resData.message || 'Unknown error occurred.'}`
        });
        return;
      }

      const { status, stdout, stderr, compile_output, time, memory } = resData.data;

      let badgeType = 'success';
      if (status.id === 6) badgeType = 'compile-error';
      else if (status.id === 5) badgeType = 'tle';
      else if (status.id >= 7 && status.id <= 12) badgeType = 'runtime-error';
      else if (status.id === 4) badgeType = 'wrong-answer';
      else if (status.id === 3) badgeType = 'accepted';

      let lines = [];
      lines.push(`[EXECUTION RESULT — ${status.description.toUpperCase()}]`);
      lines.push(`Language: ${langLabel} | Time: ${time ? `${time}s` : '0.00s'} | Memory: ${memory ? `${memory} KB` : 'N/A'}`);
      lines.push(`Status: Code ${status.id} (${status.description})`);
      lines.push('--------------------------------------------------');

      if (compile_output && compile_output.trim()) {
        lines.push(`[COMPILATION OUTPUT]:\n${compile_output.trim()}`);
        lines.push('--------------------------------------------------');
      }

      if (stdout && stdout.trim()) {
        lines.push(`[STANDARD OUTPUT (stdout)]:\n${stdout.trim()}`);
      } else if (!compile_output && !stderr) {
        lines.push(`[STANDARD OUTPUT (stdout)]: (No output was printed to stdout)`);
      }

      if (stderr && stderr.trim()) {
        lines.push('--------------------------------------------------');
        lines.push(`[STANDARD ERROR (stderr)]:\n${stderr.trim()}`);
      }

      lines.push('--------------------------------------------------');
      lines.push(`[SAMPLE TEST CASE COMPARISON]:`);
      lines.push(`Sample Input:\n${activeWorkspaceProblem.sampleInput}`);
      lines.push(`Expected Output:\n${activeWorkspaceProblem.sampleOutput}`);
      lines.push(`Actual Output:\n${stdout ? stdout.trim() : '(None)'}`);

      if (stdout && stdout.trim() === activeWorkspaceProblem.sampleOutput.trim()) {
        lines.push(`\n✓ MATCH: Actual output matches expected sample output!`);
      } else if (stdout && stdout.trim()) {
        lines.push(`\nNote: Output does not exactly match sample output. Check spacing, formatting, or algorithm logic.`);
      }

      setConsoleOutput({
        type: badgeType,
        badge: status.description,
        timestamp: finishedAt,
        content: lines.join('\n')
      });

    } catch (err) {
      console.error('Run code error:', err);
      setConsoleOutput({
        type: 'error',
        badge: 'Connection Error',
        timestamp: new Date().toLocaleTimeString(),
        content: `[BACKEND CONNECTION ERROR]\nCould not connect to MyDesk backend at http://localhost:5000/api/dsa/run.\nError: ${err.message}\n\nPlease verify that the backend server is running.`
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code handler (Full test suite evaluation with hidden cases — Phase 7.4)
  const handleSubmitCode = async () => {
    if (!activeWorkspaceProblem || isSubmitting || isRunning) return;
    const currentCode = getCodeFor(activeWorkspaceProblem.id, selectedLang);
    const langLabel = CODE_LANGUAGES.find((l) => l.id === selectedLang)?.label || selectedLang;
    const now = new Date().toLocaleTimeString();

    if (!currentCode || currentCode.trim().length === 0) {
      setConsoleOutput({
        type: 'error',
        badge: 'Validation Error',
        timestamp: now,
        content: `[SUBMISSION ERROR]\nNo source code provided in the editor. Please write a solution before submitting.`
      });
      setActiveConsoleTab('output');
      return;
    }

    setIsSubmitting(true);
    setActiveConsoleTab('output');
    setConsoleOutput({
      type: 'running',
      badge: 'Evaluating...',
      timestamp: now,
      content: `[EVALUATING SUBMISSION]\nTimestamp: ${now}\nProblem: #${activeWorkspaceProblem.id} — ${activeWorkspaceProblem.title}\nLanguage: ${langLabel}\nStatus: Evaluating against all test cases (sample & hidden)...\n\nPlease wait a moment.`
    });

    try {
      const authToken = token || localStorage.getItem('mydesk_token');
      const response = await fetch('http://localhost:5000/api/dsa/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          source_code: currentCode,
          language: selectedLang,
          problem_id: activeWorkspaceProblem.id
        })
      });

      const resData = await response.json();
      const finishedAt = new Date().toLocaleTimeString();

      if (resData.configured === false) {
        setConsoleOutput({
          type: 'warning',
          badge: resData.status?.description || 'Credentials Required',
          timestamp: finishedAt,
          content: `[ONLINECOMPILER SETUP REQUIRED]\n${resData.message}\n\nSecurity Notice: API keys must only be saved in server/.env and never exposed in the frontend.`
        });
        return;
      }

      if (!response.ok || !resData.success) {
        setConsoleOutput({
          type: 'error',
          badge: resData.error || 'Submission Error',
          timestamp: finishedAt,
          content: `[SUBMISSION FAILED — HTTP ${response.status}]\nError: ${resData.error || 'Failed to evaluate submission'}\nMessage: ${resData.message || 'Unknown error occurred.'}`
        });
        return;
      }

      const { status, testCasesPassed, totalTestCases, runtime, memory, compileOutput, errorMessage, failedTestCase, stats } = resData.data;

      let badgeType = 'success';
      if (status === 'Compilation Error') badgeType = 'compile-error';
      else if (status === 'Time Limit Exceeded') badgeType = 'tle';
      else if (status === 'Runtime Error') badgeType = 'runtime-error';
      else if (status === 'Wrong Answer') badgeType = 'wrong-answer';
      else if (status === 'Accepted') badgeType = 'accepted';

      let lines = [];
      lines.push(`[SUBMISSION VERDICT — ${status.toUpperCase()}]`);
      lines.push(`Problem: #${activeWorkspaceProblem.id} — ${activeWorkspaceProblem.title}`);
      lines.push(`Language: ${langLabel} | Runtime: ${runtime ? `${runtime}s` : '0.00s'} | Memory: ${memory ? `${memory} KB` : 'N/A'}`);
      lines.push(`Test Cases: ${testCasesPassed} / ${totalTestCases} Passed (including hidden test cases)`);
      lines.push('--------------------------------------------------');

      if (status === 'Accepted') {
        lines.push(`🎉 ACCEPTED! All ${totalTestCases} test cases passed successfully!`);
        lines.push(`This problem is now recorded as Solved on your student dashboard.`);
      } else if (status === 'Wrong Answer' && failedTestCase) {
        lines.push(`✗ Wrong Answer on Test Case ${failedTestCase.testCaseNumber} (${failedTestCase.name}):`);
        if (failedTestCase.isHidden) {
          lines.push(`(Input and expected output are hidden for this test case)`);
        } else {
          lines.push(`Input:\n${failedTestCase.input}`);
          lines.push(`Expected Output: ${failedTestCase.expectedOutput}`);
          lines.push(`Actual Output: ${failedTestCase.actualOutput || '(None)'}`);
        }
      } else if (compileOutput) {
        lines.push(`[COMPILATION ERROR]:\n${compileOutput.trim()}`);
      } else if (errorMessage) {
        lines.push(`[RUNTIME ERROR]:\n${errorMessage.trim()}`);
      }

      lines.push('--------------------------------------------------');
      lines.push(`Student Progress: ${stats?.solvedCount || 0} of 100 Solved | ${stats?.attemptedCount || 0} Attempted`);

      setConsoleOutput({
        type: badgeType,
        badge: status,
        timestamp: finishedAt,
        content: lines.join('\n')
      });

      // Synchronize overall progress and problem submissions
      fetchUserProgress();
      fetchSubmissionsForProblem(activeWorkspaceProblem.id);

    } catch (err) {
      console.error('Submission request error:', err);
      setConsoleOutput({
        type: 'error',
        badge: 'Connection Error',
        timestamp: new Date().toLocaleTimeString(),
        content: `[BACKEND CONNECTION ERROR]\nCould not connect to MyDesk backend at http://localhost:5000/api/dsa/submit.\nError: ${err.message}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear console output
  const handleClearConsole = () => {
    setConsoleOutput({
      type: 'idle',
      badge: 'Ready',
      timestamp: null,
      content: 'Terminal console cleared.\n\nClick "Run Code" to test sample cases, or "Submit Code" to evaluate against hidden test suites.'
    });
  };

  // Open problem in workspace
  const handleOpenWorkspace = (question) => {
    setActiveModalQuestion(null);
    navigate(`/dsa/${question.id}`);
  };

  // Back to question catalog
  const handleBackToCatalog = () => {
    navigate('/dsa');
  };

  // Navigate to previous problem
  const handlePrevProblem = () => {
    if (!activeWorkspaceProblem || activeWorkspaceProblem.id <= 1) return;
    navigate(`/dsa/${activeWorkspaceProblem.id - 1}`);
  };

  // Navigate to next problem
  const handleNextProblem = () => {
    if (!activeWorkspaceProblem || activeWorkspaceProblem.id >= DSA_QUESTIONS.length) return;
    navigate(`/dsa/${activeWorkspaceProblem.id + 1}`);
  };

  // Catalog filtering handlers
  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setCurrentPage(1);
  };

  const handleDifficultyChange = (diff) => {
    setSelectedDifficulty(diff);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedTopic('All');
    setSelectedDifficulty('All');
    setSelectedStatus('All');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const isFilterActive =
    selectedTopic !== 'All' ||
    selectedDifficulty !== 'All' ||
    selectedStatus !== 'All' ||
    searchQuery.trim() !== '';

  // Filter questions based on topic, difficulty, status, and keyword search
  const filteredQuestions = useMemo(() => {
    const cleanSearch = searchQuery.trim().toLowerCase();

    return DSA_QUESTIONS.filter((q) => {
      if (selectedTopic !== 'All' && q.topic !== selectedTopic) return false;
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;

      // Status filter
      if (selectedStatus === 'Solved' && !userProgress.solvedIds.includes(q.id)) return false;
      if (
        selectedStatus === 'Attempted' &&
        (!userProgress.attemptedIds.includes(q.id) || userProgress.solvedIds.includes(q.id))
      )
        return false;
      if (selectedStatus === 'Todo' && userProgress.attemptedIds.includes(q.id)) return false;

      // Search filter
      if (cleanSearch) {
        const titleMatch = q.title.toLowerCase().includes(cleanSearch);
        const topicMatch = q.topic.toLowerCase().includes(cleanSearch);
        const statementMatch = q.problemStatement.toLowerCase().includes(cleanSearch);
        const idMatch = String(q.id).includes(cleanSearch);
        if (!titleMatch && !topicMatch && !statementMatch && !idMatch) return false;
      }

      return true;
    });
  }, [selectedTopic, selectedDifficulty, selectedStatus, searchQuery, userProgress]);

  // Difficulty counts
  const stats = useMemo(() => {
    let easy = 0;
    let medium = 0;
    let hard = 0;
    DSA_QUESTIONS.forEach((q) => {
      if (q.difficulty === 'Easy') easy++;
      else if (q.difficulty === 'Medium') medium++;
      else if (q.difficulty === 'Hard') hard++;
    });
    return { total: DSA_QUESTIONS.length, easy, medium, hard };
  }, []);

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * PAGE_SIZE;
  const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + PAGE_SIZE);

  // Copy code inside preview modal
  const handleCopyModalCode = () => {
    if (!activeModalQuestion || !activeModalQuestion.starterCode) return;
    const code = activeModalQuestion.starterCode[modalLang] || '';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        setModalCopied(true);
        setTimeout(() => setModalCopied(false), 2000);
      });
    }
  };

  // -------------------------------------------------------------
  // VIEW 1: CODING WORKSPACE (WHEN A PROBLEM IS ACTIVE)
  // -------------------------------------------------------------
  if (activeWorkspaceProblem) {
    const currentCode = getCodeFor(activeWorkspaceProblem.id, selectedLang);
    const monacoLang = CODE_LANGUAGES.find((l) => l.id === selectedLang)?.monacoLang || 'cpp';
    const isProblemSolved = userProgress.solvedIds.includes(activeWorkspaceProblem.id);
    const isProblemAttempted = userProgress.attemptedIds.includes(activeWorkspaceProblem.id);

    return (
      <Layout>
        <div className="dsa-workspace-container">
          {/* Workspace Top Navigation Bar */}
          <header className="workspace-top-bar">
            <div className="workspace-top-left">
              <button
                onClick={handleBackToCatalog}
                className="btn-back-catalog"
                title="Return to questions list"
              >
                ← Problem Catalog
              </button>
              <div className="workspace-problem-headline">
                <span className="problem-id-tag">#{activeWorkspaceProblem.id}</span>
                <h1 className="workspace-problem-title">{activeWorkspaceProblem.title}</h1>
                <span className={`difficulty-badge diff-${activeWorkspaceProblem.difficulty.toLowerCase()}`}>
                  {activeWorkspaceProblem.difficulty}
                </span>
                <span className="topic-badge">{activeWorkspaceProblem.topic}</span>
                {isProblemSolved ? (
                  <span className="dsa-status-badge badge-solved">✓ Solved</span>
                ) : isProblemAttempted ? (
                  <span className="dsa-status-badge badge-attempted">⏳ Attempted</span>
                ) : null}
              </div>
            </div>

            <div className="workspace-top-right">
              <button
                onClick={handlePrevProblem}
                disabled={activeWorkspaceProblem.id <= 1}
                className="btn-problem-step"
                title="Previous Problem"
              >
                ◀ Prev
              </button>
              <span className="problem-counter-text">
                {activeWorkspaceProblem.id} / {DSA_QUESTIONS.length}
              </span>
              <button
                onClick={handleNextProblem}
                disabled={activeWorkspaceProblem.id >= DSA_QUESTIONS.length}
                className="btn-problem-step"
                title="Next Problem"
              >
                Next ▶
              </button>
            </div>
          </header>

          {/* Split Workspace: Left Panel & Right Panel */}
          <div className="workspace-split-layout">
            {/* LEFT PANEL: Problem Details & Constraints */}
            <section className="workspace-left-panel">
              <div className="problem-panel-content">
                <div className="panel-section">
                  <h3 className="section-title">Problem Statement</h3>
                  <p className="problem-statement-text">{activeWorkspaceProblem.problemStatement}</p>
                </div>

                <div className="dsa-io-grid">
                  <div className="dsa-io-card">
                    <h5>Input Format</h5>
                    <p>{activeWorkspaceProblem.inputFormat}</p>
                  </div>
                  <div className="dsa-io-card">
                    <h5>Output Format</h5>
                    <p>{activeWorkspaceProblem.outputFormat}</p>
                  </div>
                </div>

                {activeWorkspaceProblem.constraints && (
                  <div className="panel-section">
                    <h3 className="section-title">Constraints</h3>
                    <pre className="dsa-constraints-box">{activeWorkspaceProblem.constraints}</pre>
                  </div>
                )}

                <div className="panel-section">
                  <h3 className="section-title">Sample Test Case</h3>
                  <div className="dsa-sample-grid">
                    <div>
                      <span className="sample-label">Sample Input:</span>
                      <pre className="code-example">{activeWorkspaceProblem.sampleInput}</pre>
                    </div>
                    <div>
                      <span className="sample-label">Sample Output:</span>
                      <pre className="code-example">{activeWorkspaceProblem.sampleOutput}</pre>
                    </div>
                  </div>
                  {activeWorkspaceProblem.explanation && (
                    <div className="sample-explanation">
                      <strong>Explanation:</strong> {activeWorkspaceProblem.explanation}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* RIGHT PANEL: Monaco Code Editor, Action Bar, and Console / Submissions */}
            <section className="workspace-right-panel">
              {/* Editor Controls Toolbar */}
              <div className="editor-controls-toolbar">
                <div className="toolbar-group">
                  <label className="toolbar-label">
                    <span>Language:</span>
                    <select
                      value={selectedLang}
                      onChange={(e) => setSelectedLang(e.target.value)}
                      className="editor-select"
                    >
                      {CODE_LANGUAGES.map((lang) => (
                        <option key={lang.id} value={lang.id}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="toolbar-label">
                    <span>Theme:</span>
                    <select
                      value={editorTheme}
                      onChange={(e) => setEditorTheme(e.target.value)}
                      className="editor-select"
                    >
                      <option value="vs-dark">🌙 Dark</option>
                      <option value="light">☀️ Light</option>
                    </select>
                  </label>

                  <label className="toolbar-label">
                    <span>Font:</span>
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="editor-select"
                    >
                      <option value={12}>12px</option>
                      <option value={14}>14px</option>
                      <option value={16}>16px</option>
                      <option value={18}>18px</option>
                      <option value={20}>20px</option>
                    </select>
                  </label>
                </div>

                <div className="toolbar-group">
                  <button
                    onClick={handleResetCode}
                    className="btn-editor-reset"
                    title="Reset code back to language starter template"
                  >
                    ↺ Reset Code
                  </button>
                </div>
              </div>

              {/* Monaco Editor Box */}
              <div className="monaco-editor-box">
                <Editor
                  height="420px"
                  language={monacoLang}
                  theme={editorTheme}
                  value={currentCode}
                  onChange={handleEditorChange}
                  options={{
                    fontSize: fontSize,
                    lineNumbers: 'on',
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 4,
                    wordWrap: 'on',
                    formatOnPaste: true,
                    formatOnType: true,
                    suggestOnTriggerCharacters: true,
                    cursorBlinking: 'smooth',
                    renderLineHighlight: 'all',
                    fontFamily: "'Consolas', 'Courier New', monospace"
                  }}
                  loading={
                    <div className="monaco-loading-state">
                      <div className="spinner"></div>
                      <span>Loading Monaco Code Editor...</span>
                    </div>
                  }
                />
              </div>

              {/* Execution Action Bar */}
              <div className="editor-action-bar">
                <div className="action-bar-left">
                  <span className="editor-lang-indicator">
                    Active: <strong>{CODE_LANGUAGES.find((l) => l.id === selectedLang)?.label}</strong>
                  </span>
                </div>
                <div className="action-bar-right">
                  <button
                    type="button"
                    onClick={handleRunCode}
                    disabled={isRunning || isSubmitting}
                    className="btn btn-run-code"
                  >
                    {isRunning ? '⏳ Compiling...' : '▶ Run Code'}
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitCode}
                    disabled={isRunning || isSubmitting}
                    className="btn btn-submit-code"
                  >
                    {isSubmitting ? '⏳ Evaluating...' : '🚀 Submit Code'}
                  </button>
                </div>
              </div>

              {/* Console & Submission History Panel */}
              <div className="workspace-console-panel">
                <div className="console-panel-header">
                  <div className="console-header-left">
                    <button
                      type="button"
                      onClick={() => setActiveConsoleTab('output')}
                      className={`console-tab-btn ${activeConsoleTab === 'output' ? 'active' : ''}`}
                    >
                      Terminal & Output
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveConsoleTab('history')}
                      className={`console-tab-btn ${activeConsoleTab === 'history' ? 'active' : ''}`}
                    >
                      Submissions ({submissions.length})
                    </button>

                    {activeConsoleTab === 'output' && consoleOutput.type !== 'idle' && (
                      <span className={`console-badge badge-${consoleOutput.type}`}>
                        {consoleOutput.badge || consoleOutput.type}
                      </span>
                    )}
                  </div>
                  <div className="console-header-right">
                    {activeConsoleTab === 'output' && (
                      <>
                        {consoleOutput.timestamp && (
                          <span className="console-timestamp">{consoleOutput.timestamp}</span>
                        )}
                        <button
                          onClick={handleClearConsole}
                          className="btn-console-clear"
                          title="Clear terminal output"
                        >
                          Clear
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="console-panel-body">
                  {activeConsoleTab === 'output' ? (
                    <pre className="console-pre-text">{consoleOutput.content}</pre>
                  ) : (
                    <div className="submissions-history-container">
                      {loadingSubmissions ? (
                        <div className="submissions-loading">Loading past submissions...</div>
                      ) : submissions.length === 0 ? (
                        <div className="submissions-empty">
                          No submissions recorded yet for Problem #{activeWorkspaceProblem.id}. Click <strong>Submit Code</strong> above to evaluate your solution against the complete test suite.
                        </div>
                      ) : (
                        <div className="submissions-table-scroll">
                          <table className="submissions-table">
                            <thead>
                              <tr>
                                <th>Status</th>
                                <th>Language</th>
                                <th>Passed</th>
                                <th>Time</th>
                                <th>Memory</th>
                                <th>Submitted At</th>
                                <th style={{ textAlign: 'right' }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {submissions.map((sub) => (
                                <tr key={sub._id}>
                                  <td>
                                    <span
                                      className={`submission-tag tag-${sub.status.toLowerCase().replace(/\s+/g, '-')}`}
                                    >
                                      {sub.status === 'Accepted' ? '✓ Accepted' : sub.status}
                                    </span>
                                  </td>
                                  <td style={{ textTransform: 'uppercase', fontWeight: 700 }}>
                                    {sub.language}
                                  </td>
                                  <td>
                                    {sub.testCasesPassed} / {sub.totalTestCases}
                                  </td>
                                  <td>{sub.runtime ? `${sub.runtime}s` : '0.00s'}</td>
                                  <td>{sub.memory ? `${sub.memory} KB` : 'N/A'}</td>
                                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                    {new Date(sub.createdAt).toLocaleDateString()}{' '}
                                    {new Date(sub.createdAt).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    <button
                                      type="button"
                                      onClick={() => handleLoadSubmittedCode(sub)}
                                      className="btn-load-code"
                                      title="Restore this code into the editor"
                                    >
                                      Load Code
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: QUESTION CATALOG & PROBLEM TABLE
  // -------------------------------------------------------------
  return (
    <Layout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">DSA Practice Platform</h1>
          <p className="page-subtitle">
            Curated catalog of 100 essential Data Structures & Algorithms coding challenges for placements and technical interviews.
          </p>
        </div>
        <div className="header-badge">
          <span>{filteredQuestions.length} / {DSA_QUESTIONS.length} Questions Displayed</span>
        </div>
      </div>

      {/* Overview Stats Bar (Real MongoDB Solved & Attempted Tracking - Phase 7.4) */}
      <section className="dsa-stats-grid dsa-stats-expanded">
        <div className="dsa-stat-card">
          <span className="dsa-stat-num">{stats.total}</span>
          <span className="dsa-stat-label">Total Problems</span>
        </div>
        <div className="dsa-stat-card dsa-stat-solved">
          <span className="dsa-stat-num" style={{ color: '#10b981' }}>
            {userProgress.solvedCount}
          </span>
          <span className="dsa-stat-label">Solved</span>
        </div>
        <div className="dsa-stat-card dsa-stat-attempted">
          <span className="dsa-stat-num" style={{ color: '#f59e0b' }}>
            {userProgress.attemptedCount}
          </span>
          <span className="dsa-stat-label">Attempted</span>
        </div>
        <div className="dsa-stat-card dsa-stat-easy">
          <span className="dsa-stat-num">{stats.easy}</span>
          <span className="dsa-stat-label">Easy</span>
        </div>
        <div className="dsa-stat-card dsa-stat-medium">
          <span className="dsa-stat-num">{stats.medium}</span>
          <span className="dsa-stat-label">Medium</span>
        </div>
        <div className="dsa-stat-card dsa-stat-hard">
          <span className="dsa-stat-num">{stats.hard}</span>
          <span className="dsa-stat-label">Hard</span>
        </div>
      </section>

      {/* Search and Filters Bar */}
      <section className="dashboard-card dsa-filters-container">
        {/* Search Input */}
        <div className="interview-search-bar" style={{ marginBottom: '1.25rem' }}>
          <span className="search-icon-left">🔍</span>
          <input
            type="text"
            className="interview-search-input"
            placeholder="Search problems by title, topic, or keyword (e.g. Two Sum, Palindrome, DFS, DP, Stack)..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="search-clear-btn"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Status Filter (Phase 7.4) */}
        <div className="dsa-filter-row">
          <span className="filter-label">Status:</span>
          <div className="filter-pills">
            {STATUS_FILTERS.map((st) => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`pill-btn ${selectedStatus === st ? 'pill-active' : ''}`}
              >
                {st === 'All' ? 'All Status' : st}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <span className="filter-label" style={{ marginLeft: '1rem' }}>
            Difficulty:
          </span>
          <div className="filter-pills">
            {DSA_DIFFICULTIES.map((diff) => (
              <button
                key={diff}
                onClick={() => handleDifficultyChange(diff)}
                className={`pill-btn ${selectedDifficulty === diff ? 'pill-active' : ''}`}
              >
                {diff === 'All' ? 'All Difficulties' : diff}
              </button>
            ))}
          </div>

          {isFilterActive && (
            <button onClick={handleClearFilters} className="btn-clear-filters">
              Clear All Filters ✕
            </button>
          )}
        </div>

        {/* Topic Filter */}
        <div className="dsa-filter-row" style={{ marginTop: '0.85rem' }}>
          <span className="filter-label">Topics:</span>
          <div className="filter-pills dsa-topic-pills">
            {DSA_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicChange(topic)}
                className={`pill-btn ${selectedTopic === topic ? 'pill-active' : ''}`}
              >
                {topic === 'All' ? 'All Topics' : topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Questions Table */}
      <section className="dashboard-card table-card">
        {paginatedQuestions.length === 0 ? (
          <div className="empty-state" style={{ padding: '3.5rem 1rem' }}>
            <div className="empty-icon">🔍</div>
            <h3>No Questions Found</h3>
            <p>No coding problems match your current search and filter selections.</p>
            <button onClick={handleClearFilters} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            <table className="questions-table">
              <thead>
                <tr>
                  <th style={{ width: '50px' }}>#</th>
                  <th style={{ width: '110px' }}>Status</th>
                  <th>Problem Title</th>
                  <th style={{ width: '220px' }}>Topic</th>
                  <th style={{ width: '100px' }}>Difficulty</th>
                  <th style={{ width: '180px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedQuestions.map((q) => {
                  const isSolved = userProgress.solvedIds.includes(q.id);
                  const isAttempted = userProgress.attemptedIds.includes(q.id);

                  return (
                    <tr key={q.id} className="dsa-table-row">
                      <td className="col-id">{q.id}</td>
                      <td className="col-status">
                        {isSolved ? (
                          <span className="dsa-status-badge badge-solved" title="Solved">
                            ✓ Solved
                          </span>
                        ) : isAttempted ? (
                          <span className="dsa-status-badge badge-attempted" title="Attempted">
                            ⏳ Attempted
                          </span>
                        ) : (
                          <span className="dsa-status-badge badge-todo" title="Not attempted yet">
                            Todo
                          </span>
                        )}
                      </td>
                      <td className="col-title" onClick={() => handleOpenWorkspace(q)}>
                        <span className="q-title">{q.title}</span>
                      </td>
                      <td>
                        <span className="topic-badge">{q.topic}</span>
                      </td>
                      <td>
                        <span className={`difficulty-badge diff-${q.difficulty.toLowerCase()}`}>
                          {q.difficulty}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                          <button
                            type="button"
                            onClick={() => setActiveModalQuestion(q)}
                            className="btn btn-outline btn-sm"
                            title="Quick preview details"
                          >
                            Details
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenWorkspace(q)}
                            className={`btn btn-sm ${isSolved ? 'btn-outline' : 'btn-primary'}`}
                            title="Open Monaco code editor"
                          >
                            {isSolved ? 'Review ➔' : 'Solve ➔'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="dsa-pagination-bar">
              <span className="dsa-pagination-info">
                Showing {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, filteredQuestions.length)} of{' '}
                {filteredQuestions.length} problems
              </span>

              <div className="dsa-pagination-controls">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={validCurrentPage === 1}
                  className="page-nav-btn"
                >
                  ◀ Previous
                </button>

                <div className="page-numbers-list">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= validCurrentPage - 2 && pageNum <= validCurrentPage + 2)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`page-num-btn ${validCurrentPage === pageNum ? 'active' : ''}`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    if (
                      pageNum === validCurrentPage - 3 ||
                      pageNum === validCurrentPage + 3
                    ) {
                      return (
                        <span key={pageNum} className="page-ellipsis">
                          …
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={validCurrentPage === totalPages}
                  className="page-nav-btn"
                >
                  Next ▶
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Problem Quick Details Modal (from Phase 7.1) */}
      {activeModalQuestion && (
        <div className="modal-backdrop" onClick={() => setActiveModalQuestion(null)}>
          <div className="modal-dialog modal-dialog-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                  <span className={`difficulty-badge diff-${activeModalQuestion.difficulty.toLowerCase()}`}>
                    {activeModalQuestion.difficulty}
                  </span>
                  <span className="topic-badge">{activeModalQuestion.topic}</span>
                  {userProgress.solvedIds.includes(activeModalQuestion.id) && (
                    <span className="dsa-status-badge badge-solved">✓ Solved</span>
                  )}
                </div>
                <h2 className="modal-title">
                  Problem {activeModalQuestion.id}: {activeModalQuestion.title}
                </h2>
              </div>
              <button
                className="modal-close"
                onClick={() => setActiveModalQuestion(null)}
                title="Close modal (Esc)"
              >
                ✕
              </button>
            </div>

            <div className="modal-body dsa-modal-body">
              <div className="dsa-modal-section">
                <h4>Problem Statement</h4>
                <p className="problem-text">{activeModalQuestion.problemStatement}</p>
              </div>

              <div className="dsa-io-grid">
                <div className="dsa-io-card">
                  <h5>Input Format</h5>
                  <p>{activeModalQuestion.inputFormat}</p>
                </div>
                <div className="dsa-io-card">
                  <h5>Output Format</h5>
                  <p>{activeModalQuestion.outputFormat}</p>
                </div>
              </div>

              {activeModalQuestion.constraints && (
                <div className="dsa-modal-section">
                  <h4>Constraints</h4>
                  <pre className="dsa-constraints-box">{activeModalQuestion.constraints}</pre>
                </div>
              )}

              <div className="dsa-modal-section">
                <h4>Sample Test Case</h4>
                <div className="dsa-sample-grid">
                  <div>
                    <span className="sample-label">Sample Input:</span>
                    <pre className="code-example">{activeModalQuestion.sampleInput}</pre>
                  </div>
                  <div>
                    <span className="sample-label">Sample Output:</span>
                    <pre className="code-example">{activeModalQuestion.sampleOutput}</pre>
                  </div>
                </div>
                {activeModalQuestion.explanation && (
                  <div className="sample-explanation">
                    <strong>Explanation:</strong> {activeModalQuestion.explanation}
                  </div>
                )}
              </div>

              <div className="dsa-modal-section">
                <div className="starter-code-header">
                  <h4>Starter Code Templates</h4>
                  <button onClick={handleCopyModalCode} className="btn-copy-code">
                    {modalCopied ? '✓ Copied!' : '📋 Copy Code'}
                  </button>
                </div>

                <div className="lang-tabs-bar">
                  {CODE_LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setModalLang(lang.id)}
                      className={`lang-tab-btn ${modalLang === lang.id ? 'active' : ''}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                <pre className="dsa-code-preview">
                  <code>{activeModalQuestion.starterCode[modalLang] || '// No starter code available'}</code>
                </pre>
              </div>
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <button onClick={() => setActiveModalQuestion(null)} className="btn btn-outline">
                Close Preview
              </button>
              <button onClick={() => handleOpenWorkspace(activeModalQuestion)} className="btn btn-primary">
                Solve in Code Editor ➔
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default DsaPractice;
