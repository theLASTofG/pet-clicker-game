// Design Philosophy: Sci-Fi Holographic Minimalism
// Glass morphism egg cards with precise geometry and neon accents

import { RARITY_COLORS } from '@/data/gameData';
import { useGame } from '@/contexts/GameContext';
import { EggType, Pet } from '@/types/game';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { toast } from 'sonner';

interface EggCardProps {
  egg: EggType;
  isLocked?: boolean;
}

export default function EggCard({ egg, isLocked = false }: EggCardProps) {
  const { gameState, spendCoins, addPet } = useGame();
  const [isOpening, setIsOpening] = useState(false);
  const [revealedPet, setRevealedPet] = useState<Pet | null>(null);

  const canAfford = gameState.coins >= egg.cost;
  const rarityColor = RARITY_COLORS[egg.rarity];

  const openEgg = () => {
    if (isLocked) {
      toast.error('Este ovo ainda está bloqueado!');
      return;
    }

    if (!canAfford) {
      toast.error('Moedas insuficientes!');
      return;
    }

    if (!spendCoins(egg.cost)) {
      return;
    }

    setIsOpening(true);

    // Simulate egg opening delay
    setTimeout(() => {
      // Roll for pet based on drop chances
      const roll = Math.random();
      let cumulativeChance = 0;
      let selectedPet = egg.petPool[0];

      for (const petTemplate of egg.petPool) {
        cumulativeChance += petTemplate.dropChance;
        if (roll <= cumulativeChance) {
          selectedPet = petTemplate;
          break;
        }
      }

      // Create pet instance
      const newPet: Pet = {
        id: nanoid(),
        name: selectedPet.name,
        rarity: selectedPet.rarity,
        multiplier: selectedPet.multiplier,
        image: egg.image,
        acquiredAt: Date.now(),
      };

      addPet(newPet);
      setRevealedPet(newPet);

      // Show success toast
      toast.success(`Você obteve: ${newPet.name}!`, {
        description: `Multiplicador: ${newPet.multiplier}x`,
      });

      // Reset after showing pet
      setTimeout(() => {
        setIsOpening(false);
        setRevealedPet(null);
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <motion.div
        whileHover={!isLocked && canAfford ? { scale: 1.05, y: -5 } : {}}
        className="relative"
      >
        <button
          onClick={openEgg}
          disabled={isLocked || !canAfford || isOpening}
          className="relative w-full glass-panel rounded-lg p-4 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
          style={{
            borderColor: rarityColor.border,
            boxShadow: `0 0 20px ${rarityColor.glow}33`,
          }}
        >
          {/* Background glow */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at center, ${rarityColor.bg} 0%, transparent 70%)`,
            }}
          />

          {/* Egg image */}
          <div className="relative z-10 mb-3">
            <motion.img
              src={egg.image}
              alt={egg.name}
              className="w-24 h-24 mx-auto object-contain drop-shadow-lg"
              animate={!isLocked && canAfford ? { y: [0, -5, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Info */}
          <div className="relative z-10 space-y-2">
            <h3 className="text-lg font-bold text-foreground font-[family-name:var(--font-heading)] tracking-wide">
              {egg.name}
            </h3>
            
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: rarityColor.glow }} />
              <span 
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: rarityColor.glow }}
              >
                {egg.rarity}
              </span>
            </div>

            <div className="text-2xl font-bold text-[oklch(0.7_0.2_195)] font-[family-name:var(--font-mono)]">
              {egg.cost.toLocaleString()}
            </div>
          </div>

          {/* Locked overlay */}
          {isLocked && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-lg z-20">
              <span className="text-lg font-bold text-muted-foreground">🔒 BLOQUEADO</span>
            </div>
          )}

          {/* Opening animation overlay */}
          {isOpening && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center rounded-lg z-20">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-12 h-12 text-[oklch(0.7_0.2_195)]" />
              </motion.div>
            </div>
          )}
        </button>
      </motion.div>

      {/* Pet reveal modal */}
      <AnimatePresence>
        {revealedPet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="glass-panel rounded-2xl p-8 max-w-md mx-4"
              style={{
                borderColor: RARITY_COLORS[revealedPet.rarity].border,
                boxShadow: `0 0 40px ${RARITY_COLORS[revealedPet.rarity].glow}66`,
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <img
                  src={revealedPet.image}
                  alt={revealedPet.name}
                  className="w-40 h-40 mx-auto object-contain mb-4"
                />
              </motion.div>

              <h2 className="text-3xl font-bold text-center mb-2 font-[family-name:var(--font-heading)] tracking-wide">
                {revealedPet.name}
              </h2>

              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles 
                  className="w-5 h-5" 
                  style={{ color: RARITY_COLORS[revealedPet.rarity].glow }} 
                />
                <span 
                  className="text-lg font-semibold uppercase tracking-wider"
                  style={{ color: RARITY_COLORS[revealedPet.rarity].glow }}
                >
                  {revealedPet.rarity}
                </span>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-2">Multiplicador de Ganho</p>
                <p className="text-4xl font-bold text-[oklch(0.7_0.2_195)] font-[family-name:var(--font-mono)]">
                  {revealedPet.multiplier}x
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
