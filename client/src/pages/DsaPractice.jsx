// pages/DsaPractice.jsx
// DSA practice question catalog with topic filtering, difficulty tags, and modal preview.

import { useState } from 'react';
import Layout from '../components/Layout';

function DsaPractice() {
  // Topic filter state
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Sample curated coding problems for MyDesk (~100 questions roadmap)
  const questions = [
    {
      id: 1,
      title: 'Two Sum',
      topic: 'Arrays',
      difficulty: 'Easy',
      acceptance: '51%',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]'
    },
    {
      id: 2,
      title: 'Best Time to Buy and Sell Stock',
      topic: 'Arrays',
      difficulty: 'Easy',
      acceptance: '54%',
      description: 'You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
      example: 'Input: prices = [7,1,5,3,6,4]\nOutput: 5 (Buy on day 2 and sell on day 5)'
    },
    {
      id: 3,
      title: 'Valid Palindrome',
      topic: 'Strings',
      difficulty: 'Easy',
      acceptance: '46%',
      description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
      example: 'Input: s = "A man, a plan, a canal: Panama"\nOutput: true'
    },
    {
      id: 4,
      title: 'Longest Substring Without Repeating Characters',
      topic: 'Strings',
      difficulty: 'Medium',
      acceptance: '34%',
      description: 'Given a string s, find the length of the longest substring without duplicate characters.',
      example: 'Input: s = "abcabcbb"\nOutput: 3 ("abc")'
    },
    {
      id: 5,
      title: 'Reverse Linked List',
      topic: 'Linked List',
      difficulty: 'Easy',
      acceptance: '74%',
      description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      example: 'Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]'
    },
    {
      id: 6,
      title: 'Detect Cycle in a Linked List',
      topic: 'Linked List',
      difficulty: 'Medium',
      acceptance: '49%',
      description: 'Given head, determine if the linked list has a cycle in it using Floyd Cycle-Finding algorithm.',
      example: 'Input: head = [3,2,0,-4], pos = 1\nOutput: true'
    },
    {
      id: 7,
      title: 'Valid Parentheses',
      topic: 'Stack & Queue',
      difficulty: 'Easy',
      acceptance: '41%',
      description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
      example: 'Input: s = "()[]{}"\nOutput: true'
    },
    {
      id: 8,
      title: 'Binary Tree Inorder Traversal',
      topic: 'Trees',
      difficulty: 'Easy',
      acceptance: '75%',
      description: 'Given the root of a binary tree, return the inorder traversal of its nodes values.',
      example: 'Input: root = [1,null,2,3]\nOutput: [1,3,2]'
    },
    {
      id: 9,
      title: 'Maximum Depth of Binary Tree',
      topic: 'Trees',
      difficulty: 'Easy',
      acceptance: '74%',
      description: 'Given the root of a binary tree, return its maximum depth (number of nodes along longest path).',
      example: 'Input: root = [3,9,20,null,null,15,7]\nOutput: 3'
    },
    {
      id: 10,
      title: 'Climbing Stairs',
      topic: 'Dynamic Programming',
      difficulty: 'Easy',
      acceptance: '52%',
      description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. How many distinct ways can you climb?',
      example: 'Input: n = 3\nOutput: 3 (1+1+1, 1+2, 2+1)'
    },
    {
      id: 11,
      title: 'Coin Change Problem',
      topic: 'Dynamic Programming',
      difficulty: 'Medium',
      acceptance: '43%',
      description: 'Given an integer array coins representing coins of different denominations and an integer amount, compute the fewest number of coins needed.',
      example: 'Input: coins = [1,2,5], amount = 11\nOutput: 3 (5 + 5 + 1)'
    },
    {
      id: 12,
      title: 'Trapping Rain Water',
      topic: 'Arrays',
      difficulty: 'Hard',
      acceptance: '60%',
      description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
      example: 'Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6'
    }
  ];

  const topics = ['All', 'Arrays', 'Strings', 'Linked List', 'Stack & Queue', 'Trees', 'Dynamic Programming'];

  // Filter questions based on selected topic
  const filteredQuestions = selectedTopic === 'All'
    ? questions
    : questions.filter((q) => q.topic === selectedTopic);

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">DSA Practice Platform</h1>
          <p className="page-subtitle">Curated collection of 100 essential Data Structures & Algorithms coding challenges.</p>
        </div>
        <div className="header-badge">
          <span>{filteredQuestions.length} Questions Displayed</span>
        </div>
      </div>

      {/* Topic Filter Pills */}
      <section className="filter-bar">
        <span className="filter-label">Filter by Topic:</span>
        <div className="filter-pills">
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`pill-btn ${selectedTopic === t ? 'pill-active' : ''}`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Questions Table / List */}
      <section className="dashboard-card table-card">
        <table className="questions-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Question Title</th>
              <th>Topic</th>
              <th>Difficulty</th>
              <th>Acceptance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((q) => (
              <tr key={q.id}>
                <td className="col-id">{q.id}</td>
                <td className="col-title">
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
                <td className="col-accept">{q.acceptance}</td>
                <td>
                  <button
                    onClick={() => setActiveQuestion(q)}
                    className="btn btn-outline btn-sm"
                  >
                    Open Question
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Question Preview Modal */}
      {activeQuestion && (
        <div className="modal-backdrop" onClick={() => setActiveQuestion(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className={`difficulty-badge diff-${activeQuestion.difficulty.toLowerCase()}`}>
                  {activeQuestion.difficulty}
                </span>
                <h2 className="modal-title">{activeQuestion.id}. {activeQuestion.title}</h2>
                <span className="modal-topic">{activeQuestion.topic}</span>
              </div>
              <button
                className="modal-close"
                onClick={() => setActiveQuestion(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <h4>Problem Description:</h4>
              <p className="problem-text">{activeQuestion.description}</p>

              <h4>Example:</h4>
              <pre className="code-example">{activeQuestion.example}</pre>

              <div className="modal-notice">
                <p>
                  💡 <strong>Phase 4 Preview:</strong> The in-browser code editor, test case runner,
                  and one-click GitHub push integration will be implemented in Phase 4 and Phase 5.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setActiveQuestion(null)}
                className="btn btn-outline"
              >
                Close Preview
              </button>
              <button
                onClick={() => alert(`Problem "${activeQuestion.title}" code editor will launch in Phase 4!`)}
                className="btn btn-primary"
              >
                Solve on MyDesk
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default DsaPractice;
