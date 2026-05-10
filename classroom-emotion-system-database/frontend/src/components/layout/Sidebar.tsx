'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarDays,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Activity,
  AlertCircle,
  FileText,
  Sparkles,
  Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Cookies from 'js-cookie';
import { PulsingDot } from '@/components/effects/Animations';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard, badge: null },
  { name: 'Live Monitor', href: '/dashboard/live', icon: Radio, badge: 'live' },
  { name: 'Lectures', href: '/dashboard/lectures', icon: CalendarDays, badge: null },
  { name: 'Students', href: '/dashboard/students', icon: Users, badge: null },
  { name: 'Courses', href: '/dashboard/courses', icon: BookOpen, badge: null },
  { name: 'Alerts', href: '/dashboard/alerts', icon: AlertCircle, badge: '3' },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText, badge: null },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, badge: null },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    window.location.href = '/login';
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="glass-card h-screen flex flex-col relative z-20 border-r-0"
      style={{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      {/* Logo section */}
      <div className="h-20 flex items-center px-5 border-b border-border/50">
        <Link href="/dashboard" className="flex items-center gap-3">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
            </motion.div>
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-bold gradient-text">EduPulse</h1>
                <p className="text-[10px] text-muted-foreground font-mono tracking-widest">AI PLATFORM</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-cyan-500/50 transition-all duration-300 shadow-lg"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href;
          const isHovered = hoveredItem === item.name;

          return (
            <Link 
              key={item.name} 
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <motion.div
                className={cn(
                  'relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group',
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Hover glow effect */}
                {isHovered && !isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent rounded-xl"
                    layoutId="hoverGlow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                <div className={cn(
                  'relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300',
                  isActive 
                    ? 'bg-cyan-500/20' 
                    : 'bg-secondary/30 group-hover:bg-secondary/50'
                )}>
                  <item.icon className={cn(
                    'w-5 h-5 transition-colors duration-300',
                    isActive ? 'text-cyan-400' : 'text-muted-foreground group-hover:text-foreground'
                  )} />
                </div>

                <AnimatePresence>
                  {!collapsed && (
                    <motion.div
                      className="flex items-center justify-between flex-1 min-w-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className={cn(
                        'font-medium truncate',
                        isActive ? 'text-cyan-400' : ''
                      )}>
                        {item.name}
                      </span>
                      
                      {/* Badges */}
                      {item.badge === 'live' && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                          <PulsingDot color="red" size="sm" />
                          <span className="text-[10px] font-semibold text-red-400 uppercase tracking-wider">Live</span>
                        </div>
                      )}
                      {item.badge && item.badge !== 'live' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold text-amber-400">
                          {item.badge}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute left-full ml-3 px-3 py-2 rounded-lg glass-card whitespace-nowrap z-50"
                      >
                        <span className="text-sm font-medium text-foreground">{item.name}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-border/50">
        {/* AI Status */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10"
            >
              <div className="flex items-center gap-2 mb-1">
                <PulsingDot color="emerald" size="sm" />
                <span className="text-xs font-semibold text-emerald-400">AI Engine Active</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Processing 24 emotion feeds</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          onMouseEnter={() => setHoveredItem('logout')}
          onMouseLeave={() => setHoveredItem(null)}
          className={cn(
            'relative flex items-center gap-3 px-3 py-3 rounded-xl w-full transition-all duration-300',
            'text-muted-foreground hover:text-red-400 hover:bg-red-500/10'
          )}
        >
          <div className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>

          {/* Tooltip */}
          {collapsed && hoveredItem === 'logout' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute left-full ml-3 px-3 py-2 rounded-lg glass-card whitespace-nowrap z-50"
            >
              <span className="text-sm font-medium text-foreground">Sign Out</span>
            </motion.div>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
