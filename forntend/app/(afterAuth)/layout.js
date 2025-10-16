"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  BarChart3, DollarSign, CheckSquare, BookOpen, MapPin, AlertTriangle, Zap,
  User, Bell, Settings, LogOut, ChevronDown, Search
} from 'lucide-react';

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activePage, setActivePage] = useState('Dashboard');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [userEmail, setUserEmail] = useState('example@gmail.com');

    useEffect(() => {
      fetch("/api/usr")
        .then(res => res.json())
        .then(data => {
          setUsername(data.username);
          setUserEmail(data.userEmail);
        });
      
    }, []);


  useEffect(() => {
    if (pathname.includes('dashboard')) setActivePage('Dashboard');
    else if (pathname.includes('finance')) setActivePage('Finance');
    else if (pathname.includes('todo')) setActivePage('Todo');
    else if (pathname.includes('learning')) setActivePage('Learning');
    else if (pathname.includes('travel')) setActivePage('Travel');
    else if (pathname.includes('quickdock')) setActivePage('QuickDock');
  }, [pathname]);

  const sidebarItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" />, path: '/dashboard' },
    { id: 'Finance', label: 'Finance Tracker', icon: <DollarSign className="w-5 h-5" />, path: '/finance' },
    { id: 'Todo', label: 'To-Do', icon: <CheckSquare className="w-5 h-5" />, path: '/todo' },
    { id: 'Learning', label: 'Learning Queue', icon: <BookOpen className="w-5 h-5" />, path: '/learning' },
    { id: 'Travel', label: 'Travel Tracker', icon: <MapPin className="w-5 h-5" />, path: '/travel' },
    { id: 'QuickDock', label: 'QuickDock', icon: <Zap className="w-5 h-5" />, path: '/quickdock' },
  ];

  const handleNavigate = (path, id) => {
    setActivePage(id);
    router.push(path);
  };

  const handleLogout = () => {
    fetch('http://localhost:3001/api/users/logout', {
      method: 'POST',
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    });
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      
      {/* Sidebar */}
      <div className="w-72 bg-white/80 backdrop-blur-xl shadow-2xl border-r border-white/20 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100/50">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">LifeSync</span>
              <p className="text-xs text-gray-500">Organize your life</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1.5">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigate(item.path, item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    activePage === item.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30 scale-105'
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-800 hover:scale-102'
                  }`}
                >
                  <div className={`transition-transform duration-300 ${activePage === item.id ? '' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                  {activePage === item.id && (
                    <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        {/* <div className="p-4 border-t border-gray-100/50">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john@example.com</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 px-8 py-4 sticky top-0 z-40">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {activePage}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage your {activePage.toLowerCase()}</p>
            </div>

            <div className="flex items-center space-x-3">
              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-50 rounded-xl px-4 py-2.5 space-x-2 border border-gray-200/50 hover:border-purple-300 transition-colors">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400 w-48"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 group">
                <Bell className="w-5 h-5 group-hover:animate-pulse" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-br from-red-500 to-pink-500 rounded-full border-2 border-white shadow-sm"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 pl-3 pr-3 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">{username}</p>
                      <p className="text-xs text-gray-500">{userEmail}</p>
                    </div>
                    {/* <button className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-purple-50 flex items-center space-x-3 transition-all group">
                      <Settings className="w-4 h-4 text-gray-500 group-hover:text-purple-600 group-hover:rotate-90 transition-all" />
                      <span className="text-sm">Settings</span>
                    </button> */}
                    <button className="w-full px-4 py-2.5 text-left text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-red-50 flex items-center space-x-3 transition-all group">
                      <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-colors" />
                      <span className="text-sm" onClick={handleLogout}>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}