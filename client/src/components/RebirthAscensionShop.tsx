// Design Philosophy: Sci-Fi Holographic Minimalism
// Rebirth and Ascension shop for advanced progression

import { useGame } from '@/contexts/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, RefreshCw, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RebirthAscensionShop() {
  const { gameState, performRebirth, performAscension } = useGame();
  const [selectedTab, setSelectedTab] = useState<'rebirth' | 'ascension'>('rebirth');

  const totalRebirths = gameState.totalRebirths ?? 0;
  const totalAscensions = gameState.totalAscensions ?? 0;
  
  // Rebirth logic: requires coins and pets
  const rebirthCoinCost = 100000 * Math.pow(2, totalRebirths);
  const rebirthPetRequirement = 10 + (totalRebirths * 5);
  const canRebirth = gameState.coins >= rebirthCoinCost && gameState.pets.length >= rebirthPetRequirement;

  // Ascension logic: requires rebirths and high coins
  const ascensionCoinCost = 5000000 * Math.pow(10, totalAscensions);
  const ascensionRebirthRequirement = 5 + (totalAscensions * 2);
  const canAscend = gameState.coins >= ascensionCoinCost && totalRebirths >= ascensionRebirthRequirement;

  const handleRebirth = () => {
    if (!canRebirth) {
      if (gameState.coins < rebirthCoinCost) toast.error('Moedas insuficientes!');
      else toast.error(`Você precisa de pelo menos ${rebirthPetRequirement} pets!`);
      return;
    }
    if (confirm('O Rebirth irá resetar suas moedas, pets e upgrades, mas dobrará seus ganhos permanentemente. Continuar?')) {
      performRebirth();
    }
  };

  const handleAscension = () => {
    if (!canAscend) {
      if (gameState.coins < ascensionCoinCost) toast.error('Moedas insuficientes!');
      else toast.error(`Você precisa de pelo menos ${ascensionRebirthRequirement} Rebirths!`);
      return;
    }
    if (confirm('A Ascensão irá resetar TUDO (incluindo Rebirths), mas dará um multiplicador de 5x global. Continuar?')) {
      performAscension();
    }
  };

  return (
    <div className="glass-panel rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[oklch(0.75_0.2_145)]" />
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] tracking-wide">
            Progressão Avançada
          </h2>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="text-[oklch(0.7_0.2_195)] font-bold">
            Multiplicador Rebirth: x{gameState.rebirthMultiplier || 1}
          </span>
          <span className="text-[oklch(0.75_0.2_145)] font-bold">
            Multiplicador Ascensão: x{gameState.ascensionMultiplier || 1}
          </span>
        </div>
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
                    Dobre seus ganhos permanentes (acumulativo)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground block">Total Realizado</span>
                  <span className="text-xl font-bold text-[oklch(0.7_0.2_195)]">{totalRebirths}</span>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground block">Próximo Bônus</span>
                  <span className="text-xl font-bold text-[oklch(0.7_0.2_195)]">x2</span>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground block">Custo em Moedas</span>
                  <span className={`text-sm font-bold ${gameState.coins >= rebirthCoinCost ? 'text-green-400' : 'text-red-400'}`}>
                    {rebirthCoinCost.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground block">Pets Necessários</span>
                  <span className={`text-sm font-bold ${gameState.pets.length >= rebirthPetRequirement ? 'text-green-400' : 'text-red-400'}`}>
                    {gameState.pets.length} / {rebirthPetRequirement}
                  </span>
                </div>
              </div>

              <button
                onClick={handleRebirth}
                disabled={!canRebirth}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                  canRebirth
                    ? 'bg-[oklch(0.7_0.2_195)] text-background hover:brightness-110 shadow-[0_0_20px_oklch(0.7_0.2_195_/_0.5)]'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                <RefreshCw className="w-5 h-5" />
                REALIZAR REBIRTH
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
                    Multiplicador massivo de 5x global
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground block">Total Realizado</span>
                  <span className="text-xl font-bold text-[oklch(0.75_0.2_145)]">{totalAscensions}</span>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground block">Próximo Bônus</span>
                  <span className="text-xl font-bold text-[oklch(0.75_0.2_145)]">x5</span>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground block">Custo em Moedas</span>
                  <span className={`text-sm font-bold ${gameState.coins >= ascensionCoinCost ? 'text-green-400' : 'text-red-400'}`}>
                    {ascensionCoinCost.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground block">Rebirths Necessários</span>
                  <span className={`text-sm font-bold ${totalRebirths >= ascensionRebirthRequirement ? 'text-green-400' : 'text-red-400'}`}>
                    {totalRebirths} / {ascensionRebirthRequirement}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAscension}
                disabled={!canAscend}
                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                  canAscend
                    ? 'bg-[oklch(0.75_0.2_145)] text-background hover:brightness-110 shadow-[0_0_20px_oklch(0.75_0.2_145_/_0.5)]'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                <Crown className="w-5 h-5" />
                REALIZAR ASCENSÃO
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-xs text-muted-foreground text-center p-3 bg-muted rounded-lg">
        💡 Rebirth dobra seus ganhos mas reseta pets e moedas. Ascensão reseta rebirths mas dá 5x mais poder.
      </div>
    </div>
  );
}
