'use client';
import React, { useState, useEffect } from 'react';
import {
  Search, Plus, Calendar, Clock, Flag, CheckSquare, Square, Edit3, Trash2, 
  Filter, SortDesc, Bell, AlertTriangle, Repeat, ChevronDown, ChevronRight,
  Star, Circle, CheckCircle2, PlayCircle, PauseCircle, ArrowLeft, Settings,
  Target, TrendingUp, BarChart3, Zap, Brain, Heart, Sun, Moon, Coffee
} from 'lucide-react';

// ==================== DATA CONFIGURATION ====================
const PRIORITY_CONFIG = {
  low: { label: 'Low', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: Circle },
  medium: { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: Flag },
  high: { label: 'High', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: AlertTriangle }
};

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', icon: Square },
  'in-progress': { label: 'In Progress', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: PlayCircle },
  completed: { label: 'Completed', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle2 }
};

const RECURRENCE_CONFIG = {
  none: 'No Repeat',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly'
};

const MOOD_SUGGESTIONS = {
  energetic: ['Exercise workout', 'Clean room', 'Organize documents', 'Learn new skill'],
  focused: ['Complete project', 'Study session', 'Write report', 'Plan goals'],
  creative: ['Design project', 'Write blog', 'Brainstorm ideas', 'Learn art'],
  relaxed: ['Read book', 'Light exercise', 'Plan vacation', 'Call family']
};

// ==================== UTILITY FUNCTIONS ====================
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};

const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null;
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  });
};

// ==================== COMPONENTS ====================
const TaskForm = ({ task, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate || '',
    priority: task?.priority || 'medium',
    status: task?.status || 'pending',
    recurrence: task?.recurrence || 'none',
    subtasks: task?.subtasks || [],
    notes: task?.notes || ''
  });

  const [newSubtask, setNewSubtask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const taskData = {
      ...formData,
      id: task?.id || generateId(),
      createdAt: task?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(taskData);
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setFormData(prev => ({
        ...prev,
        subtasks: [...prev.subtasks, { id: generateId(), text: newSubtask, completed: false }]
      }));
      setNewSubtask('');
    }
  };

  const removeSubtask = (id) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(st => st.id !== id)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
              placeholder="Enter task title..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
              rows={3}
              placeholder="Add task description..."
            />
          </div>

          {/* Date, Priority, Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({...prev, dueDate: e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({...prev, priority: e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
              >
                {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({...prev, status: e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
              >
                {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Recurrence */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recurrence</label>
            <select
              value={formData.recurrence}
              onChange={(e) => setFormData(prev => ({...prev, recurrence: e.target.value}))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900"
            >
              {Object.entries(RECURRENCE_CONFIG).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Subtasks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtasks</label>
            <div className="space-y-2">
              {formData.subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-2">
                  <Square className="w-4 h-4 text-gray-400" />
                  <span className="flex-1 text-gray-900">{subtask.text}</span>
                  <button
                    type="button"
                    onClick={() => removeSubtask(subtask.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  placeholder="Add subtask..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
                />
                <button
                  type="button"
                  onClick={addSubtask}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder:text-gray-500"
              rows={2}
              placeholder="Additional notes..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isEditing ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus, onToggleSubtask }) => {
  const [expanded, setExpanded] = useState(false);
  const priority = PRIORITY_CONFIG[task.priority];
  const status = STATUS_CONFIG[task.status];
  const StatusIcon = status.icon;
  const PriorityIcon = priority.icon;
  
  const overdue = isOverdue(task.dueDate);
  const daysUntil = getDaysUntilDue(task.dueDate);
  
  const completedSubtasks = task.subtasks?.filter(st => st.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
      overdue && task.status !== 'completed' ? 'border-red-200 bg-red-50' : 'border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleStatus(task.id)}
          className={`mt-1 ${status.color} hover:scale-110 transition-transform`}
        >
          <StatusIcon className="w-5 h-5" />
        </button>
        
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <div className="flex items-center gap-1">
              {/* Priority */}
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${priority.bg} ${priority.border} border`}>
                <PriorityIcon className={`w-3 h-3 ${priority.color}`} />
                <span className={`text-xs ${priority.color}`}>{priority.label}</span>
              </div>
              
              {/* Actions */}
              <button
                onClick={() => onEdit(task)}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            {task.dueDate && (
              <div className={`flex items-center gap-1 ${overdue && task.status !== 'completed' ? 'text-red-600' : ''}`}>
                <Calendar className="w-4 h-4" />
                <span>{formatDate(task.dueDate)}</span>
                {overdue && task.status !== 'completed' && (
                  <span className="text-red-600 font-medium">Overdue</span>
                )}
                {daysUntil !== null && daysUntil >= 0 && task.status !== 'completed' && (
                  <span className="text-blue-600">({daysUntil}d left)</span>
                )}
              </div>
            )}
            
            {task.recurrence !== 'none' && (
              <div className="flex items-center gap-1">
                <Repeat className="w-4 h-4" />
                <span>{RECURRENCE_CONFIG[task.recurrence]}</span>
              </div>
            )}

            {totalSubtasks > 0 && (
              <div className="flex items-center gap-1">
                <CheckSquare className="w-4 h-4" />
                <span>{completedSubtasks}/{totalSubtasks}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-gray-600 text-sm mt-2">{task.description}</p>
          )}

          {/* Expandable Content */}
          {(task.subtasks?.length > 0 || task.notes) && (
            <div className="mt-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
              >
                {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                <span>
                  {task.subtasks?.length > 0 && `${totalSubtasks} subtasks`}
                  {task.subtasks?.length > 0 && task.notes && ', '}
                  {task.notes && 'notes'}
                </span>
              </button>

              {expanded && (
                <div className="mt-3 space-y-2">
                  {/* Subtasks */}
                  {task.subtasks?.map((subtask) => (
                    <div key={subtask.id} className="flex items-center gap-2 pl-4">
                      <button
                        onClick={() => onToggleSubtask(task.id, subtask.id)}
                        className="text-gray-400 hover:text-green-600"
                      >
                        {subtask.completed ? (
                          <CheckSquare className="w-4 h-4 text-green-600" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                      <span className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                        {subtask.text}
                      </span>
                    </div>
                  ))}

                  {/* Notes */}
                  {task.notes && (
                    <div className="pl-4">
                      <div className="text-xs text-gray-500 mb-1">Notes:</div>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{task.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ tasks, onViewChange }) => {
  const today = new Date().toDateString();
  const todayTasks = tasks.filter(task => 
    task.dueDate && new Date(task.dueDate).toDateString() === today && task.status !== 'completed'
  );
  const overdueTasks = tasks.filter(task => isOverdue(task.dueDate) && task.status !== 'completed');
  const completedToday = tasks.filter(task => 
    task.status === 'completed' && 
    new Date(task.updatedAt).toDateString() === today
  ).length;

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h2>
        <p className="text-gray-600">Your productivity overview and quick actions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">In Progress</p>
              <p className="text-2xl font-bold text-yellow-800">{stats.inProgress}</p>
            </div>
            <PlayCircle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Completed Today</p>
              <p className="text-2xl font-bold text-green-800">{completedToday}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Overdue</p>
              <p className="text-2xl font-bold text-red-800">{overdueTasks.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-600" />
              Today's Tasks
            </h3>
            <button
              onClick={() => onViewChange('tasks')}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          {todayTasks.length > 0 ? (
            <div className="space-y-2">
              {todayTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Circle className={`w-4 h-4 ${PRIORITY_CONFIG[task.priority].color}`} />
                  <span className="text-sm text-gray-700 flex-1">{task.title}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${PRIORITY_CONFIG[task.priority].bg} ${PRIORITY_CONFIG[task.priority].color}`}>
                    {PRIORITY_CONFIG[task.priority].label}
                  </span>
                </div>
              ))}
              {todayTasks.length > 3 && (
                <p className="text-sm text-gray-500 text-center">+{todayTasks.length - 3} more tasks</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No tasks due today 🎉</p>
          )}
        </div>

        {/* Overdue Tasks */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Overdue Tasks
            </h3>
            <button
              onClick={() => onViewChange('tasks')}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          {overdueTasks.length > 0 ? (
            <div className="space-y-2">
              {overdueTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-200">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{task.title}</p>
                    <p className="text-xs text-red-600">Due: {formatDate(task.dueDate)}</p>
                  </div>
                </div>
              ))}
              {overdueTasks.length > 3 && (
                <p className="text-sm text-gray-500 text-center">+{overdueTasks.length - 3} more overdue</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No overdue tasks 👍</p>
          )}
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Smart Suggestions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(MOOD_SUGGESTIONS).map(([mood, suggestions]) => (
            <div key={mood} className="bg-white p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {mood === 'energetic' && <Zap className="w-4 h-4 text-yellow-600" />}
                {mood === 'focused' && <Target className="w-4 h-4 text-blue-600" />}
                {mood === 'creative' && <Star className="w-4 h-4 text-purple-600" />}
                {mood === 'relaxed' && <Heart className="w-4 h-4 text-green-600" />}
                <span className="text-sm font-medium text-gray-700 capitalize">{mood}</span>
              </div>
              <p className="text-xs text-gray-500">{suggestions[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const LifeSyncToDo = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [tasks, setTasks] = useState(() => {
    const saved = sessionStorage.getItem('lifesync-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: 'dueDate'
  });

  // Save tasks to sessionStorage whenever tasks change
  useEffect(() => {
    sessionStorage.setItem('lifesync-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filter and sort tasks
  useEffect(() => {
    let filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filters.status) {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'dueDate':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, filters]);

  // Task CRUD operations
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks(prev => prev.map(task => 
        task.id === taskData.id ? taskData : task
      ));
    } else {
      setTasks(prev => [...prev, taskData]);
    }
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const handleToggleStatus = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        let newStatus;
        if (task.status === 'pending') newStatus = 'in-progress';
        else if (task.status === 'in-progress') newStatus = 'completed';
        else newStatus = 'pending';
        
        return {
          ...task,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return task;
    }));
  };

  const handleToggleSubtask = (taskId, subtaskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map(subtask =>
          subtask.id === subtaskId 
            ? { ...subtask, completed: !subtask.completed }
            : subtask
        );
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    }));
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Main render logic
  return (
    <div className="flex-1 flex flex-col overflow-auto p-6 bg-gray-50">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {currentView !== 'dashboard' && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">ToDo</h1>
            <p className="text-gray-600">
              {currentView === 'dashboard' ? 'Organize your life, one task at a time' : 'Manage your tasks'}
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentView === 'dashboard'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('tasks')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                currentView === 'tasks'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <CheckSquare className="w-4 h-4 inline mr-2" />
              Tasks
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard View */}
      {currentView === 'dashboard' && (
        <Dashboard tasks={tasks} onViewChange={handleViewChange} />
      )}

      {/* Tasks View */}
      {currentView === 'tasks' && (
        <div>
          {/* Task Controls - Improved Layout */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              {/* Filter Controls */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({...prev, status: e.target.value}))}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 min-w-[120px]"
                >
                  <option value="">All Status</option>
                  {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>

                <select
                  value={filters.priority}
                  onChange={(e) => setFilters(prev => ({...prev, priority: e.target.value}))}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 min-w-[120px]"
                >
                  <option value="">All Priority</option>
                  {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>

                <div className="flex items-center gap-2">
                  <SortDesc className="w-4 h-4 text-gray-500" />
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({...prev, sortBy: e.target.value}))}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 min-w-[140px]"
                  >
                    <option value="dueDate">Sort by Due Date</option>
                    <option value="priority">Sort by Priority</option>
                    <option value="created">Sort by Created</option>
                  </select>
                </div>
              </div>

              {/* Add Task Button */}
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>

            {/* Active Filters Display */}
            {(filters.status || filters.priority) && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-gray-500">Active filters:</span>
                  {filters.status && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center gap-1">
                      Status: {STATUS_CONFIG[filters.status].label}
                      <button
                        onClick={() => setFilters(prev => ({...prev, status: ''}))}
                        className="hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.priority && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full flex items-center gap-1">
                      Priority: {PRIORITY_CONFIG[filters.priority].label}
                      <button
                        onClick={() => setFilters(prev => ({...prev, priority: ''}))}
                        className="hover:text-yellow-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => setFilters({status: '', priority: '', sortBy: 'dueDate'})}
                    className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onToggleStatus={handleToggleStatus}
                  onToggleSubtask={handleToggleSubtask}
                />
              ))
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {tasks.length === 0 ? 'No tasks yet' : 'No tasks found'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {tasks.length === 0 
                    ? 'Create your first task to get started!' 
                    : 'Try adjusting your search or filters'
                  }
                </p>
                {tasks.length === 0 && (
                  <button
                    onClick={() => setShowTaskForm(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors mx-auto"
                  >
                    <Plus className="w-5 h-5" />
                    Create First Task
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Task Summary */}
          {filteredTasks.length > 0 && (
            <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Showing {filteredTasks.length} of {tasks.length} tasks
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Circle className="w-3 h-3 text-gray-500" />
                    {filteredTasks.filter(t => t.status === 'pending').length} Pending
                  </span>
                  <span className="flex items-center gap-1">
                    <PlayCircle className="w-3 h-3 text-blue-500" />
                    {filteredTasks.filter(t => t.status === 'in-progress').length} In Progress
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    {filteredTasks.filter(t => t.status === 'completed').length} Completed
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
          isEditing={!!editingTask}
        />
      )}
    </div>
  );
};

export default LifeSyncToDo;