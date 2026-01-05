// Design Philosophy: Sci-Fi Holographic Minimalism
// Display best pet with class and weight info

import { PET_CLASSES, RARITY_COLORS } from '@/data/gameData';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { Award, Zap } from 'lucide-react';
import { useMemo } from 'react';

export default function BestPetDisplay() {
  const { gameState } = useGame();

  const bestPet = useMemo(() => {
    if (gameState.pets.length === 0) return null;
    
    // Find pet with highest multiplier
    return gameState.pets.reduce((best, current) => {
      const currentScore = current.multiplier * current.weight * (1 + current.ascensionLevel * 0.1);
      const bestScore = best.multiplier * best.weight * (1 + best.ascensionLevel * 0.1);
      return currentScore > bestScore ? current : best;
    });
  }, [gameState.pets]);

  if (!bestPet) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel rounded-lg p-6 border-2 border-[oklch(0.75_0.2_145_/_0.3)] text-center"
      >
        <Award className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
        <p className="text-muted-foreground">Nenhum pet coletado ainda</p>
      </motion.div>
    );
  }

  const classData = PET_CLASSES[bestPet.class];
  const rarityColor = RARITY_COLORS[bestPet.rarity];
  const score = bestPet.multiplier * bestPet.weight * (1 + bestPet.ascensionLevel * 0.1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel rounded-lg p-6 border-2"
      style={{
        borderColor: rarityColor.border,
        boxShadow: `0 0 30px ${rarityColor.glow}44`,
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-6 h-6" style={{ color: rarityColor.glow }} />
        <h3 className="text-xl font-bold font-[family-name:var(--font-heading)]">
          Melhor Pet
        </h3>
      </div>

      {/* Pet image and name */}
      <div className="text-center mb-6">
        <motion.img
          src={bestPet.image}
          alt={bestPet.name}
          className="w-24 h-24 mx-auto object-contain mb-3 drop-shadow-lg"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {bestPet.name}
        </h2>
        <div className="flex items-center justify-center gap-2">
          <span
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: classData.color }}
          >
            {classData.emoji} {classData.name}
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-muted rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Multiplicador</p>
          <p className="text-2xl font-bold text-[oklch(0.7_0.2_195)] font-[family-name:var(--font-mono)]">
            {bestPet.multiplier}x
          </p>
        </div>

        <div className="bg-muted rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Peso</p>
          <p className="text-2xl font-bold text-[oklch(0.7_0.2_45)] font-[family-name:var(--font-mono)]">
            {bestPet.weight}
          </p>
        </div>

        <div className="bg-muted rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Nível</p>
          <p className="text-2xl font-bold text-[oklch(0.65_0.25_320)] font-[family-name:var(--font-mono)]">
            {bestPet.level}
          </p>
        </div>

        <div className="bg-muted rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Ascensão</p>
          <p className="text-2xl font-bold text-[oklch(0.75_0.2_145)] font-[family-name:var(--font-mono)]">
            +{bestPet.ascensionLevel}
          </p>
        </div>
      </div>

      {/* Rarity badge */}
      <div className="mb-6 p-3 rounded-lg text-center" style={{ background: rarityColor.bg }}>
        <p className="text-xs text-muted-foreground mb-1">Raridade</p>
        <p
          className="text-lg font-bold uppercase tracking-wider"
          style={{ color: rarityColor.glow }}
        >
          {bestPet.rarity}
        </p>
      </div>

      {/* Power score */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[oklch(0.7_0.2_45)]" />
          <span className="font-bold">Poder Total</span>
        </div>
        <span className="text-2xl font-bold text-[oklch(0.7_0.2_45)] font-[family-name:var(--font-mono)]">
          {score.toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
}
