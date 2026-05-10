'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock,
  ChevronRight,
  BarChart3,
  GraduationCap,
  Target
} from 'lucide-react';
import { GlowCard, PulsingDot, AnimatedProgress } from '@/components/effects/Animations';

interface Course {
  id: string;
  code: string;
  name: string;
  lecturer: string;
  students: number;
  lectures: number;
  avgEngagement: number;
  avgFocus: number;
  trend: 'up' | 'down' | 'stable';
}

const mockCourses: Course[] = [
  { id: '1', code: 'CS301', name: 'Artificial Intelligence', lecturer: 'Dr. Ahmed', students: 45, lectures: 24, avgEngagement: 0.82, avgFocus: 0.78, trend: 'up' },
  { id: '2', code: 'CS201', name: 'Data Structures', lecturer: 'Dr. Sara', students: 52, lectures: 28, avgEngagement: 0.75, avgFocus: 0.72, trend: 'stable' },
  { id: '3', code: 'CS401', name: 'Machine Learning', lecturer: 'Dr. Omar', students: 38, lectures: 20, avgEngagement: 0.88, avgFocus: 0.85, trend: 'up' },
  { id: '4', code: 'CS302', name: 'Database Systems', lecturer: 'Prof. Hassan', students: 48, lectures: 22, avgEngagement: 0.68, avgFocus: 0.65, trend: 'down' },
  { id: '5', code: 'CS102', name: 'Programming Fundamentals', lecturer: 'Dr. Fatima', students: 60, lectures: 30, avgEngagement: 0.79, avgFocus: 0.76, trend: 'up' },
  { id: '6', code: 'CS501', name: 'Deep Learning', lecturer: 'Dr. Ahmed', students: 32, lectures: 18, avgEngagement: 0.91, avgFocus: 0.88, trend: 'up' },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 300);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Course Analytics</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>Monitor course performance and engagement</span>
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'cyan' },
          { label: 'Active Students', value: courses.reduce((acc, c) => acc + c.students, 0), icon: Users, color: 'emerald' },
          { label: 'Total Lectures', value: courses.reduce((acc, c) => acc + c.lectures, 0), icon: Clock, color: 'amber' },
          { label: 'Avg Engagement', value: `${(courses.reduce((acc, c) => acc + c.avgEngagement, 0) / courses.length * 100 || 0).toFixed(0)}%`, icon: Target, color: 'rose' },
        ].map((stat) => (
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

      {/* Courses Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <GlowCard className="p-6 group cursor-pointer hover:border-cyan-500/30">
              <div className="flex items-start justify-between mb-4">
                <div className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <span className="text-xs font-semibold">{course.code}</span>
                </div>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                  course.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' :
                  course.trend === 'down' ? 'bg-red-500/10 text-red-400' :
                  'bg-slate-500/10 text-slate-400'
                }`}>
                  <TrendingUp className={`w-3 h-3 ${course.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{course.trend === 'up' ? '+5%' : course.trend === 'down' ? '-3%' : '0%'}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-cyan-400 transition-colors">
                {course.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">{course.lecturer}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 rounded-xl bg-secondary/30">
                  <p className="text-xl font-bold text-foreground">{course.students}</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-secondary/30">
                  <p className="text-xl font-bold text-foreground">{course.lectures}</p>
                  <p className="text-xs text-muted-foreground">Lectures</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Engagement</span>
                    <span className="text-xs font-mono text-foreground">{(course.avgEngagement * 100).toFixed(0)}%</span>
                  </div>
                  <AnimatedProgress value={course.avgEngagement * 100} color="cyan" height="h-1.5" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Focus</span>
                    <span className="text-xs font-mono text-foreground">{(course.avgFocus * 100).toFixed(0)}%</span>
                  </div>
                  <AnimatedProgress value={course.avgFocus * 100} color="emerald" height="h-1.5" />
                </div>
              </div>

              <motion.div
                className="flex items-center justify-end mt-4 pt-4 border-t border-border text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="text-sm font-medium">View Analytics</span>
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
