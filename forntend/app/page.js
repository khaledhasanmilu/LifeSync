"use client"; 
import { useState, useEffect } from 'react';
import { 
  Calendar, 
  DollarSign, 
  CheckSquare, 
  BookOpen, 
  MapPin, 
  AlertTriangle,
  BarChart3,
  Clock,
  ArrowRight,
  ChevronDown,
  Heart,
  Smartphone,
  Shield,
  Zap,
  User,
  Grid
} from 'lucide-react';
import Link from 'next/link';

export default function LifeSyncWelcome() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Smart Dashboard",
      description: "Get a complete overview of your finances and mood in one beautiful interface",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Finance Tracking",
      description: "Monitor your expenses, income, and savings with intelligent insights",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <CheckSquare className="w-12 h-12" />,
      title: "Smart To-Do",
      description: "Organize daily and monthly tasks with integrated reminders and scheduling",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Learning Queue",
      description: "Save articles, videos, and resources in your personalized learning hub",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: "Travel Tracker",
      description: "Plan trips with expense tracking and comprehensive checklists",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <AlertTriangle className="w-12 h-12" />,
      title: "Emergency Alert",
      description: "Stay safe with live location sharing and instant emergency contacts",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <Grid className="w-12 h-12" />,
      title: "QuickDock",
      description: "Access all your frequently used tools and shortcuts in one place",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">LifeSync</span>
        </div>
        <div className="flex space-x-4">
          <button className="px-6 py-2 text-white/80 hover:text-white transition-colors">
            Features
          </button>
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg text-white transition-all duration-300">
            <Link href="/signup">Sign In</Link>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-8 py-20 text-center">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 mb-8">
            <span className="text-purple-300 text-sm">Arrange your life with LifeSync</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Manage Your Life
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              From Dawn to Dusk
            </span>
          </h1>
          
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            LifeSync is your intelligent companion that seamlessly integrates finance tracking, 
            task management, learning, travel planning, and emergency safety into one powerful platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 flex items-center">
              <Smartphone className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/50" />
        </div>
      </section>

      {/* Features Showcase */}
      <section className="relative z-10 px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Discover how LifeSync transforms the way you organize, plan, and live your daily life
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:scale-105 ${
                  currentFeature === index ? 'ring-2 ring-purple-500/50 bg-white/10' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Highlights Section */}
      <section className="relative z-10 px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Highlights of LifeSync
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              See how LifeSync keeps your day productive, fun, and motivating
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Daily Motivation</h3>
              <p className="text-white/70 text-sm">
                "Stay consistent, and the results will follow!"
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Time Spent Today</h3>
              <p className="text-white/70 text-sm">
                Work: 2h | Learn: 1h | Travel: 30m
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Mood Tracker</h3>
              <p className="text-white/70 text-sm text-2xl">
                😃 😎 😴 😇
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Sync Your Life?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their daily routine with LifeSync. 
              Start your journey towards a more organized, productive, and fulfilling life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Your Free Trial
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">LifeSync</span>
          </div>
          <div className="text-white/60 text-sm">
            © 2025 LifeSync. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
