// Design Philosophy: Sci-Fi Holographic Minimalism
// Glass morphism egg cards with precise geometry and neon accents

import { RARITY_COLORS } from '@/data/gameData';
import { useGame } from '@/contexts/GameContext';
import { EggType, Pet } from '@/types/game';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { toast } from 'sonner';

interface EggCardProps {
  egg: EggType;
  isLocked?: boolean;
}

export default function EggCard({ egg, isLocked = false }: EggCardProps) {
  const { gameState, spendCoins, addPet, updateMission } = useGame();
  const [isOpening, setIsOpening] = useState(false);
  const [revealedPets, setRevealedPets] = useState<Pet[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);

  const canAfford = gameState.coins >= egg.cost * quantity;
  const rarityColor = RARITY_COLORS[egg.rarity];

  const openEgg = (count: number) => {
    if (isLocked) {
      toast.error('Este ovo ainda está bloqueado!');
      return;
    }

    const totalCost = egg.cost * count;
    if (!canAfford) {
      toast.error('Moedas insuficientes!');
      return;
    }

    if (!spendCoins(totalCost)) {
      return;
    }

    setIsOpening(true);
    setShowQuantitySelector(false);
    const newPets: Pet[] = [];

    // Simulate egg opening delay
    setTimeout(() => {
      for (let i = 0; i < count; i++) {
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
        const pet: Pet = {
          id: nanoid(),
          name: selectedPet.name,
          rarity: selectedPet.rarity,
          class: selectedPet.class,
          multiplier: selectedPet.multiplier,
          weight: selectedPet.weight,
          image: egg.image,
          acquiredAt: Date.now(),
          level: 1,
          ascensionLevel: 0,
        };

        addPet(pet);
        newPets.push(pet);
      }

      setRevealedPets(newPets);

      // Update missions
      updateMission('collect-3-pets', count);
      updateMission('open-5-eggs', count);

      // Show success toast
      const secretCount = newPets.filter(p => p.rarity === 'secret').length;
      if (secretCount > 0) {
        toast.success(`🎉 Você obteve ${secretCount} pet(s) secreto(s)!`, {
          description: newPets.map(p => p.name).join(', '),
        });
      } else {
        toast.success(`Você obteve ${count} pet(s)!`, {
          description: newPets.map(p => `${p.name} (${p.multiplier}x)`).join(', '),
        });
      }

      // Reset after showing pets
      setTimeout(() => {
        setIsOpening(false);
        setRevealedPets([]);
        setQuantity(1);
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
          onClick={() => setShowQuantitySelector(true)}
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

      {/* Quantity selector modal */}
      <AnimatePresence>
        {showQuantitySelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
            onClick={() => setShowQuantitySelector(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="glass-panel rounded-2xl p-8 max-w-sm mx-4"
              style={{
                borderColor: rarityColor.border,
                boxShadow: `0 0 40px ${rarityColor.glow}66`,
              }}
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-heading)] tracking-wide">
                Quantos ovos?
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between bg-muted rounded-lg p-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-background rounded-lg font-bold hover:brightness-110"
                  >
                    −
                  </button>
                  <span className="text-3xl font-bold text-[oklch(0.7_0.2_195)] font-[family-name:var(--font-mono)]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(100, quantity + 1))}
                    className="w-10 h-10 bg-background rounded-lg font-bold hover:brightness-110"
                  >
                    +
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-muted-foreground mb-1">Custo Total</p>
                  <p className="text-3xl font-bold text-[oklch(0.7_0.2_195)] font-[family-name:var(--font-mono)]">
                    {(egg.cost * quantity).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Você tem: {gameState.coins.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowQuantitySelector(false)}
                  className="flex-1 py-3 bg-muted text-foreground rounded-lg font-bold hover:brightness-110"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => openEgg(quantity)}
                  disabled={!canAfford}
                  className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${
                    canAfford
                      ? 'bg-[oklch(0.7_0.2_195)] text-background hover:brightness-110'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  Abrir
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pet reveal modal */}
      <AnimatePresence>
        {revealedPets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="glass-panel rounded-2xl p-8 max-w-2xl w-full"
              style={{
                borderColor: rarityColor.border,
                boxShadow: `0 0 40px ${rarityColor.glow}66`,
              }}
            >
              <h2 className="text-3xl font-bold text-center mb-6 font-[family-name:var(--font-heading)] tracking-wide">
                Pets Obtidos!
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {revealedPets.map((pet, index) => {
                  const petRarityColor = RARITY_COLORS[pet.rarity];
                  return (
                    <motion.div
                      key={pet.id}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-panel rounded-lg p-4 text-center"
                      style={{
                        borderColor: petRarityColor.border,
                        boxShadow: `0 0 20px ${petRarityColor.glow}33`,
                      }}
                    >
                      <motion.img
                        src={pet.image}
                        alt={pet.name}
                        className="w-16 h-16 mx-auto object-contain mb-2"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <p className="text-sm font-bold text-foreground truncate">
                        {pet.name}
                      </p>
                      <p 
                        className="text-xs font-bold font-[family-name:var(--font-mono)]"
                        style={{ color: petRarityColor.glow }}
                      >
                        {pet.multiplier}x
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
