// Design Philosophy: Sci-Fi Holographic Minimalism
// Grid-based pet inventory with rarity-based visual hierarchy

import { RARITY_COLORS } from '@/data/gameData';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { Sparkles, Package } from 'lucide-react';

export default function PetInventory() {
  const { gameState } = useGame();

  if (gameState.pets.length === 0) {
    return (
      <div className="glass-panel rounded-lg p-8 text-center">
        <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg text-muted-foreground">
          Você ainda não possui pets
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Compre ovos para começar sua coleção!
        </p>
      </div>
    );
  }

  // Sort pets by rarity and multiplier
  const sortedPets = [...gameState.pets].sort((a, b) => {
    const rarityOrder = { common: 0, rare: 1, epic: 2, legendary: 3, secret: 4 };
    const rarityDiff = rarityOrder[b.rarity] - rarityOrder[a.rarity];
    if (rarityDiff !== 0) return rarityDiff;
    return b.multiplier - a.multiplier;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] tracking-wide">
          Meus Pets ({gameState.pets.length})
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {sortedPets.map((pet, index) => {
          const rarityColor = RARITY_COLORS[pet.rarity];
          
          return (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-panel rounded-lg p-3 relative overflow-hidden group cursor-pointer"
              style={{
                borderColor: rarityColor.border,
                boxShadow: `0 0 15px ${rarityColor.glow}25`,
              }}
            >
              {/* Background glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${rarityColor.bg} 0%, transparent 70%)`,
                }}
              />

              {/* Pet image */}
              <div className="relative z-10 mb-2">
                <motion.img
                  src={pet.image}
                  alt={pet.name}
                  className="w-20 h-20 mx-auto object-contain"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Pet info */}
              <div className="relative z-10 space-y-1">
                <h3 className="text-sm font-bold text-foreground text-center truncate">
                  {pet.name}
                </h3>

                <div className="flex items-center justify-center gap-1">
                  <Sparkles 
                    className="w-3 h-3" 
                    style={{ color: rarityColor.glow }} 
                  />
                  <span 
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: rarityColor.glow }}
                  >
                    {pet.rarity}
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-xs text-muted-foreground">Mult: </span>
                  <span 
                    className="text-sm font-bold font-[family-name:var(--font-mono)]"
                    style={{ color: rarityColor.glow }}
                  >
                    {pet.multiplier}x
                  </span>
                </div>

                {pet.ability && (
                  <div className="mt-2 p-1.5 bg-black/40 rounded border border-[oklch(0.7_0.2_45_/_0.3)]">
                    <p className="text-[10px] leading-tight text-orange-300 font-semibold italic">
                      ✨ {pet.ability.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Scan lines */}
              <div className="absolute inset-0 scan-lines opacity-20 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
