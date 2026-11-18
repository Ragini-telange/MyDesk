// pages/TodoList.jsx
// Student To-Do List and Planner page with task management UI.

import { useState } from 'react';
import Layout from '../components/Layout';

function TodoList() {
  // Sample initial tasks with priority and completion status
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Practice Binary Search & 2-Pointer DSA problems',
      priority: 'High',
      category: 'DSA Practice',
      dueDate: 'Today',
      completed: false
    },
    {
      id: 2,
      title: 'Revise ACID properties & Indexing in DBMS',
      priority: 'Medium',
      category: 'Interview Prep',
      dueDate: 'Tomorrow',
      completed: false
    },
    {
      id: 3,
      title: 'Prepare answers for Behavioral & HR round',
      priority: 'Low',
      category: 'Placement',
      dueDate: '20 Nov',
      completed: true
    },
    {
      id: 4,
      title: 'Complete College Final Year Project Presentation',
      priority: 'High',
      category: 'Academics',
      dueDate: '22 Nov',
      completed: false
    }
  ]);

  // Form input state for adding a new task
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newCategory, setNewCategory] = useState('DSA Practice');

  // Toggle task completion status
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Add new task to state
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      priority: newPriority,
      category: newCategory,
      dueDate: 'Pending',
      completed: false
    };

    setTasks([newTask, ...tasks]);
    setNewTitle('');
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">To-Do List & Study Planner</h1>
          <p className="page-subtitle">Organize your daily study goals, interview revision, and academic tasks.</p>
        </div>
        <div className="stats-badges">
          <span className="badge-stat">Total: {totalTasks}</span>
          <span className="badge-stat pending">Pending: {pendingTasks}</span>
          <span className="badge-stat completed">Completed: {completedTasks}</span>
        </div>
      </div>

      {/* Add Task Form Card */}
      <section className="dashboard-card form-card">
        <h3 className="card-section-title">➕ Add New Study Task</h3>
        <form onSubmit={handleAddTask} className="add-task-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="What do you plan to study or finish today?"
              className="task-input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="select-input"
            >
              <option value="High">Priority: High</option>
              <option value="Medium">Priority: Medium</option>
              <option value="Low">Priority: Low</option>
            </select>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="select-input"
            >
              <option value="DSA Practice">DSA Practice</option>
              <option value="Interview Prep">Interview Prep</option>
              <option value="Academics">Academics</option>
              <option value="Placement">Placement</option>
            </select>
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </section>

      {/* Tasks List */}
      <section className="dashboard-card">
        <h3 className="card-section-title">📋 Task Checklist</h3>
        <div className="tasks-container">
          {tasks.length === 0 ? (
            <p className="empty-notice">No tasks right now! Add one above to get organized.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`task-item ${task.completed ? 'task-done' : ''}`}
              >
                <div className="task-left">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                    className="task-checkbox"
                  />
                  <div>
                    <p className={`task-name ${task.completed ? 'strikethrough' : ''}`}>
                      {task.title}
                    </p>
                    <div className="task-meta-tags">
                      <span className="meta-category">{task.category}</span>
                      <span className="meta-date">📅 {task.dueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="task-right">
                  <span className={`priority-tag priority-${task.priority.toLowerCase()}`}>
                    {task.priority} Priority
                  </span>
                  <span className={`status-badge ${task.completed ? 'done' : 'open'}`}>
                    {task.completed ? '✓ Done' : '⏳ Pending'}
                  </span>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="btn-delete"
                    title="Delete task"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
}

export default TodoList;
