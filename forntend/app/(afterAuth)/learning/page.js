"use client";
import React, { useState, useEffect } from 'react';
import {
  Plus, BookOpen, Play, Check, Bell, X, Youtube, 
  Book, GraduationCap, FileText, Clock, Calendar,
  ExternalLink, AlertCircle
} from 'lucide-react';

const LearningQueue = () => {
  const [isClient, setIsClient] = useState(false);
  const [idCounter, setIdCounter] = useState(4);
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedItemForReminder, setSelectedItemForReminder] = useState(null);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  
  const [learningItems, setLearningItems] = useState([
    {
      id: 1,
      name: 'Python Basic to Advance',
      type: 'YouTube',
      tags: ['Programming', 'Python'],
      progress: 10,
      total: 40,
      unit: 'min',
      status: 'in-progress',
      deadline: '2024-12-15',
      link: 'https://youtube.com/playlist/python-course'
    },
    {
      id: 2,
      name: 'Clean Code',
      type: 'Book',
      tags: ['Programming', 'Best Practices'],
      progress: 120,
      total: 300,
      unit: 'pages',
      status: 'in-progress',
      deadline: '2024-11-30',
      link: ''
    },
    {
      id: 3,
      name: 'React Advanced Patterns',
      type: 'Course',
      tags: ['Programming', 'React', 'JavaScript'],
      progress: 8,
      total: 8,
      unit: 'lessons',
      status: 'completed',
      deadline: '',
      link: 'https://example.com/react-course'
    }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    type: 'YouTube',
    tags: '',
    total: '',
    unit: 'min',
    deadline: '',
    link: ''
  });

  // Fix hydration error by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateId = () => {
    const newId = idCounter;
    setIdCounter(prev => prev + 1);
    return newId;
  };

  const typeIcons = {
    'YouTube': Youtube,
    'Book': Book,
    'Course': GraduationCap,
    'Article': FileText
  };

  const typeColors = {
    'YouTube': 'text-red-600 bg-red-50 border-red-200',
    'Book': 'text-green-600 bg-green-50 border-green-200',
    'Course': 'text-blue-600 bg-blue-50 border-blue-200',
    'Article': 'text-purple-600 bg-purple-50 border-purple-200'
  };

  const tagColors = [
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700',
    'bg-purple-100 text-purple-700',
    'bg-yellow-100 text-yellow-700',
    'bg-pink-100 text-pink-700',
    'bg-indigo-100 text-indigo-700'
  ];

  const filteredItems = learningItems.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'In Progress') return item.status === 'in-progress';
    if (filter === 'Completed') return item.status === 'completed';
    return true;
  });

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isDeadlineClose = (deadline) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  const handleAddItem = () => {
    if (!newItem.name.trim() || !newItem.total) return;

    const item = {
      id: generateId(),
      name: newItem.name.trim(),
      type: newItem.type,
      tags: newItem.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      progress: 0,
      total: parseInt(newItem.total),
      unit: newItem.unit,
      status: 'in-progress',
      deadline: newItem.deadline || '',
      link: newItem.link.trim()
    };

    setLearningItems([...learningItems, item]);
    setNewItem({ name: '', type: 'YouTube', tags: '', total: '', unit: 'min', deadline: '', link: '' });
    setShowForm(false);
  };

  const updateProgress = (id, newProgress) => {
    setLearningItems(items => 
      items.map(item => 
        item.id === id 
          ? { 
              ...item, 
              progress: Math.min(newProgress, item.total),
              status: newProgress >= item.total ? 'completed' : 'in-progress'
            }
          : item
      )
    );
  };

  const markAsCompleted = (id) => {
    setLearningItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, progress: item.total, status: 'completed' }
          : item
      )
    );
  };

  const resumeLearning = (link) => {
    if (link) {
      window.open(link, '_blank');
    } else {
      alert('No link saved for this item');
    }
  };

  const openReminderModal = (item) => {
    setSelectedItemForReminder(item);
    setShowReminderModal(true);
  };

  const setReminder = () => {
    if (reminderDate && reminderTime) {
      alert(`Reminder set for ${selectedItemForReminder.name} on ${reminderDate} at ${reminderTime}`);
      setShowReminderModal(false);
      setReminderDate('');
      setReminderTime('');
      setSelectedItemForReminder(null);
    }
  };

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="flex-1 flex flex-col overflow-auto p-6 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Learning Queue</h1>
            <p className="text-gray-600">Track your learning progress and stay organized</p>
          </div>
          <div className="w-48 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm font-medium text-gray-700 mr-2">Filter:</span>
          <div className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="w-24 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="w-20 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-20"></div>
              <div className="h-2 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Learning Queue</h1>
          <p className="text-gray-600">Track your learning progress and stay organized</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add New Learning Item
        </button>
      </div>

      {/* Add Item Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Add Learning Item</h2>
              <button 
                onClick={() => {
                  setShowForm(false);
                  setNewItem({ name: '', type: 'YouTube', tags: '', total: '', unit: 'min', deadline: '', link: '' });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Name *</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="Python Basic to Advance"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(typeIcons).map(([type, Icon]) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewItem(prev => ({ ...prev, type }))}
                      className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                        newItem.type === type
                          ? typeColors[type]
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags/Category</label>
                <input
                  type="text"
                  value={newItem.tags}
                  onChange={(e) => setNewItem(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="Programming, Python, Beginner (separate with commas)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount *</label>
                  <input
                    type="number"
                    value={newItem.total}
                    onChange={(e) => setNewItem(prev => ({ ...prev, total: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="40"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <select
                    value={newItem.unit}
                    onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="min">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="pages">Pages</option>
                    <option value="lessons">Lessons</option>
                    <option value="chapters">Chapters</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link (Optional)</label>
                <input
                  type="url"
                  value={newItem.link}
                  onChange={(e) => setNewItem(prev => ({ ...prev, link: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (Optional)</label>
                <input
                  type="date"
                  value={newItem.deadline}
                  onChange={(e) => setNewItem(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setNewItem({ name: '', type: 'YouTube', tags: '', total: '', unit: 'min', deadline: '', link: '' });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  disabled={!newItem.name.trim() || !newItem.total}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Set Reminder</h2>
              <button 
                onClick={() => {
                  setShowReminderModal(false);
                  setReminderDate('');
                  setReminderTime('');
                  setSelectedItemForReminder(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">Set a reminder for: <strong>{selectedItemForReminder?.name}</strong></p>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowReminderModal(false);
                    setReminderDate('');
                    setReminderTime('');
                    setSelectedItemForReminder(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={setReminder}
                  disabled={!reminderDate || !reminderTime}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm font-medium text-gray-700 mr-2">Filter:</span>
        {['All', 'In Progress', 'Completed'].map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === filterOption
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {filterOption}
          </button>
        ))}
      </div>

      {/* Learning Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const Icon = typeIcons[item.type];
            const percentage = Math.round((item.progress / item.total) * 100);
            const isCompleted = item.status === 'completed';
            const deadlineClose = isDeadlineClose(item.deadline);

            return (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 leading-tight">{item.name}</h3>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${typeColors[item.type]}`}>
                      <Icon className="w-3 h-3" />
                      {item.type}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.link && (
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    )}
                    {isCompleted && (
                      <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tagColors[index % tagColors.length]
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Deadline */}
                {item.deadline && (
                  <div className={`flex items-center gap-1 text-sm mb-3 ${
                    deadlineClose ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {deadlineClose && <AlertCircle className="w-4 h-4" />}
                    <Calendar className="w-4 h-4" />
                    <span>Complete by {formatDate(item.deadline)}</span>
                  </div>
                )}

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.progress}/{item.total} {item.unit} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Progress Input */}
                {!isCompleted && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        max={item.total}
                        value={item.progress}
                        onChange={(e) => updateProgress(item.id, parseInt(e.target.value) || 0)}
                        className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        placeholder="Update progress..."
                      />
                      <span className="text-xs text-gray-500">/ {item.total} {item.unit}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {!isCompleted ? (
                    <>
                      <button
                        onClick={() => resumeLearning(item.link)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Play className="w-3 h-3" />
                        Resume
                      </button>
                      <button
                        onClick={() => markAsCompleted(item.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Check className="w-3 h-3" />
                        Done
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <Check className="w-4 h-4" />
                      Completed
                    </div>
                  )}
                  <button
                    onClick={() => openReminderModal(item)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors ml-auto"
                  >
                    <Bell className="w-3 h-3" />
                    Remind
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {filter === 'All' ? 'No learning items yet' : `No ${filter.toLowerCase()} items`}
          </h3>
          <p className="text-gray-500 mb-6">
            {filter === 'All' 
              ? 'Start your learning journey by adding your first item'
              : `No items match the ${filter.toLowerCase()} filter`
            }
          </p>
          {filter === 'All' && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add First Learning Item
            </button>
            )}
        </div>
      )}
    </div>
  );
};

export default LearningQueue;