'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  BarChart3, DollarSign, CheckSquare, BookOpen, MapPin, AlertTriangle, Zap,
  User, Bell, Settings, LogOut, ChevronDown
} from 'lucide-react';

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname(); // current URL path
  const [activePage, setActivePage] = useState('Dashboard');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Set active page based on path
  useEffect(() => {
    if (pathname.includes('dashboard')) setActivePage('Dashboard');
    else if (pathname.includes('finance')) setActivePage('Finance');
    else if (pathname.includes('todo')) setActivePage('Todo');
    else if (pathname.includes('learning')) setActivePage('Learning');
    else if (pathname.includes('travel')) setActivePage('Travel');
    else if (pathname.includes('emergency')) setActivePage('Emergency');
    else if (pathname.includes('quickdock')) setActivePage('QuickDock');
  }, [pathname]);

  const sidebarItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" />, path: '/dashboard' },
    { id: 'Finance', label: 'Finance Tracker', icon: <DollarSign className="w-5 h-5" />, path: '/finance' },
    { id: 'Todo', label: 'To-Do', icon: <CheckSquare className="w-5 h-5" />, path: '/todo' },
    { id: 'Learning', label: 'Learning Queue', icon: <BookOpen className="w-5 h-5" />, path: '/learning' },
    { id: 'Travel', label: 'Travel Tracker', icon: <MapPin className="w-5 h-5" />, path: '/travel' },
    { id: 'Emergency', label: 'Emergency Alert', icon: <AlertTriangle className="w-5 h-5" />, path: '/emergency' },
    { id: 'QuickDock', label: 'QuickDock', icon: <Zap className="w-5 h-5" />, path: '/quickdock' },
  ];

  const handleNavigate = (path, id) => {
    setActivePage(id);
    router.push(path);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl border-r border-gray-100 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">LifeSync</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigate(item.path, item.id)}
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
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
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
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
