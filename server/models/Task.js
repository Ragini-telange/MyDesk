// models/Task.js
// Mongoose schema and model for student study tasks and planner items.

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task must belong to a student user']
    },
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    dueDate: {
      type: Date,
      default: null
    },
    priority: {
      type: String,
      enum: {
        values: ['High', 'Medium', 'Low'],
        message: 'Priority must be High, Medium, or Low'
      },
      default: 'Medium'
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Index to optimize querying tasks by student and completion status
taskSchema.index({ user: 1, completed: 1, createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);
