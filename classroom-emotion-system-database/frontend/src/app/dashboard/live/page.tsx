'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, CartesianGrid,
  AreaChart, Area
} from 'recharts';
import { 
  Activity, 
  Users, 
  Zap, 
  Brain, 
  Video, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  Mic,
  Volume2,
  Maximize2,
  Settings,
  RefreshCw
} from 'lucide-react';
import { GlowCard, PulsingDot, AnimatedProgress } from '@/components/effects/Animations';

const EMOTION_CONFIG = {
  Happy: { color: '#22c55e', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  Neutral: { color: '#64748b', bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20' },
  Focused: { color: '#06b6d4', bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  Confused: { color: '#f59e0b', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  Bored: { color: '#ef4444', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
};

interface EmotionData {
  emotion: string;
  percentage: number;
  count: number;
  trend: 'up' | 'down' | 'stable';
}

interface StudentFeed {
  id: string;
  name: string;
  emotion: string;
  confidence: number;
  engagement: number;
}

// Simulate real-time data
const generateLiveData = () => {
  return Array.from({ length: 30 }).map((_, i) => ({
    time: i,
    engagement: 55 + Math.random() * 35,
    focus: 60 + Math.random() * 30,
    attention: 50 + Math.random() * 40,
  }));
};

const generateEmotions = (): EmotionData[] => [
  { emotion: 'Neutral', percentage: 35 + Math.random() * 15, count: 12, trend: 'stable' },
  { emotion: 'Focused', percentage: 25 + Math.random() * 10, count: 9, trend: 'up' },
  { emotion: 'Happy', percentage: 15 + Math.random() * 10, count: 6, trend: 'up' },
  { emotion: 'Confused', percentage: 8 + Math.random() * 7, count: 4, trend: 'down' },
  { emotion: 'Bored', percentage: 3 + Math.random() * 5, count: 2, trend: 'down' },
];

const generateStudentFeeds = (): StudentFeed[] => {
  const names = ['Linda', 'Rawan', 'Ahmed', 'Sara', 'Omar', 'Fatima', 'Ali', 'Noor'];
  const emotions = ['Happy', 'Neutral', 'Focused', 'Confused', 'Bored'];
  
  return names.map((name, i) => ({
    id: `S00${i + 1}`,
    name,
    emotion: emotions[Math.floor(Math.random() * emotions.length)],
    confidence: 0.75 + Math.random() * 0.24,
    engagement: 0.5 + Math.random() * 0.5,
  }));
};

export default function LiveMonitor() {
  const [data, setData] = useState(generateLiveData());
  const [emotions, setEmotions] = useState(generateEmotions());
  const [students, setStudents] = useState(generateStudentFeeds());
  const [isLive, setIsLive] = useState(true);
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lectureTime, setLectureTime] = useState(0);

  // Update data every 2 seconds
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: prev[prev.length - 1].time + 1,
          engagement: 55 + Math.random() * 35,
          focus: 60 + Math.random() * 30,
          attention: 50 + Math.random() * 40,
        });
        return newData;
      });
      
      setEmotions(generateEmotions());
      setStudents(generateStudentFeeds());
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setLectureTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatLectureTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const avgEngagement = data.slice(-10).reduce((sum, d) => sum + d.engagement, 0) / 10;
  const avgFocus = data.slice(-10).reduce((sum, d) => sum + d.focus, 0) / 10;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <PulsingDot color="red" size="lg" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Live Classroom Monitor</h1>
              <p className="text-sm text-muted-foreground">AI-powered real-time emotion analysis</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          {/* Lecture Info */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card">
            <Video className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-foreground">CS301 - Artificial Intelligence</span>
          </div>
          
          {/* Time */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-mono text-foreground">{formatLectureTime(lectureTime)}</span>
          </div>

          {/* Controls */}
          <motion.button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              isLive 
                ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-medium">Live</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm font-medium">Paused</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Chart */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlowCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Real-time Metrics
                </h2>
                <p className="text-sm text-muted-foreground">Live engagement and focus tracking</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-2xl font-bold text-cyan-400">{avgEngagement.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-400">{avgFocus.toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">Focus</p>
                </div>
              </div>
            </div>

            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <defs>
                    <linearGradient id="liveEngagement" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="liveFocus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis 
                    domain={[0, 100]} 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 10 }}
                  />
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass-card px-4 py-3 rounded-xl">
                            {payload.map((entry: any, i: number) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
                                <span className="text-xs text-muted-foreground capitalize">{entry.dataKey}:</span>
                                <span className="text-xs font-semibold text-foreground">{entry.value.toFixed(1)}%</span>
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
                    fill="url(#liveEngagement)"
                    animationDuration={300}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="focus" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    fill="url(#liveFocus)"
                    animationDuration={300}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Chart Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                <span className="text-sm text-muted-foreground">Engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                <span className="text-sm text-muted-foreground">Focus</span>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Emotion Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlowCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                Live Emotions
              </h2>
              <span className="text-xs text-muted-foreground">
                {students.length} students
              </span>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {emotions.map((item, idx) => {
                  const config = EMOTION_CONFIG[item.emotion as keyof typeof EMOTION_CONFIG] || EMOTION_CONFIG.Neutral;
                  
                  return (
                    <motion.div
                      key={item.emotion}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`p-3 rounded-xl ${config.bg} border ${config.border}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${config.text}`}>{item.emotion}</span>
                          {item.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                          {item.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{item.count} students</span>
                          <span className={`font-mono font-semibold ${config.text}`}>
                            {item.percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ 
                            background: config.color,
                            boxShadow: `0 0 10px ${config.color}50`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* AI Alert */}
            <motion.div
              className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-400 mb-1">AI Alert</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    4 students showing confusion. Consider a brief recap of the last concept.
                  </p>
                </div>
              </div>
            </motion.div>
          </GlowCard>
        </motion.div>
      </div>

      {/* Student Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlowCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                Student Feed
              </h2>
              <p className="text-sm text-muted-foreground">Individual emotion detection</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Processing</span>
              <PulsingDot color="cyan" size="sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <AnimatePresence mode="popLayout">
              {students.map((student, idx) => {
                const config = EMOTION_CONFIG[student.emotion as keyof typeof EMOTION_CONFIG] || EMOTION_CONFIG.Neutral;
                
                return (
                  <motion.div
                    key={student.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: idx * 0.02 }}
                    className={`p-3 rounded-xl ${config.bg} border ${config.border} text-center relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform`}
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-secondary/50 flex items-center justify-center text-foreground font-bold text-sm">
                      {student.name.charAt(0)}
                    </div>
                    
                    {/* Name */}
                    <p className="text-xs font-medium text-foreground truncate mb-1">
                      {student.name}
                    </p>
                    
                    {/* Emotion */}
                    <p className={`text-[10px] font-semibold ${config.text}`}>
                      {student.emotion}
                    </p>
                    
                    {/* Confidence indicator */}
                    <div className="mt-2 h-1 bg-secondary/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: config.color }}
                        animate={{ width: `${student.confidence * 100}%` }}
                      />
                    </div>
                    
                    {/* ID badge */}
                    <span className="absolute top-1 right-1 text-[8px] text-muted-foreground font-mono">
                      {student.id}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </GlowCard>
      </motion.div>
    </div>
  );
}
