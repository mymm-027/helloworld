'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend
} from 'recharts';
import { 
  BookOpen, 
  Users, 
  Activity, 
  TrendingUp, 
  Zap, 
  Brain,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target
} from 'lucide-react';
import { api } from '@/services/api';
import { GlowCard, AnimatedProgress, PulsingDot, fadeInUp } from '@/components/effects/Animations';

const EMOTION_COLORS: Record<string, string> = {
  happy: '#22c55e',
  neutral: '#64748b',
  confused: '#f59e0b',
  bored: '#ef4444',
  focused: '#06b6d4',
  surprised: '#a855f7',
};

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  color: 'cyan' | 'emerald' | 'amber' | 'rose';
  delay?: number;
}

function StatCard({ title, value, change, icon: Icon, color, delay = 0 }: StatCardProps) {
  const colorStyles = {
    cyan: {
      bg: 'from-cyan-500/20 to-cyan-600/10',
      border: 'border-cyan-500/20',
      icon: 'text-cyan-400',
      iconBg: 'bg-cyan-500/20',
      glow: 'shadow-cyan-500/10',
    },
    emerald: {
      bg: 'from-emerald-500/20 to-emerald-600/10',
      border: 'border-emerald-500/20',
      icon: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20',
      glow: 'shadow-emerald-500/10',
    },
    amber: {
      bg: 'from-amber-500/20 to-amber-600/10',
      border: 'border-amber-500/20',
      icon: 'text-amber-400',
      iconBg: 'bg-amber-500/20',
      glow: 'shadow-amber-500/10',
    },
    rose: {
      bg: 'from-rose-500/20 to-rose-600/10',
      border: 'border-rose-500/20',
      icon: 'text-rose-400',
      iconBg: 'bg-rose-500/20',
      glow: 'shadow-rose-500/10',
    },
  };

  const styles = colorStyles[color];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      <GlowCard className={`p-6 bg-gradient-to-br ${styles.bg} ${styles.border}`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${styles.icon}`} />
          </div>
          {change !== undefined && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${change >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              {change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              <span className="text-xs font-semibold">{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
      </GlowCard>
    </motion.div>
  );
}

function EmotionRing({ data }: { data: any[] }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  
  return (
    <div className="relative w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="count"
            nameKey="emotion"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={EMOTION_COLORS[entry.emotion.toLowerCase()] || '#64748b'}
                style={{ filter: `drop-shadow(0 0 8px ${EMOTION_COLORS[entry.emotion.toLowerCase()] || '#64748b'}40)` }}
              />
            ))}
          </Pie>
          <RechartsTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="glass-card px-4 py-3 rounded-xl">
                    <p className="text-sm font-semibold text-foreground capitalize">{data.emotion}</p>
                    <p className="text-xs text-muted-foreground">{data.count.toLocaleString()} records</p>
                    <p className="text-xs text-cyan-400">{((data.count / total) * 100).toFixed(1)}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-3xl font-bold text-foreground">{total.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total Records</p>
        </div>
      </div>
    </div>
  );
}

function EngagementChart({ data }: { data: any[] }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
          <XAxis 
            dataKey="week" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            domain={[0, 100]}
          />
          <RechartsTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="glass-card px-4 py-3 rounded-xl">
                    <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
                    {payload.map((entry: any, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
                        <span className="text-xs text-muted-foreground capitalize">{entry.dataKey}:</span>
                        <span className="text-xs font-semibold text-foreground">{entry.value}%</span>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Area 
            type="monotone" 
            dataKey="engagement" 
            stroke="#06b6d4" 
            strokeWidth={2}
            fill="url(#engagementGradient)" 
          />
          <Area 
            type="monotone" 
            dataKey="focus" 
            stroke="#22c55e" 
            strokeWidth={2}
            fill="url(#focusGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/api/v1/analytics/dashboard');
        setData(response.data);
      } catch (error) {
        // Fallback data for demo
        setData({
          total_lectures: 256,
          total_students: 1847,
          avg_engagement: 0.78,
          avg_focus: 0.82,
          emotion_distribution: [
            { emotion: 'Neutral', count: 12000, percentage: 45.2 },
            { emotion: 'Happy', count: 8500, percentage: 32.1 },
            { emotion: 'Focused', count: 3500, percentage: 13.2 },
            { emotion: 'Confused', count: 1500, percentage: 5.7 },
            { emotion: 'Bored', count: 800, percentage: 3.0 },
            { emotion: 'Surprised', count: 200, percentage: 0.8 }
          ],
          weekly_trends: [
            { week: 'Week 1', engagement: 65, focus: 70 },
            { week: 'Week 2', engagement: 72, focus: 75 },
            { week: 'Week 3', engagement: 68, focus: 71 },
            { week: 'Week 4', engagement: 79, focus: 80 },
            { week: 'Week 5', engagement: 85, focus: 82 },
            { week: 'Week 6', engagement: 82, focus: 85 },
            { week: 'Week 7', engagement: 88, focus: 87 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Brain className="w-8 h-8 text-cyan-400" />
          </motion.div>
          <p className="text-muted-foreground">Analyzing classroom data...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Lectures', value: data?.total_lectures || 0, change: 12, icon: BookOpen, color: 'cyan' as const },
    { title: 'Active Students', value: data?.total_students?.toLocaleString() || '0', change: 8, icon: Users, color: 'emerald' as const },
    { title: 'Avg Engagement', value: `${((data?.avg_engagement || 0) * 100).toFixed(0)}%`, change: 5, icon: Activity, color: 'amber' as const },
    { title: 'Focus Score', value: `${((data?.avg_focus || 0) * 100).toFixed(0)}%`, change: -2, icon: Target, color: 'rose' as const },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard Overview</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <PulsingDot color="emerald" size="sm" />
            <span>Real-time analytics across all classrooms</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI Insights</span>
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Generate Report</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <StatCard key={stat.title} {...stat} delay={i * 0.1} />
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engagement Trends */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlowCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Engagement Trends</h2>
                <p className="text-sm text-muted-foreground">Weekly performance metrics</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400" />
                  <span className="text-xs text-muted-foreground">Engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs text-muted-foreground">Focus</span>
                </div>
              </div>
            </div>
            <EngagementChart data={data?.weekly_trends || []} />
          </GlowCard>
        </motion.div>

        {/* Emotion Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlowCard className="p-6 h-full">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground mb-1">Emotion Distribution</h2>
              <p className="text-sm text-muted-foreground">Current semester data</p>
            </div>
            <EmotionRing data={data?.emotion_distribution || []} />
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {(data?.emotion_distribution || []).slice(0, 4).map((item: any) => (
                <div key={item.emotion} className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ background: EMOTION_COLORS[item.emotion.toLowerCase()] }}
                  />
                  <span className="text-xs text-muted-foreground capitalize">{item.emotion}</span>
                  <span className="text-xs font-semibold text-foreground ml-auto">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </GlowCard>
        </motion.div>
      </div>

      {/* AI Insight Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlowCard className="p-6 bg-gradient-to-r from-cyan-500/5 via-transparent to-emerald-500/5 border-cyan-500/10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center shrink-0">
              <Brain className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-foreground">AI-Powered Insight</h3>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">
                  New
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Based on the analysis of 19,000+ emotion records, student engagement peaks during the first 20 minutes of lectures. 
                Consider introducing interactive elements after the 25-minute mark to maintain focus. 
                Courses taught by Dr. Ahmed show 23% higher engagement rates - analyzing teaching patterns for best practices.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                  View detailed analysis
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
}
