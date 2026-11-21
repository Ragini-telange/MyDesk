// pages/TodoList.jsx
// Student To-Do List and Planner connected directly to MongoDB Atlas.

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

function TodoList() {
  const { token, logout } = useAuth();

  // Tasks state populated strictly from MongoDB (no hardcoded demo tasks)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All'); // 'All' | 'Pending' | 'Completed'

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit task modal/form state
  const [editingTask, setEditingTask] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium'
  });
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // 1. Fetch tasks from backend on mount
  const fetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch tasks.');
      }

      setTasks(data.tasks);
    } catch (err) {
      setError(err.message || 'Unable to load tasks from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  // 2. Add new task to MongoDB
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newTitle.trim(),
          description: newDescription.trim(),
          dueDate: newDueDate || null,
          priority: newPriority
        })
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to create task.');
      }

      // Prepend newly created task from MongoDB response
      setTasks([data.task, ...tasks]);
      setNewTitle('');
      setNewDescription('');
      setNewDueDate('');
      setNewPriority('Medium');
    } catch (err) {
      setError(err.message || 'Error creating task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Toggle task completion status in MongoDB
  const handleToggleTask = async (task) => {
    try {
      const updatedStatus = !task.completed;

      const response = await fetch(`${API_BASE_URL}/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          completed: updatedStatus
        })
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to update task.');
      }

      // Update task in state
      setTasks(tasks.map((t) => (t._id === task._id ? data.task : t)));
    } catch (err) {
      setError(err.message || 'Error updating task status.');
    }
  };

  // 4. Delete task from MongoDB
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this study task?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete task.');
      }

      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      setError(err.message || 'Error deleting task.');
    }
  };

  // 5. Open Edit Task Modal
  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setEditFormData({
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      priority: task.priority || 'Medium'
    });
  };

  // 6. Save Edited Task to MongoDB
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editFormData.title.trim()) return;

    setIsSavingEdit(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${editingTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editFormData.title.trim(),
          description: editFormData.description.trim(),
          dueDate: editFormData.dueDate || null,
          priority: editFormData.priority
        })
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to save changes.');
      }

      // Update state with modified task
      setTasks(tasks.map((t) => (t._id === editingTask._id ? data.task : t)));
      setEditingTask(null);
    } catch (err) {
      setError(err.message || 'Error saving task changes.');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Filter tasks based on selected tab
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'Pending') return !t.completed;
    if (filter === 'Completed') return t.completed;
    return true; // 'All'
  });

  // Calculate live statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Helper date formatter
  const formatDisplayDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">To-Do List & Study Planner</h1>
          <p className="page-subtitle">
            Manage your daily study goals and interview tasks with permanent MongoDB cloud sync.
          </p>
        </div>
        <div className="stats-badges">
          <span className="badge-stat">Total: {totalTasks}</span>
          <span className="badge-stat pending">Pending: {pendingTasks}</span>
          <span className="badge-stat completed">Completed: {completedTasks}</span>
        </div>
      </div>

      {error && <div className="alert-box alert-error">{error}</div>}

      {/* Add Task Form Card */}
      <section className="dashboard-card form-card">
        <h3 className="card-section-title">➕ Add New Study Task</h3>
        <form onSubmit={handleAddTask} className="add-task-form">
          <div className="form-row" style={{ marginBottom: '0.75rem' }}>
            <input
              type="text"
              placeholder="What do you plan to study or finish? (e.g. Solve 3 Array problems)"
              className="task-input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="select-input"
              disabled={isSubmitting}
            >
              <option value="High">Priority: High</option>
              <option value="Medium">Priority: Medium</option>
              <option value="Low">Priority: Low</option>
            </select>
            <input
              type="date"
              className="select-input"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              title="Optional due date"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Add Task'}
            </button>
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="Optional notes or description (e.g. Chapter 4 reference or LeetCode #1, #15)"
              className="task-input"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </section>

      {/* Task Filters Bar */}
      <section className="filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="filter-label">Filter:</span>
          {['All', 'Pending', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`pill-btn ${filter === tab ? 'pill-active' : ''}`}
            >
              {tab} ({tab === 'All' ? totalTasks : tab === 'Pending' ? pendingTasks : completedTasks})
            </button>
          ))}
        </div>
      </section>

      {/* Tasks List */}
      <section className="dashboard-card">
        <h3 className="card-section-title">📋 Task Checklist ({filteredTasks.length})</h3>

        {loading ? (
          <div className="dashboard-loading-card" style={{ padding: '2rem' }}>
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading your tasks from MongoDB...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-notice" style={{ padding: '2.5rem 1rem' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>📝</span>
            {tasks.length === 0 ? (
              <>
                <h4>No study tasks yet!</h4>
                <p>Your task list is completely empty. Add your first goal using the form above to stay organized.</p>
              </>
            ) : (
              <>
                <h4>No {filter.toLowerCase()} tasks found</h4>
                <p>Switch filter tabs above to see your other study goals.</p>
              </>
            )}
          </div>
        ) : (
          <div className="tasks-container">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className={`task-item ${task.completed ? 'task-done' : ''}`}
              >
                <div className="task-left">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task)}
                    className="task-checkbox"
                    title={task.completed ? 'Mark as pending' : 'Mark as completed'}
                  />
                  <div>
                    <p className={`task-name ${task.completed ? 'strikethrough' : ''}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        {task.description}
                      </p>
                    )}
                    <div className="task-meta-tags">
                      {task.dueDate && (
                        <span className="meta-date">
                          📅 Due: {formatDisplayDate(task.dueDate)}
                        </span>
                      )}
                      <span className="meta-category" style={{ fontSize: '0.74rem' }}>
                        Added {formatDisplayDate(task.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="task-right">
                  <span className={`priority-tag priority-${task.priority.toLowerCase()}`}>
                    {task.priority} Priority
                  </span>
                  <span className={`status-badge ${task.completed ? 'done' : 'open'}`}>
                    {task.completed ? '✓ Completed' : '⏳ Pending'}
                  </span>
                  <button
                    onClick={() => handleOpenEdit(task)}
                    className="btn btn-outline btn-sm"
                    title="Edit task"
                    style={{ padding: '0.25rem 0.55rem' }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="btn-delete"
                    title="Delete task"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="modal-backdrop" onClick={() => setEditingTask(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">✏️ Edit Study Task</h2>
              <button
                className="modal-close"
                onClick={() => setEditingTask(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="modal-body">
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label htmlFor="editTitle">Task Title *</label>
                  <input
                    type="text"
                    id="editTitle"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label htmlFor="editDescription">Description / Notes</label>
                  <textarea
                    id="editDescription"
                    rows="3"
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    style={{
                      padding: '0.65rem 0.85rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div className="form-row" style={{ marginBottom: '1rem' }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label htmlFor="editPriority">Priority</label>
                    <select
                      id="editPriority"
                      className="select-input"
                      value={editFormData.priority}
                      onChange={(e) => setEditFormData({ ...editFormData, priority: e.target.value })}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label htmlFor="editDueDate">Due Date</label>
                    <input
                      type="date"
                      id="editDueDate"
                      className="select-input"
                      value={editFormData.dueDate}
                      onChange={(e) => setEditFormData({ ...editFormData, dueDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setEditingTask(null)}
                  className="btn btn-outline"
                  disabled={isSavingEdit}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSavingEdit}
                >
                  {isSavingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default TodoList;
