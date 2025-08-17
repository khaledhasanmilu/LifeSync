// components/Layout.js
"use client";
import { useState } from 'react';
import { 
  BarChart3, DollarSign, CheckSquare, BookOpen, MapPin, AlertTriangle, Zap,
  User, Bell, Settings, LogOut, ChevronDown, TrendingUp, TrendingDown,
  Clock, Target, Coffee, Smile, Meh, Frown, Heart, Plus
} from 'lucide-react';

export default function Layout({ children, activePage, setActivePage }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const sidebarItems = [
    { id: 'Dashboard', icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'Finance', icon: <DollarSign className="w-5 h-5" />, label: 'Finance Tracker' },
    { id: 'Todo', icon: <CheckSquare className="w-5 h-5" />, label: 'To-Do' },
    { id: 'Learning', icon: <BookOpen className="w-5 h-5" />, label: 'Learning Queue' },
    { id: 'Travel', icon: <MapPin className="w-5 h-5" />, label: 'Travel Tracker' },
    { id: 'Emergency', icon: <AlertTriangle className="w-5 h-5" />, label: 'Emergency Alert' },
    { id: 'QuickDock', icon: <Zap className="w-5 h-5" />, label: 'QuickDock' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">LifeSync</span>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activePage === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{activePage}</h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
