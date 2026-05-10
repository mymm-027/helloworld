'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Users, Zap, Brain, Video, Focus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';

// Mock real-time data generator
const generateLiveData = () => {
  return Array.from({ length: 20 }).map((_, i) => ({
    time: i,
    engagement: 60 + Math.random() * 30,
    focus: 65 + Math.random() * 25,
  }));
};

export default function LiveMonitor() {
  const [data, setData] = useState(generateLiveData());
  const [currentEmotions, setCurrentEmotions] = useState([
    { emotion: 'Neutral', percentage: 45, color: 'bg-slate-500' },
    { emotion: 'Focused', percentage: 35, color: 'bg-blue-500' },
    { emotion: 'Confused', percentage: 12, color: 'bg-orange-500' },
    { emotion: 'Bored', percentage: 8, color: 'bg-red-500' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: prev[prev.length - 1].time + 1,
          engagement: 60 + Math.random() * 30,
          focus: 65 + Math.random() * 25,
        });
        return newData;
      });
      
      setCurrentEmotions([
        { emotion: 'Neutral', percentage: 40 + Math.random() * 10, color: 'bg-slate-500' },
        { emotion: 'Focused', percentage: 30 + Math.random() * 10, color: 'bg-blue-500' },
        { emotion: 'Confused', percentage: 10 + Math.random() * 5, color: 'bg-orange-500' },
        { emotion: 'Bored', percentage: 5 + Math.random() * 5, color: 'bg-red-500' },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
          <h1 className="text-3xl font-bold tracking-tight">Live Monitor</h1>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2">
          <Video size={16} />
          CS101 - Intro to Programming
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Real-time Engagement & Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[0, 100]} />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="engagement" stroke="#3b82f6" strokeWidth={3} dot={false} animationDuration={300} />
                  <Line type="monotone" dataKey="focus" stroke="#8b5cf6" strokeWidth={3} dot={false} animationDuration={300} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Live Emotion State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 mt-4">
              <AnimatePresence>
                {currentEmotions.map((item, idx) => (
                  <motion.div 
                    key={item.emotion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm font-medium">
                      <span>{item.emotion}</span>
                      <span>{item.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${item.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                AI Insight
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The class is highly engaged right now. Focus levels peaked 2 minutes ago when you introduced the new concept. Proceeding with the Q&A session is recommended.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
