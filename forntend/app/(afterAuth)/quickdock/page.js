'use client';
import React, { useState } from 'react';
import {
  Search, Newspaper, Calendar, ShoppingBag, Briefcase, Clock, Bot, ArrowLeft, ExternalLink, Star,
  Plus, Target, TrendingUp, BarChart3
} from 'lucide-react';

const QuickDoc = () => {
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { 
      id: 'newspapers', 
      name: 'News Hub', 
      icon: Newspaper, 
      description: 'Latest Breaking News',
      color: 'blue'
    },
    { 
      id: 'booking', 
      name: 'Travel Zone', 
      icon: Calendar, 
      description: 'Book Your Journey',
      color: 'green'
    },
    { 
      id: 'shopping', 
      name: 'Shop Space', 
      icon: ShoppingBag, 
      description: 'Digital Marketplace',
      color: 'purple'
    },
    { 
      id: 'jobs', 
      name: 'Career Central', 
      icon: Briefcase, 
      description: 'Find Your Dream Job',
      color: 'orange'
    },
    { 
      id: 'ai', 
      name: 'AI Universe', 
      icon: Bot, 
      description: 'Intelligent Tools',
      color: 'indigo'
    },
    { 
      id: 'prayer', 
      name: 'Faith Corner', 
      icon: Clock, 
      description: 'Spiritual Resources',
      color: 'teal'
    }
  ];

  const resources = {
    newspapers: [
      { name: 'Prothom Alo', icon: '📰', url: 'https://www.prothomalo.com', popular: true, category: 'Local News' },
      { name: 'The Daily Star', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/thedailystar.png', url: 'https://www.thedailystar.net', popular: true, category: 'English News' },
      { name: 'BBC News', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/bbc.png', url: 'https://www.bbc.com/news', popular: false, category: 'World News' },
      { name: 'CNN', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/cnn.png', url: 'https://www.cnn.com', popular: false, category: 'International' },
      { name: 'Bdnews24', icon: '📰', url: 'https://www.bdnews24.com', popular: true, category: 'Breaking News' },
      { name: 'Jugantor', icon: '📰', url: 'https://www.jugantor.com', popular: false, category: 'Bengali News' },
      { name: 'Kaler Kantho', icon: '📰', url: 'https://www.kalerkantho.com', popular: false, category: 'Daily Paper' },
      { name: 'Al Jazeera', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/aljazeera.png', url: 'https://www.aljazeera.com', popular: false, category: 'Global' }
    ],
    booking: [
      { name: 'Shohoz', icon: '🚌', url: 'https://www.shohoz.com', popular: true, category: 'Bus Tickets' },
      { name: 'Redbus', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/redbus.png', url: 'https://www.redbus.bd', popular: true, category: 'Transport' },
      { name: 'US-Bangla Airlines', icon: '✈️', url: 'https://www.usbair.com', popular: false, category: 'Airlines' },
      { name: 'Biman Bangladesh', icon: '✈️', url: 'https://www.bimanair.com', popular: true, category: 'National Carrier' },
      { name: 'Railway E-ticketing', icon: '🚂', url: 'https://eticket.railway.gov.bd', popular: false, category: 'Train Tickets' },
      { name: 'Expedia', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/expedia.png', url: 'https://www.expedia.com', popular: false, category: 'Travel Agency' },
      { name: 'Booking.com', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/booking.png', url: 'https://www.booking.com', popular: false, category: 'Hotels' },
      { name: 'Agoda', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/agoda.png', url: 'https://www.agoda.com', popular: false, category: 'Accommodation' }
    ],
    shopping: [
      { name: 'Daraz', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/daraz.png', url: 'https://www.daraz.com.bd', popular: true, category: 'Marketplace' },
      { name: 'AjkerDeal', icon: '🛍️', url: 'https://www.ajkerdeal.com', popular: true, category: 'Local Store' },
      { name: 'Amazon', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/amazon.png', url: 'https://www.amazon.com', popular: false, category: 'Global Giant' },
      { name: 'Alibaba', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/alibaba.png', url: 'https://www.alibaba.com', popular: false, category: 'Wholesale' },
      { name: 'Pickaboo', icon: '📱', url: 'https://www.pickaboo.com', popular: false, category: 'Electronics' },
      { name: 'Chaldal', icon: '🥬', url: 'https://chaldal.com', popular: true, category: 'Groceries' },
      { name: 'Rokomari', icon: '📚', url: 'https://www.rokomari.com', popular: false, category: 'Books' },
      { name: 'eBay', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/ebay.png', url: 'https://www.ebay.com', popular: false, category: 'Auction' }
    ],
    jobs: [
      { name: 'Bdjobs', icon: '💼', url: 'https://www.bdjobs.com', popular: true, category: 'Job Portal' },
      { name: 'Chakri.com', icon: '💼', url: 'https://www.chakri.com', popular: true, category: 'Local Jobs' },
      { name: 'LinkedIn', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/linkedin.png', url: 'https://www.linkedin.com', popular: false, category: 'Professional Network' },
      { name: 'Indeed', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/indeed.png', url: 'https://www.indeed.com', popular: false, category: 'Global Jobs' },
      { name: 'Glassdoor', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/glassdoor.png', url: 'https://www.glassdoor.com', popular: false, category: 'Reviews' },
      { name: 'Prothom Alo Jobs', icon: '💼', url: 'https://jobs.prothomalo.com', popular: true, category: 'Newspaper Jobs' },
      { name: 'JobsDB', icon: '💼', url: 'https://bd.jobsdb.com', popular: false, category: 'Database' },
      { name: 'Naukri', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/naukri.png', url: 'https://www.naukri.com', popular: false, category: 'Indian Portal' }
    ],
    ai: [
      { name: 'ChatGPT', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/chatgpt.png', url: 'https://chat.openai.com', popular: true, category: 'Conversational AI' },
      { name: 'Claude', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/claude.png', url: 'https://claude.ai', popular: true, category: 'AI Assistant' },
      { name: 'Midjourney', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/midjourney.png', url: 'https://www.midjourney.com', popular: false, category: 'AI Art' },
      { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/canva.png', url: 'https://www.canva.com', popular: false, category: 'Design Tool' },
      { name: 'Notion', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/notion.png', url: 'https://www.notion.so', popular: true, category: 'Productivity' },
      { name: 'Perplexity', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/perplexity.png', url: 'https://www.perplexity.ai', popular: false, category: 'AI Search' },
      { name: 'Gemini', icon: 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/gemini.png', url: 'https://gemini.google.com', popular: false, category: 'Google AI' },
      { name: 'Copy.ai', icon: '✍️', url: 'https://www.copy.ai', popular: false, category: 'Content AI' }
    ],
    prayer: [
      { name: 'IslamicFinder', icon: '🕌', url: 'https://www.islamicfinder.org', popular: true, category: 'Prayer Times' },
      { name: 'Athan Pro', icon: '⏰', url: 'https://www.athan.pro', popular: true, category: 'Prayer App' },
      { name: 'Al Quran', icon: '📖', url: 'https://quran.com', popular: false, category: 'Holy Quran' },
      { name: 'Hadith Collection', icon: '📚', url: 'https://sunnah.com', popular: false, category: 'Hadith' },
      { name: 'Qibla Finder', icon: '🧭', url: 'https://qiblafinder.withgoogle.com', popular: true, category: 'Qibla Direction' },
      { name: 'Islamic Calendar', icon: '📅', url: 'https://www.islamicfinder.org/islamic-calendar', popular: false, category: 'Hijri Calendar' },
      { name: 'Tasbih Counter', icon: '📿', url: 'https://www.islamicfinder.org/tasbih', popular: false, category: 'Digital Tasbih' },
      { name: 'Mosque Locator', icon: '🕌', url: 'https://www.islamicfinder.org/find-mosques-near-me', popular: false, category: 'Find Mosque' }
    ]
  };

  const getCurrentCategory = () => categories.find(cat => cat.id === currentView);

  const openWebView = (url) => {
    window.open(url, '_blank');
  };

  const filteredResources = currentView !== 'home' 
    ? (resources[currentView] || []).filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredCategories = searchQuery 
    ? categories.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  return (
    <div className="flex-1 flex flex-col overflow-auto p-6 bg-gray-50">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {currentView !== 'home' && (
            <button
              onClick={() => setCurrentView('home')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">QuickDoc</h1>
            <p className="text-gray-600">
              {currentView === 'home' ? 'Access your favorite platforms instantly' : 'Browse available resources'}
            </p>
          </div>
        </div>

        {/* View Toggle */}
        {currentView !== 'home' && (
          <div className="flex items-center gap-2">
            <div className="flex bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setCurrentView('home')}
                className="px-4 py-2 rounded-md text-sm font-medium transition-all text-gray-600 hover:text-gray-800"
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Dashboard
              </button>
              <button
                className="px-4 py-2 rounded-md text-sm font-medium transition-all bg-purple-600 text-white shadow-sm"
              >
                <Target className="w-4 h-4 inline mr-2" />
                {getCurrentCategory()?.name || 'Resources'}
              </button>
            </div>
          </div>
        )}
      </div>

      {currentView === 'home' ? (
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Platform Directory</h2>
            <p className="text-gray-600">Quick access to your most-used websites and services</p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
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
            {filteredCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => setCurrentView(category.id)}
                  className="bg-white p-6 rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200 group"
                >
                  <div className="text-center">
                    <div className="inline-flex p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow-md mb-4 group-hover:shadow-lg transition-all">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                    <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
                      <TrendingUp className="w-4 h-4" />
                      <span>Available</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No categories found</h3>
              <p className="text-gray-500">Try searching for something else</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Category Header */}
          <div>
            <div className="flex items-center gap-4 mb-2">
              {getCurrentCategory() && (
                <div className="p-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow-sm">
                  {React.createElement(getCurrentCategory().icon, { className: "w-6 h-6 text-white" })}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{getCurrentCategory()?.name}</h2>
                <p className="text-gray-600">{getCurrentCategory()?.description}</p>
              </div>
            </div>
          </div>

          {/* Search in Category */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${getCurrentCategory()?.name.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all shadow-sm text-black placeholder:text-gray-500"
            />
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map((resource, index) => (
              <div
                key={index}
                onClick={() => openWebView(resource.url)}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group border border-gray-200 hover:border-purple-200"
              >
                <div className="text-center">
                  {/* Icon Container */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden group-hover:bg-purple-50 transition-colors">
                    {resource.icon.startsWith('http') ? (
                      <img
                        src={resource.icon}
                        alt={resource.name}
                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <span 
                      className="text-2xl group-hover:scale-110 transition-transform" 
                      style={{ display: resource.icon.startsWith('http') ? 'none' : 'block' }}
                    >
                      {resource.icon.startsWith('http') ? '🔗' : resource.icon}
                    </span>
                  </div>
                  
                  {/* Resource Info */}
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors text-sm">
                      {resource.name}
                    </h3>
                    {resource.popular && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      </div>
                    )}
                  </div>
                  
                  {/* Category Tag */}
                  <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 mb-4 group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                    {resource.category}
                  </div>
                  
                  {/* Action Icon */}
                  <div className="flex items-center justify-center">
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No resources found</h3>
              <p className="text-gray-500">Try searching for something else</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuickDoc;