'use client';

import { Bell, Search, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function Header() {
  const [user, setUser] = useState<{name: string, role: string} | null>(null);

  useEffect(() => {
    const userStr = Cookies.get('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 z-10 relative">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-64 max-w-md hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-background border border-border rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-border pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-muted-foreground mt-1 capitalize">{user?.role || 'Administrator'}</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
          </div>
        </div>
      </div>
    </header>
  );
}
