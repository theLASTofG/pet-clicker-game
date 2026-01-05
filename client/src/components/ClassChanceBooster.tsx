// Design Philosophy: Sci-Fi Holographic Minimalism
// Class chance booster interface

import { PET_CLASSES } from '@/data/gameData';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { Dice6, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function ClassChanceBooster() {
  const { gameState, upgradeLevel } = useGame();

  const classChanceBoostLevel = gameState.upgrades.find(u => u.id === 'class-chance-boost')?.level || 0;
  const boostMultiplier = 1 + classChanceBoostLevel * 0.05;

  const handleUpgradeClassChance = () => {
    const success = upgradeLevel('class-chance-boost');
    if (success) {
      toast.success('Amplificador de Classe atualizado!');
    } else {
      toast.error('Moedas insuficientes ou nível máximo atingido!');
    }
  };

  return (
    <div className="glass-panel rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Dice6 className="w-6 h-6 text-[oklch(0.7_0.2_45)]" />
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] tracking-wide">
          Chances de Classes
        </h2>
      </div>

      {/* Boost info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-lg p-4 border-2 border-[oklch(0.7_0.2_45_/_0.3)]"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[oklch(0.7_0.2_45)]" />
            <span className="font-bold">Amplificador Ativo</span>
          </div>
          <span className="text-2xl font-bold text-[oklch(0.7_0.2_45)] font-[family-name:var(--font-mono)]">
            {(boostMultiplier * 100).toFixed(0)}%
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Nível: {classChanceBoostLevel}/20
        </p>
        <button
          onClick={handleUpgradeClassChance}
          disabled={classChanceBoostLevel >= 20}
          className={`w-full py-2 rounded-lg font-bold transition-all ${
            classChanceBoostLevel >= 20
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-[oklch(0.7_0.2_45)] text-background hover:brightness-110'
          }`}
        >
          {classChanceBoostLevel >= 20 ? 'MÁXIMO' : 'MELHORAR'}
        </button>
      </motion.div>

      {/* Class chances grid */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {Object.entries(PET_CLASSES).map(([classKey, classData], index) => {
          const baseChance = classData.baseChance;
          const boostedChance = baseChance * boostMultiplier;
          const percentage = (boostedChance * 100).toFixed(3);

          return (
            <motion.div
              key={classKey}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-panel rounded-lg p-3 border-l-4"
              style={{ borderLeftColor: classData.color }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{classData.emoji}</span>
                  <div>
                    <p className="font-bold text-foreground">{classData.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Base: {(baseChance * 100).toFixed(3)}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold font-[family-name:var(--font-mono)]" style={{ color: classData.color }}>
                    {percentage}%
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(boostedChance * 10000, 100)}%` }}
                  className="h-full"
                  style={{
                    background: `linear-gradient(90deg, ${classData.color}, ${classData.color}dd)`,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
