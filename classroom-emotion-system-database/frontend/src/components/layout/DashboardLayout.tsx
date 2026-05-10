'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { GradientOrbs, GridBackground } from '@/components/effects/AnimatedBackground';

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Background effects */}
      <div className="fixed inset-0 animated-gradient-bg" style={{ zIndex: -2 }} />
      <GridBackground />
      <GradientOrbs />
      
      {/* Main layout */}
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
