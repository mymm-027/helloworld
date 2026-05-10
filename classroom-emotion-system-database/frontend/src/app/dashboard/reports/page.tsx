'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart as PieChartIcon,
  Activity,
  Target,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { GlowCard, PulsingDot, AnimatedProgress } from '@/components/effects/Animations';

const weeklyData = [
  { name: 'Mon', engagement: 72, focus: 68, attendance: 92 },
  { name: 'Tue', engagement: 78, focus: 75, attendance: 88 },
  { name: 'Wed', engagement: 65, focus: 62, attendance: 95 },
  { name: 'Thu', engagement: 82, focus: 79, attendance: 90 },
  { name: 'Fri', engagement: 75, focus: 71, attendance: 85 },
];

const emotionData = [
  { name: 'Focused', value: 35, color: '#06b6d4' },
  { name: 'Neutral', value: 30, color: '#64748b' },
  { name: 'Happy', value: 20, color: '#22c55e' },
  { name: 'Confused', value: 10, color: '#f59e0b' },
  { name: 'Bored', value: 5, color: '#ef4444' },
];

const performanceData = [
  { subject: 'Engagement', A: 82, fullMark: 100 },
  { subject: 'Focus', A: 78, fullMark: 100 },
  { subject: 'Attendance', A: 91, fullMark: 100 },
  { subject: 'Participation', A: 65, fullMark: 100 },
  { subject: 'Retention', A: 72, fullMark: 100 },
];

const monthlyTrend = [
  { month: 'Jan', value: 65 },
  { month: 'Feb', value: 72 },
  { month: 'Mar', value: 68 },
  { month: 'Apr', value: 78 },
  { month: 'May', value: 82 },
];

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'semester'>('week');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics Reports</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span>Comprehensive performance insights</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-border overflow-hidden">
            {(['week', 'month', 'semester'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  timeRange === range 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: 'Avg Engagement', value: '78%', change: '+5%', trend: 'up', color: 'cyan' },
          { label: 'Avg Focus', value: '72%', change: '+3%', trend: 'up', color: 'emerald' },
          { label: 'Attendance Rate', value: '91%', change: '-2%', trend: 'down', color: 'amber' },
          { label: 'Sessions Analyzed', value: '156', change: '+12', trend: 'up', color: 'rose' },
        ].map((stat, i) => (
          <GlowCard key={stat.label} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="text-xs font-semibold">{stat.change}</span>
              </div>
            </div>
          </GlowCard>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlowCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Performance</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <RechartsTooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 23, 42, 0.9)', 
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '12px'
                    }}
                  />
                  <Bar dataKey="engagement" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="focus" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>
        </motion.div>

        {/* Emotion Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlowCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Emotion Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emotionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {emotionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 23, 42, 0.9)', 
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {emotionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </GlowCard>
        </motion.div>

        {/* Performance Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlowCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Performance Overview</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceData}>
                  <PolarGrid stroke="rgba(148,163,184,0.2)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <PolarRadiusAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Radar 
                    name="Performance" 
                    dataKey="A" 
                    stroke="#06b6d4" 
                    fill="#06b6d4" 
                    fillOpacity={0.3} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlowCard className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Engagement Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                  <RechartsTooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 23, 42, 0.9)', 
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    dot={{ fill: '#06b6d4', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </div>
  );
}
