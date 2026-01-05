// Design Philosophy: Sci-Fi Holographic Minimalism
// Achievement tracking with progress bars and milestone indicators

import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { Trophy, Target, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Milestone {
  id: string;
  name: string;
  description: string;
  target: number;
  current: number;
  icon: typeof Trophy;
  color: string;
}

export default function ProgressTracker() {
  const { gameState } = useGame();

  const milestones: Milestone[] = [
    {
      id: 'pets-3',
      name: 'Colecionador Iniciante',
      description: 'Colete 3 pets para desbloquear Ovos Raros',
      target: 3,
      current: gameState.pets.length,
      icon: Target,
      color: 'oklch(0.7 0.2 195)',
    },
    {
      id: 'pets-8',
      name: 'Colecionador Experiente',
      description: 'Colete 8 pets para desbloquear Ovos Épicos',
      target: 8,
      current: gameState.pets.length,
      icon: Trophy,
      color: 'oklch(0.7 0.2 45)',
    },
    {
      id: 'pets-15',
      name: 'Mestre Colecionador',
      description: 'Colete 15 pets para desbloquear Ovos Lendários',
      target: 15,
      current: gameState.pets.length,
      icon: TrendingUp,
      color: 'oklch(0.75 0.2 145)',
    },
  ];

  return (
    <div className="glass-panel rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] tracking-wide mb-4">
        Progresso e Conquistas
      </h3>

      <div className="space-y-4">
        {milestones.map((milestone, index) => {
          const progress = Math.min((milestone.current / milestone.target) * 100, 100);
          const isCompleted = milestone.current >= milestone.target;

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-start gap-3">
                <div 
                  className={`p-2 rounded-lg ${isCompleted ? 'animate-pulse-glow' : ''}`}
                  style={{
                    backgroundColor: `${milestone.color}20`,
                    boxShadow: isCompleted ? `0 0 15px ${milestone.color}50` : 'none',
                  }}
                >
                  <milestone.icon 
                    className="w-5 h-5" 
                    style={{ color: milestone.color }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-foreground">
                      {milestone.name}
                    </h4>
                    <span 
                      className="text-xs font-bold font-[family-name:var(--font-mono)]"
                      style={{ color: milestone.color }}
                    >
                      {milestone.current}/{milestone.target}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {milestone.description}
                  </p>

                  <Progress 
                    value={progress} 
                    className="h-2"
                    style={{
                      '--progress-color': milestone.color,
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
