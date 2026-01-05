// Design Philosophy: Sci-Fi Holographic Minimalism
// Upgrade shop with purchasable permanent upgrades

import { UPGRADES } from '@/data/gameData';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function UpgradeShop() {
  const { gameState, upgradeLevel } = useGame();

  const handleUpgrade = (upgradeId: string) => {
    const success = upgradeLevel(upgradeId);
    if (success) {
      const upgrade = UPGRADES.find(u => u.id === upgradeId);
      toast.success(`${upgrade?.name} atualizado!`);
    } else {
      toast.error('Moedas insuficientes ou nível máximo atingido!');
    }
  };

  return (
    <div className="glass-panel rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-6 h-6 text-[oklch(0.7_0.2_45)]" />
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] tracking-wide">
          Loja de Upgrades
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {UPGRADES && UPGRADES.map((upgrade, index) => {
        const currentLevel = gameState.upgrades?.find(u => u.id === upgrade.id)?.level || 0;
          const nextCost = upgrade.cost * (currentLevel + 1);
          const canAfford = gameState.coins >= nextCost && currentLevel < upgrade.maxLevel;
          const isMaxed = currentLevel >= upgrade.maxLevel;

          return (
            <motion.div
              key={upgrade.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel rounded-lg p-4 border-2 border-[oklch(0.7_0.2_45_/_0.3)] hover:border-[oklch(0.7_0.2_45_/_0.6)] transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{upgrade.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {upgrade.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {upgrade.description}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[oklch(0.7_0.2_45)] font-[family-name:var(--font-mono)]">
                  Nv. {currentLevel}/{upgrade.maxLevel}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[oklch(0.7_0.2_195)] font-[family-name:var(--font-mono)]">
                  {nextCost.toLocaleString()}
                </span>
                <button
                  onClick={() => handleUpgrade(upgrade.id)}
                  disabled={!canAfford || isMaxed}
                  className={`px-4 py-2 rounded-lg font-bold transition-all ${
                    isMaxed
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : canAfford
                      ? 'bg-[oklch(0.7_0.2_45)] text-background hover:brightness-110'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {isMaxed ? 'MAX' : 'COMPRAR'}
                </button>
              </div>

              {/* Level progress bar */}
              <div className="mt-3 w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentLevel / upgrade.maxLevel) * 100}%` }}
                  className="h-full bg-gradient-to-r from-[oklch(0.7_0.2_45)] to-[oklch(0.7_0.2_195)]"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
