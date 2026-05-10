'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  Database,
  Shield,
  Camera,
  Save,
  ChevronRight
} from 'lucide-react';
import { GlowCard } from '@/components/effects/Animations';
import { Button } from '@/components/ui/button';

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    description: 'Manage your account information',
    icon: User,
    color: 'cyan',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure alert preferences',
    icon: Bell,
    color: 'emerald',
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Password and authentication',
    icon: Lock,
    color: 'amber',
  },
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Customize the interface',
    icon: Palette,
    color: 'rose',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connected services and APIs',
    icon: Globe,
    color: 'cyan',
  },
  {
    id: 'data',
    title: 'Data & Privacy',
    description: 'Manage your data preferences',
    icon: Database,
    color: 'emerald',
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Admin User',
    email: 'admin@edupulse.ai',
    role: 'Administrator',
    notifications: {
      email: true,
      push: true,
      alerts: true,
    },
    theme: 'dark',
    language: 'en',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and application preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlowCard className="p-2">
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{section.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{section.description}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeSection === section.id ? 'rotate-90' : ''}`} />
                </button>
              ))}
            </nav>
          </GlowCard>
        </motion.div>

        {/* Content */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlowCard className="p-6">
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Profile Settings</h2>
                  <p className="text-sm text-muted-foreground">Update your personal information</p>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold">
                      A
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center hover:bg-cyan-600 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{formData.name}</p>
                    <p className="text-sm text-muted-foreground">{formData.role}</p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                    <select
                      value={formData.role}
                      className="w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    >
                      <option>Administrator</option>
                      <option>Lecturer</option>
                      <option>Analyst</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Language</label>
                    <select
                      value={formData.language}
                      className="w-full h-10 px-4 rounded-xl bg-secondary/50 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    >
                      <option value="en">English</option>
                      <option value="ar">Arabic</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Notification Settings</h2>
                  <p className="text-sm text-muted-foreground">Configure how you receive alerts</p>
                </div>

                <div className="space-y-4">
                  {[
                    { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                    { id: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
                    { id: 'alerts', label: 'Real-time Alerts', desc: 'Live classroom alerts' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setFormData({
                          ...formData,
                          notifications: {
                            ...formData.notifications,
                            [item.id]: !formData.notifications[item.id as keyof typeof formData.notifications]
                          }
                        })}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          formData.notifications[item.id as keyof typeof formData.notifications]
                            ? 'bg-cyan-500'
                            : 'bg-secondary'
                        }`}
                      >
                        <motion.div
                          className="w-5 h-5 rounded-full bg-white shadow-lg"
                          animate={{
                            x: formData.notifications[item.id as keyof typeof formData.notifications] ? 26 : 2
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">Security Settings</h2>
                  <p className="text-sm text-muted-foreground">Manage your password and security preferences</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Change Password</p>
                        <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Button variant="glow" size="sm">Enable</Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Active Sessions</p>
                        <p className="text-sm text-muted-foreground">Manage your logged-in devices</p>
                      </div>
                      <Button variant="outline" size="sm">View All</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(activeSection === 'appearance' || activeSection === 'integrations' || activeSection === 'data') && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  This section is under development. Check back soon for new features and customization options.
                </p>
              </div>
            )}
          </GlowCard>
        </motion.div>
      </div>
    </div>
  );
}
