// pages/DashboardPage.js
"use client";
import { useState } from 'react';
import { 
  CheckSquare, Plus, Clock, Heart, Smile, Meh, Frown, Target, Coffee, 
  TrendingUp, TrendingDown 
} from 'lucide-react';

export default function DashboardPage() {
  const [todayMood, setTodayMood] = useState('happy');
  const [completedTasks, setCompletedTasks] = useState([false, false, false, true]);

  const todayTasks = [
    { id: 1, title: 'Review quarterly budget', priority: 'high' },
    { id: 2, title: 'Complete React tutorial', priority: 'medium' },
    { id: 3, title: 'Plan weekend trip', priority: 'low' },
    { id: 4, title: 'Call dentist for appointment', priority: 'medium' },
  ];

  const timeCategories = [
    { name: 'Work', hours: 6, color: 'bg-blue-500' },
    { name: 'Learning', hours: 2, color: 'bg-purple-500' },
    { name: 'Personal', hours: 3, color: 'bg-green-500' },
    { name: 'Break', hours: 1, color: 'bg-orange-500' },
  ];

  const motivationalQuotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
  ];

  const toggleTaskCompletion = (index) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[index] = !newCompletedTasks[index];
    setCompletedTasks(newCompletedTasks);
  };

  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'happy': return <Smile className="w-8 h-8 text-green-500" />;
      case 'neutral': return <Meh className="w-8 h-8 text-yellow-500" />;
      case 'sad': return <Frown className="w-8 h-8 text-red-500" />;
      default: return <Smile className="w-8 h-8 text-green-500" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* Top Row: Tasks + Finance */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Today's Tasks</h2>
            <button className="p-2 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-orange-600" />
            </button>
          </div>
          <div className="space-y-3">
            {todayTasks.map((task, index) => (
              <div
                key={task.id}
                className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-200 ${
                  completedTasks[index]
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-orange-50 hover:border-orange-200'
                }`}
              >
                <button
                  onClick={() => toggleTaskCompletion(index)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    completedTasks[index]
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-orange-400'
                  }`}
                >
                  {completedTasks[index] && <CheckSquare className="w-3 h-3 text-white" />}
                </button>
                <span className={`${completedTasks[index] ? 'text-green-700 line-through' : 'text-gray-700'}`}>
                  {task.title}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'high'
                      ? 'bg-red-100 text-red-600'
                      : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Finance Overview */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-xl border border-purple-500/20 p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Financial Overview</h2>
            <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">+5.2% this month</span>
            </div>
          </div>
          <p className="text-4xl font-bold">$12,450</p>
          <p className="text-xs text-gray-300 mt-1">Last updated: 2 hours ago</p>
        </div>
      </div>

      {/* Bottom Row: Time Tracker, Mood, Motivation */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Time Tracker */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">Time Tracker</h2>
          </div>
          {timeCategories.map((cat, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>{cat.name}</span>
                <span>{cat.hours}h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`${cat.color} h-2 rounded-full`} style={{ width: `${(cat.hours/12)*100}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mood Tracker */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-pink-600" />
            <h2 className="text-xl font-bold text-gray-800">Mood Tracker</h2>
          </div>
          <div className="mb-4">{getMoodIcon(todayMood)}</div>
          <div className="flex justify-center space-x-4">
            {['happy','neutral','sad'].map((mood) => (
              <button
                key={mood}
                onClick={() => setTodayMood(mood)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  todayMood === mood ? 'bg-blue-100 scale-110' : 'hover:bg-gray-100'
                }`}
              >
                {getMoodIcon(mood)}
              </button>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5" />
            <h2 className="text-xl font-bold">Daily Motivation</h2>
          </div>
          <blockquote className="text-sm leading-relaxed opacity-90">
            "{motivationalQuotes[0]}"
          </blockquote>
          <div className="flex items-center space-x-2 text-sm opacity-75 mt-2">
            <Coffee className="w-4 h-4" />
            <span>Keep pushing forward!</span>
          </div>
        </div>
      </div>

    </div>
  );
}
