// pages/InterviewPrep.jsx
// Technical Interview Preparation with subject categories, sample questions, and explanations.

import { useState } from 'react';
import Layout from '../components/Layout';

function InterviewPrep() {
  const [activeCategory, setActiveCategory] = useState('DBMS');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  // Curated categories and top placement interview questions
  const interviewData = {
    DBMS: {
      title: 'Database Management Systems (DBMS)',
      desc: 'Relational algebra, SQL queries, indexing, normalization, and ACID properties.',
      questions: [
        {
          q: 'What are ACID properties in a database transaction?',
          a: 'ACID stands for:\n• Atomicity: Entire transaction succeeds or completely rolls back.\n• Consistency: Database remains in a valid state before and after transaction.\n• Isolation: Multiple concurrent transactions do not interfere with each other.\n• Durability: Once committed, changes survive even in system failures.'
        },
        {
          q: 'Explain the difference between Primary Key, Foreign Key, and Unique Key.',
          a: '• Primary Key: Uniquely identifies each row in a table. Cannot contain NULL values. Only one per table.\n• Unique Key: Uniquely identifies rows but allows a single NULL value (in most DBs).\n• Foreign Key: Refers to the primary key of another table, establishing a relationship and enforcing referential integrity.'
        },
        {
          q: 'What is Database Normalization and why is it used?',
          a: 'Normalization is the process of organizing relational tables to minimize data redundancy and eliminate anomalies (Insertion, Deletion, Update). The main normal forms are 1NF, 2NF, 3NF, and BCNF.'
        },
        {
          q: 'How does B-Tree / B+Tree Indexing speed up SQL queries?',
          a: 'Indexes create a balanced tree data structure over indexed columns, reducing lookups from O(N) full table scan down to O(log N) search time, optimizing disk I/O operations.'
        }
      ]
    },
    OS: {
      title: 'Operating Systems (OS)',
      desc: 'Process scheduling, virtual memory, multithreading, deadlocks, and synchronization.',
      questions: [
        {
          q: 'What is the difference between a Process and a Thread?',
          a: '• Process: An executing program with its own dedicated memory address space (heavyweight).\n• Thread: A light unit of execution within a process that shares memory and resources with other threads in the same process.'
        },
        {
          q: 'What are the four necessary conditions for a Deadlock?',
          a: '1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.\n2. Hold and Wait: A process holds resources while requesting new ones.\n3. No Preemption: Resources cannot be forcibly taken away.\n4. Circular Wait: A closed chain of processes exists where each waits for a resource held by the next.'
        },
        {
          q: 'Explain Virtual Memory and Paging.',
          a: 'Virtual memory allows execution of processes that may not be completely in physical RAM. Paging divides virtual memory into fixed-size blocks (pages) and physical memory into frames, mapped by a Page Table.'
        }
      ]
    },
    CN: {
      title: 'Computer Networks (CN)',
      desc: 'OSI 7-layer model, TCP vs UDP, HTTP/HTTPS, DNS, and socket programming basics.',
      questions: [
        {
          q: 'Explain the difference between TCP and UDP.',
          a: '• TCP (Transmission Control Protocol): Connection-oriented, reliable, guarantees packet ordering and delivery via 3-way handshake, error checking, and flow control.\n• UDP (User Datagram Protocol): Connectionless, lightweight, faster, does not guarantee delivery (used in video streaming, gaming, DNS).'
        },
        {
          q: 'What happens when you enter a URL in a browser and press Enter?',
          a: '1. Browser checks cache (browser, OS, router).\n2. DNS lookup resolves hostname to an IP address.\n3. TCP 3-way handshake establishes connection (SYN, SYN-ACK, ACK).\n4. TLS handshake occurs if HTTPS.\n5. Browser sends HTTP GET request.\n6. Web server processes request and returns HTTP response (HTML, CSS, JS).\n7. Browser parses and renders the web page.'
        },
        {
          q: 'What is the purpose of the 7 layers in the OSI Model?',
          a: '1. Physical (bits)\n2. Data Link (frames, MAC)\n3. Network (packets, IP routing)\n4. Transport (segments, TCP/UDP)\n5. Session (dialog control)\n6. Presentation (encryption, formatting)\n7. Application (HTTP, FTP, SMTP).'
        }
      ]
    },
    OOP: {
      title: 'Object-Oriented Programming (OOP)',
      desc: 'Encapsulation, Abstraction, Inheritance, Polymorphism, and SOLID principles.',
      questions: [
        {
          q: 'What are the four pillars of Object-Oriented Programming?',
          a: '1. Encapsulation: Bundling data and methods into a single unit (class) and restricting direct access.\n2. Abstraction: Hiding internal implementation details and exposing only essential features.\n3. Inheritance: Reusing properties and methods from a parent class.\n4. Polymorphism: Ability to present the same interface for differing underlying data types (Method Overloading and Overriding).'
        },
        {
          q: 'What is the difference between Abstract Class and Interface?',
          a: '• Abstract Class: Can have both concrete (implemented) methods and abstract methods. A class can inherit only one abstract class.\n• Interface: Blueprint of a class with method declarations (pure abstraction). A class can implement multiple interfaces.'
        }
      ]
    },
    SystemDesign: {
      title: 'System Design Basics',
      desc: 'Scalability, Load Balancers, Caching, Database Sharding, and Microservices.',
      questions: [
        {
          q: 'What is Horizontal vs Vertical Scaling?',
          a: '• Vertical Scaling (Scale Up): Adding more CPU, RAM, or storage to an existing single machine.\n• Horizontal Scaling (Scale Out): Adding more servers or machines to distribute the load across a cluster.'
        },
        {
          q: 'What is a Load Balancer and why is it essential?',
          a: 'A load balancer distributes incoming network traffic across multiple backend servers using algorithms like Round Robin, Least Connections, or IP Hash, preventing single points of failure.'
        },
        {
          q: 'How does Caching (e.g., Redis) improve system performance?',
          a: 'Caching stores frequently requested data in fast, in-memory storage, drastically reducing database load and lowering response latencies from milliseconds to microseconds.'
        }
      ]
    }
  };

  const categories = Object.keys(interviewData);

  const toggleAccordion = (idx) => {
    setExpandedQuestion(expandedQuestion === idx ? null : idx);
  };

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Technical Interview Preparation</h1>
          <p className="page-subtitle">Master core Computer Science fundamentals asked in placement interviews.</p>
        </div>
      </div>

      {/* Subject Navigation Tabs */}
      <section className="filter-bar">
        <span className="filter-label">Select Subject:</span>
        <div className="filter-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedQuestion(null);
              }}
              className={`pill-btn ${activeCategory === cat ? 'pill-active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Subject Overview Card */}
      <section className="dashboard-card info-card">
        <div className="subject-info-banner">
          <span className="subject-icon">🎯</span>
          <div>
            <h3>{interviewData[activeCategory].title}</h3>
            <p>{interviewData[activeCategory].desc}</p>
          </div>
        </div>
      </section>

      {/* Questions Accordion List */}
      <section className="dashboard-card">
        <h3 className="card-section-title">
          Frequently Asked Questions ({interviewData[activeCategory].questions.length})
        </h3>
        <div className="accordion-list">
          {interviewData[activeCategory].questions.map((item, idx) => {
            const isExpanded = expandedQuestion === idx;
            return (
              <div key={idx} className="accordion-item">
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion(idx)}
                >
                  <span className="q-number">Q{idx + 1}.</span>
                  <span className="q-text">{item.q}</span>
                  <span className="accordion-arrow">{isExpanded ? '▲' : '▼'}</span>
                </button>
                {isExpanded && (
                  <div className="accordion-body">
                    <pre className="answer-text">{item.a}</pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

export default InterviewPrep;
