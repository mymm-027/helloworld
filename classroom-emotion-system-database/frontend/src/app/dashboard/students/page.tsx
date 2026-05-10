'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/services/api';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  User,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Eye,
  Mail,
  Calendar,
  Activity,
  ChevronLeft,
  ChevronRight,
  Download,
  UserPlus
} from 'lucide-react';
import { GlowCard, PulsingDot, AnimatedProgress } from '@/components/effects/Animations';

interface Student {
  student_id: number;
  student_code: string;
  first_name: string;
  last_name: string;
  email: string;
  enrollment_year: number;
  status: string;
  avg_engagement?: number;
  avg_focus?: number;
  dominant_emotion?: string;
}

const EMOTION_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  happy: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  neutral: { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20' },
  focused: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  confused: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  bored: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
};

// Mock data for demo
const generateMockStudents = (): Student[] => {
  const emotions = ['happy', 'neutral', 'focused', 'confused', 'bored'];
  const names = [
    { first: 'Linda', last: 'Johnson' },
    { first: 'Rawan', last: 'Ahmed' },
    { first: 'Omar', last: 'Hassan' },
    { first: 'Sara', last: 'Mohamed' },
    { first: 'Ali', last: 'Khalid' },
    { first: 'Fatima', last: 'Ibrahim' },
    { first: 'Noor', last: 'Abdullah' },
    { first: 'Yusuf', last: 'Rahman' },
  ];

  return names.map((name, i) => ({
    student_id: i + 1,
    student_code: `S00${i + 1}`,
    first_name: name.first,
    last_name: name.last,
    email: `${name.first.toLowerCase()}.${name.last.toLowerCase()}@university.edu`,
    enrollment_year: 2022 + Math.floor(Math.random() * 3),
    status: 'Active',
    avg_engagement: 0.5 + Math.random() * 0.5,
    avg_focus: 0.5 + Math.random() * 0.5,
    dominant_emotion: emotions[Math.floor(Math.random() * emotions.length)],
  }));
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'engagement' | 'focus'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/api/v1/students');
        // Augment with mock engagement data
        const augmented = response.data.map((s: any) => ({
          ...s,
          avg_engagement: 0.5 + Math.random() * 0.5,
          avg_focus: 0.5 + Math.random() * 0.5,
          dominant_emotion: ['happy', 'neutral', 'focused', 'confused', 'bored'][Math.floor(Math.random() * 5)],
        }));
        setStudents(augmented);
      } catch (error) {
        setStudents(generateMockStudents());
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Filter and sort
  const filteredStudents = students
    .filter(s => 
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.student_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
      } else if (sortField === 'engagement') {
        comparison = (a.avg_engagement || 0) - (b.avg_engagement || 0);
      } else if (sortField === 'focus') {
        comparison = (a.avg_focus || 0) - (b.avg_focus || 0);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
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
          <h1 className="text-2xl font-bold text-foreground">Student Directory</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <PulsingDot color="cyan" size="sm" />
            <span>{students.length} students enrolled</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus className="w-4 h-4" />
            <span className="text-sm font-medium">Add Student</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlowCard className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />
            </div>

            {/* Sort buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Sort by:</span>
              {(['name', 'engagement', 'focus'] as const).map(field => (
                <button
                  key={field}
                  onClick={() => toggleSort(field)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    sortField === field 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                      : 'bg-secondary/50 text-muted-foreground hover:text-foreground border border-transparent'
                  }`}
                >
                  <span className="capitalize">{field}</span>
                  {sortField === field && (
                    sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlowCard className="overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 rounded-xl bg-cyan-500/20 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Activity className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <p className="text-muted-foreground">Loading students...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Year</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Engagement</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Focus</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mood</th>
                      <th className="text-left px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="popLayout">
                      {paginatedStudents.map((student, i) => {
                        const emotionStyle = EMOTION_STYLES[student.dominant_emotion || 'neutral'];
                        
                        return (
                          <motion.tr
                            key={student.student_id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: i * 0.03 }}
                            className="border-b border-border hover:bg-secondary/20 transition-colors cursor-pointer"
                            onClick={() => setSelectedStudent(student)}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center text-cyan-400 font-semibold">
                                  {student.first_name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{student.first_name} {student.last_name}</p>
                                  <p className="text-xs text-muted-foreground font-mono">{student.student_code}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{student.email}</td>
                            <td className="px-6 py-4 text-sm text-foreground">{student.enrollment_year}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-16">
                                  <AnimatedProgress 
                                    value={(student.avg_engagement || 0) * 100} 
                                    color={student.avg_engagement && student.avg_engagement > 0.7 ? 'emerald' : student.avg_engagement && student.avg_engagement > 0.5 ? 'amber' : 'red'}
                                    height="h-1.5"
                                  />
                                </div>
                                <span className="text-xs font-mono text-foreground">
                                  {((student.avg_engagement || 0) * 100).toFixed(0)}%
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-16">
                                  <AnimatedProgress 
                                    value={(student.avg_focus || 0) * 100} 
                                    color={student.avg_focus && student.avg_focus > 0.7 ? 'cyan' : student.avg_focus && student.avg_focus > 0.5 ? 'amber' : 'red'}
                                    height="h-1.5"
                                  />
                                </div>
                                <span className="text-xs font-mono text-foreground">
                                  {((student.avg_focus || 0) * 100).toFixed(0)}%
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${emotionStyle.bg} ${emotionStyle.text} border ${emotionStyle.border}`}>
                                {student.dominant_emotion}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {student.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-border hover:bg-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                    Math.max(0, currentPage - 2),
                    Math.min(totalPages, currentPage + 1)
                  ).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-cyan-500 text-white'
                          : 'border border-border hover:bg-secondary/50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-border hover:bg-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </GlowCard>
      </motion.div>
    </div>
  );
}
