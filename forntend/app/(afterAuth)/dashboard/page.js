"use client";
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {

  DollarSign, CheckSquare, Plus, Clock, Target, Coffee, Smile, Meh, Frown,
  Heart, TrendingUp, TrendingDown, Sparkles, Sun, Moon
} from 'lucide-react';

export default function LifeSyncDashboard() {
  // Try different casing and check for cookie existence
  const username = Cookies.get('userName') || Cookies.get('username') || 'Guest';
  console.log('Username from cookies:', username);

  // Optionally, show a fallback if username is still undefined
  // const username = Cookies.get('userName') || 'Guest';
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
  ];

  const toggleTaskCompletion = (index) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[index] = !newCompletedTasks[index];
    setCompletedTasks(newCompletedTasks);
  };

  const getMoodIcon = (mood) => {
    const iconClass = "w-10 h-10 transition-all duration-300";
    switch (mood) {
      case 'happy': return <Smile className={`${iconClass} text-emerald-500`} />;
      case 'neutral': return <Meh className={`${iconClass} text-amber-500`} />;
      case 'sad': return <Frown className={`${iconClass} text-rose-500`} />;
      default: return <Meh className={`${iconClass} text-gray-400`} />;
    }
  };

  const getMoodQuote = (mood) => {
    switch (mood) {
      case 'happy': return "Happiness is not by chance, but by choice. ✨";
      case 'neutral': return "Balance is not something you find, it's something you create. 🌸";
      case 'sad': return "It's okay to not be okay. Tomorrow is a new day. 🌙";
      default: return "Every feeling is valid. You're doing great. 💜";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">

    

      <header className="px-6 py-6 rounded-b-2xl">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, <span className="text-blue-600">{username}</span>!
        </h1>
        <p className="mt-1 text-gray-600">Here's your life overview.</p>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Top Row - Finance & Tasks */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Finance Tracker Section */}
            <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl shadow-xl border border-purple-500/20 p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold">Financial Overview</h2>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-green-400/30">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">+5.2% this month</span>
                  </div>
                </div>

                {/* Main Balance Display */}
                <div className="mb-6 text-center">
                  <p className="text-sm text-gray-300 mb-2">Total Balance</p>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">$12,450</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Last updated: 2 hours ago</p>
                </div>

                {/* Financial Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl hover:bg-white/15 transition-all duration-300">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      </div>
                      <p className="text-xs text-gray-300">Monthly Expense</p>
                      <p className="text-lg font-bold text-red-400">$3,280</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl hover:bg-white/15 transition-all duration-300">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Target className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-xs text-gray-300">Savings Goal</p>
                      <p className="text-lg font-bold text-blue-400">75%</p>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl hover:bg-white/15 transition-all duration-300">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                      </div>
                      <p className="text-xs text-gray-300">Income</p>
                      <p className="text-lg font-bold text-purple-400">$8,500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Tasks Section */}
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
                    className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-200 ${completedTasks[index]
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200 hover:bg-orange-50 hover:border-orange-200'
                    }`}
                  >
                    <button
                      onClick={() => toggleTaskCompletion(index)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${completedTasks[index]
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 hover:border-orange-400'
                      }`}
                    >
                      {completedTasks[index] && <CheckSquare className="w-3 h-3 text-white" />}
                    </button>
                    <span className={`${completedTasks[index] ? 'text-green-700 line-through' : 'text-gray-700'} flex-1`}>
                      {task.title}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === 'high'
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
          </div>

          {/* Bottom Row - Time Tracker, Mood, Motivation */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Time Tracker */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Clock className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-800">Time Tracker</h2>
              </div>
              {timeCategories.map((category, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>{category.name}</span>
                    <span>{category.hours}h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`${category.color} h-2 rounded-full`} style={{ width: `${(category.hours / 12) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

           {/* Enhanced Mood Tracker */}
<div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl shadow-2xl border border-indigo-100/50 p-8 text-center backdrop-blur-sm relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-3xl"></div>
  
  <div className="relative z-10">
    <div className="flex items-center justify-center space-x-3 mb-6">
      <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-lg">
        <Heart className="w-5 h-5 text-white" />
      </div>
      <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-800 to-purple-800 bg-clip-text text-transparent">
        Mood Tracker
      </h2>
    </div>
    
    <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <div className="relative bg-white rounded-full p-6 shadow-xl border border-indigo-100">
          {getMoodIcon(todayMood)}
        </div>
      </div>
    </div>
    
    <div className="flex justify-center space-x-6 mb-6">
      {['happy', 'neutral', 'sad'].map((mood) => (
        <button
          key={mood}
          onClick={() => setTodayMood(mood)}
          className={`group relative p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
            todayMood === mood 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/25 scale-105' 
              : 'bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 shadow-lg hover:shadow-xl border border-indigo-100'
          }`}
        >
          <div className="relative z-10 flex items-center justify-center">
            {getMoodIcon(mood)}
          </div>
          
          {todayMood === mood && (
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl animate-pulse opacity-75"></div>
          )}
          
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white to-indigo-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
      ))}
    </div>
    
    <div className="p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-2xl border border-indigo-100/50">
      <p className="text-indigo-800 font-medium text-sm italic">
        "{getMoodQuote(todayMood)}"
      </p>
    </div>
  </div>
</div>


            {/* Enhanced Motivation */}
            <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-pink-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-pink-600/20 rounded-3xl animate-pulse"></div>

              <div className="absolute top-4 right-4 opacity-20">
                <Sun className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div className="absolute bottom-4 left-4 opacity-15">
                <Moon className="w-6 h-6 animate-bounce" />
              </div>
              <div className="absolute top-1/2 right-8 opacity-10">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold">Daily Motivation</h2>
                </div>

                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-4">
                  <blockquote className="text-base leading-relaxed font-medium">
                    "{motivationalQuotes[0]}"
                  </blockquote>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm opacity-90">
                    <Coffee className="w-4 h-4" />
                    <span>Keep pushing forward!</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
