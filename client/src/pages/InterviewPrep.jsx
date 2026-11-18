// pages/InterviewPrep.jsx
// Technical Interview Preparation platform with categorized subjects, keyword search, and interactive Q&A.

import { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import { INTERVIEW_SUBJECTS, SUBJECT_CATEGORIES } from '../data/interviewData';

function InterviewPrep() {
  // Category filter state ('All' | 'Programming Languages' | 'Core Computer Science')
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Subject filter state ('all' | specific subject id like 'c', 'dbms', etc.)
  const [selectedSubjectId, setSelectedSubjectId] = useState('all');

  // Search keyword state
  const [searchTerm, setSearchTerm] = useState('');

  // Set of expanded question IDs for accordion toggling
  const [expandedIds, setExpandedIds] = useState(new Set());

  // 1. Available subjects based on category selection
  const availableSubjects = useMemo(() => {
    if (selectedCategory === 'All') return INTERVIEW_SUBJECTS;
    return INTERVIEW_SUBJECTS.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  // Reset subject filter if it's not in the newly selected category
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat !== 'All') {
      const match = INTERVIEW_SUBJECTS.find((s) => s.id === selectedSubjectId);
      if (match && match.category !== cat) {
        setSelectedSubjectId('all');
      }
    }
  };

  // 2. Filter questions based on Category, Subject, and Search Term
  const filteredQuestions = useMemo(() => {
    // Determine which subjects to include
    let targetSubjects = availableSubjects;
    if (selectedSubjectId !== 'all') {
      targetSubjects = targetSubjects.filter((s) => s.id === selectedSubjectId);
    }

    // Flatten questions with parent subject metadata
    const allQuestions = [];
    targetSubjects.forEach((subject) => {
      subject.questions.forEach((q) => {
        allQuestions.push({
          ...q,
          subjectName: subject.name,
          subjectIcon: subject.icon,
          subjectCategory: subject.category
        });
      });
    });

    // Apply keyword search
    const cleanSearch = searchTerm.trim().toLowerCase();
    if (!cleanSearch) return allQuestions;

    return allQuestions.filter((item) => {
      const matchQ = item.q.toLowerCase().includes(cleanSearch);
      const matchA = item.a.toLowerCase().includes(cleanSearch);
      const matchKeywords = item.keywords && item.keywords.some((kw) => kw.toLowerCase().includes(cleanSearch));
      const matchSubject = item.subjectName.toLowerCase().includes(cleanSearch);

      return matchQ || matchA || matchKeywords || matchSubject;
    });
  }, [availableSubjects, selectedSubjectId, searchTerm]);

  // Toggle single question accordion
  const toggleAccordion = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Expand all currently filtered questions
  const handleExpandAll = () => {
    const allIds = new Set(filteredQuestions.map((q) => q.id));
    setExpandedIds(allIds);
  };

  // Collapse all questions
  const handleCollapseAll = () => {
    setExpandedIds(new Set());
  };

  // Clear all filters and search input
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSubjectId('all');
    setSearchTerm('');
    setExpandedIds(new Set());
  };

  // Currently active subject metadata for the banner (if a single subject is picked)
  const activeSubjectMeta = selectedSubjectId !== 'all'
    ? INTERVIEW_SUBJECTS.find((s) => s.id === selectedSubjectId)
    : null;

  return (
    <Layout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Technical Interview Preparation</h1>
          <p className="page-subtitle">
            Master placement questions across Programming Languages and Core Computer Science subjects.
          </p>
        </div>
        <div className="header-badge">
          <span>{filteredQuestions.length} Questions Available</span>
        </div>
      </div>

      {/* 1. Search Bar */}
      <div className="interview-search-bar">
        <span className="search-icon-left">🔍</span>
        <input
          type="text"
          className="interview-search-input"
          placeholder="Search questions by topic, keyword, or concept (e.g., deadlock, pointers, indexing, virtual memory, GIL)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="search-clear-btn"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* 2. Category Filter Tabs */}
      <div className="category-filter-row">
        <span className="filter-label">Domain:</span>
        <button
          onClick={() => handleCategoryChange('All')}
          className={`category-tag-btn ${selectedCategory === 'All' ? 'active' : ''}`}
        >
          All Domains
        </button>
        <button
          onClick={() => handleCategoryChange(SUBJECT_CATEGORIES.PROGRAMMING)}
          className={`category-tag-btn ${selectedCategory === SUBJECT_CATEGORIES.PROGRAMMING ? 'active' : ''}`}
        >
          💻 Programming Languages
        </button>
        <button
          onClick={() => handleCategoryChange(SUBJECT_CATEGORIES.CORE_CS)}
          className={`category-tag-btn ${selectedCategory === SUBJECT_CATEGORIES.CORE_CS ? 'active' : ''}`}
        >
          🗄️ Core Computer Science
        </button>
      </div>

      {/* 3. Subject Pills */}
      <section className="filter-bar" style={{ marginBottom: '1.5rem' }}>
        <span className="filter-label">Subject:</span>
        <div className="filter-pills">
          <button
            onClick={() => setSelectedSubjectId('all')}
            className={`pill-btn ${selectedSubjectId === 'all' ? 'pill-active' : ''}`}
          >
            All Subjects
          </button>
          {availableSubjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubjectId(subject.id)}
              className={`pill-btn ${selectedSubjectId === subject.id ? 'pill-active' : ''}`}
            >
              <span>{subject.icon}</span> {subject.name}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Subject Overview Banner (shown when a single subject is selected) */}
      {activeSubjectMeta && !searchTerm && (
        <section className="dashboard-card info-card" style={{ marginBottom: '1.5rem' }}>
          <div className="subject-info-banner">
            <span className="subject-icon">{activeSubjectMeta.icon}</span>
            <div>
              <h3>{activeSubjectMeta.name}</h3>
              <p>{activeSubjectMeta.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* 5. Questions Accordion List */}
      <section className="dashboard-card">
        <div className="accordion-top-bar">
          <h3 className="card-section-title" style={{ margin: 0 }}>
            {searchTerm ? `Search Results for "${searchTerm}"` : activeSubjectMeta ? `${activeSubjectMeta.name} Questions` : 'All Interview Questions'} ({filteredQuestions.length})
          </h3>
          {filteredQuestions.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleExpandAll}
                className="btn btn-outline btn-sm"
              >
                Expand All
              </button>
              <button
                onClick={handleCollapseAll}
                className="btn btn-outline btn-sm"
              >
                Collapse All
              </button>
            </div>
          )}
        </div>

        {filteredQuestions.length === 0 ? (
          /* Empty / No Results State */
          <div className="empty-notice" style={{ padding: '3rem 1rem' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>🔍</span>
            <h4>No matching questions found</h4>
            <p style={{ maxWidth: '480px', margin: '0.5rem auto 1.25rem auto' }}>
              {searchTerm ? (
                <>No questions found matching "<strong>{searchTerm}</strong>". Try searching for different keywords or checking spelling.</>
              ) : (
                <>No questions found for the selected category filter.</>
              )}
            </p>
            <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
              Reset Filters & Show All
            </button>
          </div>
        ) : (
          <div className="accordion-list">
            {filteredQuestions.map((item, idx) => {
              const isExpanded = expandedIds.has(item.id);
              return (
                <div key={item.id} className="accordion-item">
                  <button
                    className="accordion-header"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isExpanded}
                  >
                    <span className="q-number">Q{idx + 1}.</span>
                    {/* Subject badge shown when browsing all subjects or searching */}
                    {(selectedSubjectId === 'all' || searchTerm) && (
                      <span className="subject-badge-pill">
                        {item.subjectIcon} {item.subjectName}
                      </span>
                    )}
                    <span className="q-text">{item.q}</span>
                    <span className="accordion-arrow">{isExpanded ? '▲' : '▼'}</span>
                  </button>

                  {isExpanded && (
                    <div className="accordion-body">
                      <pre className="answer-text">{item.a}</pre>
                      {item.code && (
                        <pre className="answer-code-block">{item.code}</pre>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default InterviewPrep;
