'use client';
import React, { useState } from 'react';
import { Search, Newspaper, Calendar, ShoppingBag, Briefcase, Clock, Bot, ArrowLeft, ExternalLink, Star, Home, Zap, BarChart3, DollarSign, CheckSquare, BookOpen, MapPin, AlertTriangle, Moon, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';


const QuickDoc = () => {
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const categories = [
    { 
      id: 'newspapers', 
      name: 'Newspapers', 
      icon: Newspaper, 
      gradient: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      description: 'Local & Global News'
    },
    { 
      id: 'booking', 
      name: 'Booking', 
      icon: Calendar, 
      gradient: 'from-green-400 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      description: 'Travel & Tickets'
    },
    { 
      id: 'shopping', 
      name: 'Shopping', 
      icon: ShoppingBag, 
      gradient: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      description: 'E-commerce Platforms'
    },
    { 
      id: 'jobs', 
      name: 'Jobs', 
      icon: Briefcase, 
      gradient: 'from-orange-400 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      description: 'Career Opportunities'
    },
    { 
      id: 'ai', 
      name: 'AI Tools', 
      icon: Bot, 
      gradient: 'from-pink-400 to-pink-600',
      bgGradient: 'from-pink-50 to-pink-100',
      description: 'Smart AI Platforms'
    },
    { 
      id: 'prayer', 
      name: 'Prayer Time', 
      icon: Clock, 
      gradient: 'from-teal-400 to-teal-600',
      bgGradient: 'from-teal-50 to-teal-100',
      description: 'Islamic Resources'
    }
  ];

  const resources = {
    newspapers: [
      { name: 'Prothom Alo', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/prothom-alo.png', url: 'https://prothomalo.com', popular: true, flag: '🇧🇩' },
      { name: 'The Daily Star', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/thedailystar.png', url: 'https://thedailystar.net', popular: true, flag: '🇧🇩' },
      { name: 'BBC News', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/bbc.png', url: 'https://bbc.com/news', popular: false, flag: '🇬🇧' },
      { name: 'CNN', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/cnn.png', url: 'https://cnn.com', popular: false, flag: '🇺🇸' },
      { name: 'Bdnews24', icon: '📰', url: 'https://bdnews24.com', popular: true, flag: '🇧🇩' },
      { name: 'Jugantor', icon: '📰', url: 'https://jugantor.com', popular: false, flag: '🇧🇩' },
      { name: 'Kaler Kantho', icon: '📰', url: 'https://kalerkantho.com', popular: false, flag: '🇧🇩' },
      { name: 'Al Jazeera', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/aljazeera.png', url: 'https://aljazeera.com', popular: false, flag: '🌍' }
    ],
    booking: [
      { name: 'Shohoz', icon: '🚌', url: 'https://shohoz.com', popular: true, flag: '🇧🇩' },
      { name: 'Redbus', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/redbus.png', url: 'https://redbus.bd', popular: true, flag: '🇧🇩' },
      { name: 'US-Bangla Airlines', icon: '✈️', url: 'https://usbair.com', popular: false, flag: '🇧🇩' },
      { name: 'Biman Bangladesh', icon: '✈️', url: 'https://bimanair.com', popular: true, flag: '🇧🇩' },
      { name: 'Railway E-ticketing', icon: '🚂', url: 'https://eticket.railway.gov.bd', popular: false, flag: '🇧🇩' },
      { name: 'Expedia', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/expedia.png', url: 'https://expedia.com', popular: false, flag: '🌍' },
      { name: 'Booking.com', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/booking.png', url: 'https://booking.com', popular: false, flag: '🌍' },
      { name: 'Agoda', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/agoda.png', url: 'https://agoda.com', popular: false, flag: '🌍' }
    ],
    shopping: [
      { name: 'Daraz', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/daraz.png', url: 'https://daraz.com.bd', popular: true, flag: '🇧🇩' },
      { name: 'AjkerDeal', icon: '🛍️', url: 'https://ajkerdeal.com', popular: true, flag: '🇧🇩' },
      { name: 'Amazon', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/amazon.png', url: 'https://amazon.com', popular: false, flag: '🇺🇸' },
      { name: 'Alibaba', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/alibaba.png', url: 'https://alibaba.com', popular: false, flag: '🇨🇳' },
      { name: 'Pickaboo', icon: '📱', url: 'https://pickaboo.com', popular: false, flag: '🇧🇩' },
      { name: 'Chaldal', icon: '🥬', url: 'https://chaldal.com', popular: true, flag: '🇧🇩' },
      { name: 'Rokomari', icon: '📚', url: 'https://rokomari.com', popular: false, flag: '🇧🇩' },
      { name: 'eBay', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/ebay.png', url: 'https://ebay.com', popular: false, flag: '🌍' }
    ],
    jobs: [
      { name: 'Bdjobs', icon: '💼', url: 'https://bdjobs.com', popular: true, flag: '🇧🇩' },
      { name: 'Chakri.com', icon: '💼', url: 'https://chakri.com', popular: true, flag: '🇧🇩' },
      { name: 'LinkedIn', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/linkedin.png', url: 'https://linkedin.com', popular: false, flag: '🌍' },
      { name: 'Indeed', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/indeed.png', url: 'https://indeed.com', popular: false, flag: '🌍' },
      { name: 'Glassdoor', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/glassdoor.png', url: 'https://glassdoor.com', popular: false, flag: '🌍' },
      { name: 'Prothom Alo Jobs', icon: '💼', url: 'https://jobs.prothomalo.com', popular: true, flag: '🇧🇩' },
      { name: 'JobsDB', icon: '💼', url: 'https://jobsdb.com', popular: false, flag: '🌍' },
      { name: 'Naukri', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/naukri.png', url: 'https://naukri.com', popular: false, flag: '🇮🇳' }
    ],
    ai: [
      { name: 'ChatGPT', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/chatgpt.png', url: 'https://chat.openai.com', popular: true, flag: '🤖' },
      { name: 'Claude', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/claude.png', url: 'https://claude.ai', popular: true, flag: '🤖' },
      { name: 'Midjourney', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/midjourney.png', url: 'https://midjourney.com', popular: false, flag: '🎨' },
      { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/canva.png', url: 'https://canva.com', popular: false, flag: '🎨' },
      { name: 'Notion', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/notion.png', url: 'https://notion.so', popular: true, flag: '📝' },
      { name: 'Perplexity', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/perplexity.png', url: 'https://perplexity.ai', popular: false, flag: '🔍' },
      { name: 'Gemini', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/gemini.png', url: 'https://gemini.google.com', popular: false, flag: '🤖' },
      { name: 'Copy.ai', icon: '✍️', url: 'https://copy.ai', popular: false, flag: '✍️' }
    ],
    prayer: [
      { name: 'IslamicFinder', icon: '🕌', url: 'https://islamicfinder.org', popular: true, flag: '🕌' },
      { name: 'Prayer Times BD', icon: '⏰', url: '#', popular: true, flag: '🇧🇩' },
      { name: 'Al Quran BD', icon: '📖', url: '#', popular: false, flag: '🇧🇩' },
      { name: 'Hadith Collection', icon: '📚', url: '#', popular: false, flag: '📚' },
      { name: 'Qibla Direction', icon: '🧭', url: '#', popular: true, flag: '🧭' },
      { name: 'Islamic Calendar', icon: '📅', url: '#', popular: false, flag: '📅' },
      { name: 'Tasbih Counter', icon: '📿', url: '#', popular: false, flag: '📿' },
      { name: 'Mosque Finder', icon: '🕌', url: '#', popular: false, flag: '🕌' }
    ]
  };

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, active: false },
    { id: 'finance', name: 'Finance Tracker', icon: DollarSign, active: false },
    { id: 'todo', name: 'To-Do', icon: CheckSquare, active: false },
    { id: 'learning', name: 'Learning Queue', icon: BookOpen, active: false },
    { id: 'travel', name: 'Travel Tracker', icon: MapPin, active: false },
    { id: 'emergency', name: 'Emergency Alert', icon: AlertTriangle, active: false },
    { id: 'quickdoc', name: 'QuickDoc', icon: Zap, active: true }
  ];

  const filteredResources = currentView !== 'home' ? 
    (resources[currentView]?.filter(resource =>
      resource.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []) : [];

  const getCurrentCategory = () => categories.find(cat => cat.id === currentView);

  const openWebView = (url, name) => {
    setCurrentUrl(url);
    setShowWebView(true);
  };

  // Web View
  if (showWebView) {
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">LifeSync</span>
          </div>

          {/* Navigation */}
          <nav className="px-4 py-6 space-y-2">
            {sidebarItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                  item.active 
                    ? 'bg-purple-100 text-purple-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowWebView(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="text-sm text-gray-600 truncate">
                {currentUrl}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Moon className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</div>
              </div>
              <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Web View */}
          <div className="flex-1">
            <iframe 
              src={currentUrl} 
              className="w-full h-full border-0"
              title="QuickDoc Web View"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">LifeSync</span>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                item.active 
                  ? 'bg-purple-100 text-purple-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {currentView === 'home' ? 'QuickDoc' : getCurrentCategory()?.name}
              </h1>
              <p className="text-gray-600 text-sm">
                {currentView === 'home' 
                  ? 'All-in-One Smart Hub for quick access to your favorite platforms' 
                  : getCurrentCategory()?.description
                }
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Moon className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</div>
              </div>
              <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {currentView === 'home' ? (
            // Home Screen
            <div className="p-6">
              {/* Search Bar */}
              <div className="relative mb-8 max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search across all platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all shadow-sm text-black placeholder:text-gray-500"
                />
              </div>

              {/* Category Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={category.id}
                      onClick={() => setCurrentView(category.id)}
                      className={`bg-gradient-to-br ${category.bgGradient} p-6 rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md border border-white/50`}
                    >
                      <div className="text-center">
                        <div className={`inline-flex p-4 bg-gradient-to-br ${category.gradient} rounded-lg shadow-md mb-4`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // Category Sub-page
            <div className="p-6">
              {/* Back Button & Search */}
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setCurrentView('home')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={`Search ${getCurrentCategory()?.name.toLowerCase()}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              {/* Resources Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredResources.map((resource, index) => (
                  <div
                    key={index}
                    onClick={() => openWebView(resource.url, resource.name)}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group border border-gray-100 hover:border-gray-200"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                        {resource.icon.startsWith('http') ? (
                          <img 
                            src={resource.icon} 
                            alt={resource.name}
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                        ) : (
                          <span className="text-2xl">{resource.icon}</span>
                        )}
                        {resource.icon.startsWith('http') && (
                          <span className="text-2xl hidden">📱</span>
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors text-sm">
                          {resource.name}
                        </h3>
                        {resource.popular && (
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-sm">{resource.flag}</span>
                        <span className="text-xs text-gray-500">
                          {resource.flag === '🇧🇩' ? 'Bangladesh' : 
                           resource.flag === '🌍' ? 'Global' : 'International'}
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors mx-auto" />
                    </div>
                  </div>
                ))}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No results found</h3>
                  <p className="text-gray-500">Try searching for something else</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickDoc;