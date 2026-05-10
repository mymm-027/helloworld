'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '@/services/api';
import Cookies from 'js-cookie';
import { 
  Activity, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles,
  Brain,
  Zap,
  Shield
} from 'lucide-react';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { GlowCard, PulsingDot } from '@/components/effects/Animations';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@edupulse.ai');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      Cookies.set('token', response.data.access_token);
      Cookies.set('user', JSON.stringify(response.data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Brain, text: 'AI-Powered Emotion Detection', delay: 0.2 },
    { icon: Zap, text: 'Real-time Analytics', delay: 0.3 },
    { icon: Shield, text: 'Enterprise Security', delay: 0.4 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left side - Branding */}
        <motion.div 
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center gap-3 justify-center lg:justify-start mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center glow-cyan">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <motion.div 
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">EduPulse</h1>
              <p className="text-xs text-muted-foreground font-mono tracking-wider">INTELLIGENCE PLATFORM</p>
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Transform Your
            <br />
            <span className="gradient-text">Classroom Experience</span>
          </motion.h2>

          <motion.p 
            className="text-lg text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Harness the power of AI to understand student emotions and optimize learning outcomes in real-time.
          </motion.p>

          <motion.div 
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.text}
                className="flex items-center gap-3 justify-center lg:justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: feature.delay + 0.3 }}
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-sm text-muted-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Login form */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlowCard className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.4 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/20"
              >
                <Shield className="w-8 h-8 text-cyan-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h3>
              <p className="text-sm text-muted-foreground">Sign in to access your dashboard</p>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  Email
                  {focusedField === 'email' && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-xs text-cyan-400"
                    >
                      Active
                    </motion.span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full h-12 px-4 rounded-xl
                      bg-secondary/50 border
                      text-foreground placeholder:text-muted-foreground
                      focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                      transition-all duration-300
                      ${focusedField === 'email' ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'border-border'}
                    `}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    Password
                    {focusedField === 'password' && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-xs text-cyan-400"
                      >
                        Active
                      </motion.span>
                    )}
                  </label>
                  <button
                    type="button"
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full h-12 px-4 pr-12 rounded-xl
                      bg-secondary/50 border
                      text-foreground placeholder:text-muted-foreground
                      focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                      transition-all duration-300
                      ${focusedField === 'password' ? 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'border-border'}
                    `}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={loading}
                className={`
                  w-full h-12 rounded-xl font-semibold
                  bg-gradient-to-r from-cyan-500 to-cyan-600
                  text-white
                  flex items-center justify-center gap-2
                  transition-all duration-300
                  hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <PulsingDot color="emerald" size="sm" />
                <span>System Status: All Services Operational</span>
              </div>
            </div>
          </GlowCard>

          {/* Demo credentials hint */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-xs text-muted-foreground">
              Demo credentials pre-filled for testing
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
}
