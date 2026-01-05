// Design Philosophy: Sci-Fi Holographic Minimalism
// Daily missions tracker with rewards

import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';
import { toast } from 'sonner';

export default function DailyMissions() {
  const { gameState, completeMission } = useGame();

  const handleClaimReward = (missionId: string) => {
    completeMission(missionId);
    toast.success('Recompensa reclamada!');
  };

  const getMissionIcon = (type: string) => {
    switch (type) {
      case 'clicks':
        return '🖱️';
      case 'coins':
        return '💰';
      case 'pets':
        return '🐾';
      case 'eggs':
        return '🥚';
      default:
        return '⭐';
    }
  };

  return (
    <div className="glass-panel rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-[oklch(0.7_0.2_45)]" />
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] tracking-wide">
          Missões Diárias
        </h2>
      </div>

      <div className="space-y-3">
        {gameState.missions.map((mission, index) => {
          const progress = (mission.current / mission.target) * 100;
          const isCompleted = mission.completed;

          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-panel rounded-lg p-4 border-2 transition-all ${
                isCompleted
                  ? 'border-[oklch(0.75_0.2_145_/_0.5)] bg-[oklch(0.75_0.2_145_/_0.05)]'
                  : 'border-[oklch(0.7_0.2_195_/_0.3)]'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-2xl mt-1">{getMissionIcon(mission.type)}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">
                      {mission.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {mission.description}
                    </p>
                  </div>
                </div>

                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-[oklch(0.75_0.2_145)]" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground" />
                )}
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">
                    {mission.current}/{mission.target}
                  </span>
                  <span className="text-xs font-bold text-[oklch(0.7_0.2_195)]">
                    +{mission.reward} moedas
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    className="h-full bg-gradient-to-r from-[oklch(0.7_0.2_195)] to-[oklch(0.7_0.2_45)]"
                  />
                </div>
              </div>

              {/* Claim button */}
              {isCompleted && !mission.completedAt && (
                <button
                  onClick={() => handleClaimReward(mission.id)}
                  className="w-full py-2 bg-[oklch(0.75_0.2_145)] text-background font-bold rounded-lg hover:brightness-110 transition-all"
                >
                  RECLAMAR RECOMPENSA
                </button>
              )}

              {mission.completedAt && (
                <div className="text-center text-sm text-[oklch(0.75_0.2_145)] font-bold">
                  ✓ Concluída
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
