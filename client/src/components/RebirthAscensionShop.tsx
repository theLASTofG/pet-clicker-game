// Design Philosophy: Sci-Fi Holographic Minimalism
// Rebirth and Ascension shop for advanced progression

import { useGame } from '@/contexts/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, RefreshCw, Zap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RebirthAscensionShop() {
  const { gameState, spendCoins, addCoins } = useGame();
  const [selectedTab, setSelectedTab] = useState<'rebirth' | 'ascension'>('rebirth');

  const rebirthCost = 50000 * (gameState.totalRebirths + 1);
  const ascensionCost = 100000 * (gameState.totalAscensions + 1);

  const handleRebirth = () => {
    if (gameState.coins < rebirthCost) {
      toast.error('Moedas insuficientes!');
      return;
    }

    if (spendCoins(rebirthCost)) {
      // Rebirth bonus: gain 10% of total power as permanent bonus
      const totalPower = gameState.pets.reduce((sum, pet) => sum + pet.multiplier, 0);
      const rebirthBonus = Math.floor(totalPower * 0.1);
      
      addCoins(rebirthBonus);
      toast.success(
        `🔄 Rebirth realizado! Você ganhou ${rebirthBonus} moedas de bônus!`
      );
    }
  };

  const handleAscension = () => {
    if (gameState.coins < ascensionCost) {
      toast.error('Moedas insuficientes!');
      return;
    }

    if (spendCoins(ascensionCost)) {
      // Ascension bonus: gain 25% of total power as permanent bonus
      const totalPower = gameState.pets.reduce((sum, pet) => sum + pet.multiplier, 0);
      const ascensionBonus = Math.floor(totalPower * 0.25);
      
      addCoins(ascensionBonus);
      toast.success(
        `👑 Ascensão realizada! Você ganhou ${ascensionBonus} moedas de bônus!`
      );
    }
  };

  return (
    <div className="glass-panel rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Crown className="w-6 h-6 text-[oklch(0.75_0.2_145)]" />
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] tracking-wide">
          Rebirth & Ascensão
        </h2>
      </div>

      {/* Tab selector */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setSelectedTab('rebirth')}
          className={`flex-1 py-3 rounded-lg font-bold transition-all ${
            selectedTab === 'rebirth'
              ? 'bg-[oklch(0.7_0.2_195)] text-background'
              : 'bg-muted text-foreground hover:brightness-110'
          }`}
        >
          <RefreshCw className="w-5 h-5 inline mr-2" />
          Rebirth
        </button>
        <button
          onClick={() => setSelectedTab('ascension')}
          className={`flex-1 py-3 rounded-lg font-bold transition-all ${
            selectedTab === 'ascension'
              ? 'bg-[oklch(0.75_0.2_145)] text-background'
              : 'bg-muted text-foreground hover:brightness-110'
          }`}
        >
          <Crown className="w-5 h-5 inline mr-2" />
          Ascensão
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedTab === 'rebirth' && (
          <motion.div
            key="rebirth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="glass-panel rounded-lg p-6 border-2 border-[oklch(0.7_0.2_195_/_0.3)]">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="w-8 h-8 text-[oklch(0.7_0.2_195)]" />
                <div>
                  <h3 className="text-xl font-bold">Rebirth</h3>
                  <p className="text-sm text-muted-foreground">
                    Reinicie seu progresso e ganhe bônus permanentes
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Total de Rebirths:</span>
                  <span className="text-2xl font-bold text-[oklch(0.7_0.2_195)]">
                    {gameState.totalRebirths}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Custo:</span>
                  <span className="text-2xl font-bold text-[oklch(0.7_0.2_195)] font-[family-name:var(--font-mono)]">
                    {rebirthCost.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Bônus (10% do Poder):</span>
                  <span className="text-2xl font-bold text-[oklch(0.75_0.2_145)] font-[family-name:var(--font-mono)]">
                    {Math.floor(
                      gameState.pets.reduce((sum, pet) => sum + pet.multiplier, 0) * 0.1
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleRebirth}
                disabled={gameState.coins < rebirthCost}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                  gameState.coins >= rebirthCost
                    ? 'bg-[oklch(0.7_0.2_195)] text-background hover:brightness-110'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                <RefreshCw className="w-5 h-5" />
                FAZER REBIRTH
              </button>
            </div>
          </motion.div>
        )}

        {selectedTab === 'ascension' && (
          <motion.div
            key="ascension"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="glass-panel rounded-lg p-6 border-2 border-[oklch(0.75_0.2_145_/_0.3)]">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-[oklch(0.75_0.2_145)]" />
                <div>
                  <h3 className="text-xl font-bold">Ascensão</h3>
                  <p className="text-sm text-muted-foreground">
                    Ascenda para um novo nível e ganhe bônus maiores
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Total de Ascensões:</span>
                  <span className="text-2xl font-bold text-[oklch(0.75_0.2_145)]">
                    {gameState.totalAscensions}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Custo:</span>
                  <span className="text-2xl font-bold text-[oklch(0.75_0.2_145)] font-[family-name:var(--font-mono)]">
                    {ascensionCost.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Bônus (25% do Poder):</span>
                  <span className="text-2xl font-bold text-[oklch(0.7_0.2_45)] font-[family-name:var(--font-mono)]">
                    {Math.floor(
                      gameState.pets.reduce((sum, pet) => sum + pet.multiplier, 0) * 0.25
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAscension}
                disabled={gameState.coins < ascensionCost}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                  gameState.coins >= ascensionCost
                    ? 'bg-[oklch(0.75_0.2_145)] text-background hover:brightness-110'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                <Crown className="w-5 h-5" />
                FAZER ASCENSÃO
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info */}
      <div className="text-xs text-muted-foreground text-center p-3 bg-muted rounded-lg">
        💡 Rebirth e Ascensão ganham bônus maiores conforme você progride
      </div>
    </div>
  );
}
