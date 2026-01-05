// Design Philosophy: Sci-Fi Holographic Minimalism
// Floating stats panels with glass morphism and real-time updates

import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { Coins, MousePointerClick, Zap, Package } from 'lucide-react';

export default function StatsDisplay() {
  const { gameState, calculateClickPower } = useGame();
  const clickPower = calculateClickPower();

  const stats = [
    {
      icon: Coins,
      label: 'Moedas',
      value: gameState.coins.toLocaleString(),
      color: 'oklch(0.7 0.2 195)',
    },
    {
      icon: Zap,
      label: 'Poder/Clique',
      value: clickPower.toLocaleString(),
      color: 'oklch(0.75 0.2 145)',
    },
    {
      icon: MousePointerClick,
      label: 'Total Cliques',
      value: gameState.totalClicks.toLocaleString(),
      color: 'oklch(0.65 0.25 320)',
    },
    {
      icon: Package,
      label: 'Pets',
      value: gameState.pets.length.toString(),
      color: 'oklch(0.7 0.2 45)',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-panel rounded-lg p-4 relative overflow-hidden group"
        >
          {/* Hover glow effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at center, ${stat.color}15 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10 flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{
                backgroundColor: `${stat.color}20`,
                boxShadow: `0 0 15px ${stat.color}30`,
              }}
            >
              <stat.icon 
                className="w-6 h-6" 
                style={{ color: stat.color }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <motion.p 
                key={stat.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-xl font-bold text-foreground font-[family-name:var(--font-mono)] truncate"
              >
                {stat.value}
              </motion.p>
            </div>
          </div>

          {/* Scan lines */}
          <div className="absolute inset-0 scan-lines opacity-20 pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}
