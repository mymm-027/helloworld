'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  Play, 
  ChevronRight,
  Filter,
  Search,
  Video,
  BarChart3,
  TrendingUp,
  Eye,
  BookOpen
} from 'lucide-react';
import { GlowCard, PulsingDot, AnimatedProgress } from '@/components/effects/Animations';

interface Lecture {
  id: string;
  name: string;
  course: string;
  courseCode: string;
  lecturer: string;
  date: string;
  time: string;
  duration: string;
  students: number;
  avgEngagement: number;
  avgFocus: number;
  status: 'completed' | 'live' | 'upcoming';
}

const generateMockLectures = (): Lecture[] => {
  const courses = [
    { name: 'Artificial Intelligence', code: 'CS301' },
    { name: 'Data Structures', code: 'CS201' },
    { name: 'Machine Learning', code: 'CS401' },
    { name: 'Database Systems', code: 'CS302' },
  ];
  const lecturers = ['Dr. Ahmed', 'Dr. Sara', 'Dr. Omar', 'Prof. Hassan'];
  const statuses: ('completed' | 'live' | 'upcoming')[] = ['completed', 'completed', 'completed', 'live', 'upcoming', 'upcoming'];

  return Array.from({ length: 12 }, (_, i) => {
    const course = courses[i % courses.length];
    const status = i === 3 ? 'live' : i < 3 ? 'completed' : i > 8 ? 'upcoming' : 'completed';
    
    return {
      id: `L${String(i + 1).padStart(3, '0')}`,
      name: `${course.name} - Lecture ${Math.floor(i / 4) + 1}`,
      course: course.name,
      courseCode: course.code,
      lecturer: lecturers[i % lecturers.length],
      date: new Date(Date.now() - (10 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        weekday: 'short', month: 'short', day: 'numeric' 
      }),
      time: `${8 + (i % 6)}:00 AM`,
      duration: '90 min',
      students: 18 + Math.floor(Math.random() * 10),
      avgEngagement: status === 'upcoming' ? 0 : 0.6 + Math.random() * 0.35,
      avgFocus: status === 'upcoming' ? 0 : 0.6 + Math.random() * 0.35,
      status,
    };
  });
};

export default function LecturesPage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'live' | 'upcoming'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLectures(generateMockLectures());
      setLoading(false);
    }, 500);
  }, []);

  const filteredLectures = lectures.filter(l => {
    const matchesFilter = filter === 'all' || l.status === filter;
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.lecturer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusConfig = {
    completed: { 
      bg: 'bg-emerald-500/10', 
      text: 'text-emerald-400', 
      border: 'border-emerald-500/20',
      icon: BarChart3
    },
    live: { 
      bg: 'bg-red-500/10', 
      text: 'text-red-400', 
      border: 'border-red-500/20',
      icon: Video
    },
    upcoming: { 
      bg: 'bg-amber-500/10', 
      text: 'text-amber-400', 
      border: 'border-amber-500/20',
      icon: Clock
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lecture Analytics</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Track engagement across all lectures</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium">Start Session</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: 'Total Lectures', value: lectures.length, color: 'cyan', icon: BookOpen },
          { label: 'Live Now', value: lectures.filter(l => l.status === 'live').length, color: 'red', icon: Video },
          { label: 'Upcoming', value: lectures.filter(l => l.status === 'upcoming').length, color: 'amber', icon: Clock },
        ].map((stat, i) => (
          <GlowCard key={stat.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
              </div>
            </div>
          </GlowCard>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlowCard className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search lectures, courses, or lecturers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-2">
              {(['all', 'completed', 'live', 'upcoming'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    filter === status
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'bg-secondary/50 text-muted-foreground hover:text-foreground border border-transparent'
                  }`}
                >
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                  {status === 'live' && filter === status && (
                    <span className="ml-2 w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Lectures Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                className="h-48 rounded-xl bg-secondary/30 animate-pulse"
              />
            ))
          ) : (
            filteredLectures.map((lecture, i) => {
              const config = statusConfig[lecture.status];
              
              return (
                <motion.div
                  key={lecture.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlowCard className="p-5 h-full group cursor-pointer hover:border-cyan-500/30">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-lg ${config.bg} ${config.text} border ${config.border}`}>
                        <div className="flex items-center gap-1.5">
                          {lecture.status === 'live' && <PulsingDot color="red" size="sm" />}
                          <span className="text-xs font-semibold uppercase">{lecture.status}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{lecture.id}</span>
                    </div>

                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-cyan-400 transition-colors">
                      {lecture.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{lecture.lecturer}</p>

                    <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{lecture.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lecture.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        <span>{lecture.students} students</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{lecture.courseCode}</span>
                      </div>
                    </div>

                    {lecture.status !== 'upcoming' && (
                      <div className="space-y-2 pt-3 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Engagement</span>
                          <span className="text-xs font-mono text-foreground">
                            {(lecture.avgEngagement * 100).toFixed(0)}%
                          </span>
                        </div>
                        <AnimatedProgress 
                          value={lecture.avgEngagement * 100} 
                          color={lecture.avgEngagement > 0.7 ? 'cyan' : lecture.avgEngagement > 0.5 ? 'amber' : 'red'}
                          height="h-1.5"
                        />
                      </div>
                    )}

                    <motion.div
                      className="flex items-center justify-end mt-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    >
                      <span className="text-xs font-medium">View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.div>
                  </GlowCard>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
