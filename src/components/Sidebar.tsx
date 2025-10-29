import { motion } from 'motion/react';
import { Compass, RefreshCw, TrendingUp, BarChart3, Settings } from 'lucide-react';
import { cn } from './ui/utils';

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
}

const menuItems = [
  { id: 'lead-generation', label: 'Lead Generation', icon: Compass, hasInsights: true },
  { id: 'renewals', label: 'Renewals', icon: RefreshCw, hasInsights: false },
  { id: 'unmanaged-accounts', label: 'Top Unmanaged Accounts', icon: TrendingUp, hasInsights: true },
  { id: 'growth', label: 'Growth at Scale', icon: BarChart3, hasInsights: false },
  { id: 'settings', label: 'Settings', icon: Settings, hasInsights: false },
];

export function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-purple-700 to-purple-900 border-r border-purple-300 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-purple-400/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-lg">
            <span className="text-purple-700 text-xl">S</span>
          </div>
          <div>
            <h1 className="text-white">SignalX</h1>
            <p className="text-purple-200 text-xs">Agentic AI Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative group',
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-purple-100 hover:bg-white/10 hover:text-white'
              )}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-500 rounded-r-full"
                  style={{
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)',
                  }}
                />
              )}

              <div className="relative">
                <Icon className="w-5 h-5" />
                
                {/* Pulse glow for new insights */}
                {item.hasInsights && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    style={{
                      boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)',
                    }}
                  />
                )}
              </div>

              <span className="flex-1 text-left text-sm">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-purple-400/30">
        <p className="text-purple-200/70 text-xs text-center">
          v1.0 Agentic AI Platform
        </p>
      </div>
    </div>
  );
}
