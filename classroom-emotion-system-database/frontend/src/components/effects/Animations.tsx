'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({ 
  value, 
  suffix = '', 
  prefix = '',
  decimals = 0,
  className = ''
}: AnimatedCounterProps) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      {prefix}{value.toFixed(decimals)}{suffix}
    </motion.span>
  );
}

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerChildren({ 
  children, 
  className = '',
  staggerDelay = 0.1
}: StaggerChildrenProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'emerald' | 'amber';
  hover?: boolean;
}

export function GlowCard({ 
  children, 
  className = '',
  glowColor = 'cyan',
  hover = true
}: GlowCardProps) {
  const glowStyles = {
    cyan: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]',
    emerald: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]',
    amber: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]',
  };

  return (
    <motion.div
      className={`
        glass-card rounded-xl overflow-hidden
        ${hover ? glowStyles[glowColor] : ''}
        transition-all duration-500
        ${className}
      `}
      whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

interface PulsingDotProps {
  color?: 'cyan' | 'emerald' | 'amber' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

export function PulsingDot({ color = 'cyan', size = 'md' }: PulsingDotProps) {
  const colorStyles = {
    cyan: 'bg-cyan-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    red: 'bg-red-500',
  };

  const sizeStyles = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <span className="relative flex">
      <span 
        className={`
          animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
          ${colorStyles[color]}
        `}
      />
      <span 
        className={`
          relative inline-flex rounded-full
          ${colorStyles[color]} ${sizeStyles[size]}
        `}
      />
    </span>
  );
}

interface AnimatedProgressProps {
  value: number;
  max?: number;
  color?: 'cyan' | 'emerald' | 'amber' | 'red';
  showLabel?: boolean;
  height?: string;
}

export function AnimatedProgress({ 
  value, 
  max = 100,
  color = 'cyan',
  showLabel = false,
  height = 'h-2'
}: AnimatedProgressProps) {
  const percentage = (value / max) * 100;
  
  const gradients = {
    cyan: 'from-cyan-500 to-cyan-400',
    emerald: 'from-emerald-500 to-emerald-400',
    amber: 'from-amber-500 to-amber-400',
    red: 'from-red-500 to-red-400',
  };

  const glows = {
    cyan: 'shadow-[0_0_10px_rgba(6,182,212,0.5)]',
    emerald: 'shadow-[0_0_10px_rgba(34,197,94,0.5)]',
    amber: 'shadow-[0_0_10px_rgba(245,158,11,0.5)]',
    red: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-mono text-foreground">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className={`w-full ${height} bg-secondary rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${gradients[color]} ${glows[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function TypewriterText({ text, className = '', speed = 50 }: TypewriterTextProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * (speed / 1000) }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingElement({ children, className = '', delay = 0 }: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
