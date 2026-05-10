'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Search, 
  User,
  Command,
  ChevronDown,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';
import Cookies from 'js-cookie';

export function Header() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        setUser(JSON.parse(userCookie));
      } catch {}
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-20 glass-card border-t-0 border-l-0 border-r-0 flex items-center justify-between px-6 relative z-10">
      {/* Left side - Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <motion.div 
          className={`
            relative flex items-center gap-3 flex-1
            px-4 h-11 rounded-xl
            bg-secondary/30 border
            transition-all duration-300
            ${searchFocused ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'border-border'}
          `}
        >
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students, lectures, courses..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50 border border-border">
            <Command className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">K</span>
          </div>
        </motion.div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        {/* Live time */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/30 border border-border">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* AI Status */}
        <motion.button
          className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-semibold">AI Active</span>
        </motion.button>

        {/* Notifications */}
        <motion.button
          className="relative w-11 h-11 rounded-xl bg-secondary/30 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-amber-500/30"
            >
              {notifications}
            </motion.span>
          )}
        </motion.button>

        {/* User menu */}
        <div className="relative">
          <motion.button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-secondary/30 border border-border hover:bg-secondary/50 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-foreground">{user?.name || 'Admin User'}</p>
              <p className="text-[10px] text-muted-foreground">{user?.role || 'Administrator'}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </motion.button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-56 glass-card rounded-xl py-2 shadow-2xl"
              >
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || 'admin@edupulse.ai'}</p>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button 
                    onClick={() => {
                      Cookies.remove('token');
                      Cookies.remove('user');
                      window.location.href = '/login';
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
