// Design Philosophy: Sci-Fi Holographic Minimalism
// Idle income counter display

import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function IdleCounter() {
  const { gameState, calculateClickPower } = useGame();
  const [idleIncome, setIdleIncome] = useState(0);

  useEffect(() => {
    const passiveIncomeUpgrade = gameState.upgrades.find(u => u.id === 'passive-income');
    if (!passiveIncomeUpgrade || passiveIncomeUpgrade.level === 0) {
      setIdleIncome(0);
      return;
    }

    const clickPower = calculateClickPower();
    const income = clickPower * (passiveIncomeUpgrade.level * 0.01);
    setIdleIncome(income);
  }, [gameState.pets, gameState.upgrades, calculateClickPower]);

  if (idleIncome === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40"
    >
      <div className="glass-panel rounded-lg px-6 py-3 flex items-center gap-3 border-2 border-[oklch(0.75_0.2_145_/_0.5)]">
        <TrendingUp className="w-5 h-5 text-[oklch(0.75_0.2_145)]" />
        <div>
          <p className="text-xs text-muted-foreground">Ganho Passivo</p>
          <motion.p
            key={idleIncome}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-lg font-bold text-[oklch(0.75_0.2_145)] font-[family-name:var(--font-mono)]"
          >
            +{Math.floor(idleIncome)}/s
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
