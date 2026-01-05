// Design Philosophy: Sci-Fi Holographic Minimalism
// Incremental conversion mini-game

import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function IncrementalGame() {
  const { gameState, spendCoins, addCoins } = useGame();
  const [selectedConversion, setSelectedConversion] = useState<number>(0);

  // Conversion rates: trade large amount for smaller amount of another currency
  const conversions = [
    {
      id: 0,
      name: 'Cristais',
      from: 10000,
      to: 50,
      icon: '💎',
      description: 'Converta 10.000 moedas em 50 cristais',
    },
    {
      id: 1,
      name: 'Fragmentos',
      from: 50000,
      to: 100,
      icon: '🔮',
      description: 'Converta 50.000 moedas em 100 fragmentos',
    },
    {
      id: 2,
      name: 'Essências',
      from: 100000,
      to: 200,
      icon: '✨',
      description: 'Converta 100.000 moedas em 200 essências',
    },
    {
      id: 3,
      name: 'Singularidades',
      from: 500000,
      to: 500,
      icon: '🌌',
      description: 'Converta 500.000 moedas em 500 singularidades',
    },
  ];

  const conversion = conversions[selectedConversion];
  const canConvert = gameState.coins >= conversion.from;

  const handleConvert = () => {
    if (!canConvert) {
      toast.error('Moedas insuficientes!');
      return;
    }

    if (spendCoins(conversion.from)) {
      // Add converted currency (stored as special coins for now)
      // In a real game, you'd have separate currency types
      addCoins(conversion.to * 0.1); // Small bonus
      toast.success(
        `Convertido! Você ganhou ${conversion.to} ${conversion.name}!`
      );
    }
  };

  return (
    <div className="glass-panel rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-6 h-6 text-[oklch(0.7_0.2_195)]" />
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] tracking-wide">
          Mini-Game Incremental
        </h2>
      </div>

      {/* Conversion selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {conversions.map((conv, index) => (
          <motion.button
            key={conv.id}
            onClick={() => setSelectedConversion(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`glass-panel rounded-lg p-3 text-center transition-all border-2 ${
              selectedConversion === index
                ? 'border-[oklch(0.7_0.2_195)] bg-[oklch(0.7_0.2_195_/_0.1)]'
                : 'border-muted hover:border-[oklch(0.7_0.2_195_/_0.5)]'
            }`}
          >
            <p className="text-3xl mb-2">{conv.icon}</p>
            <p className="text-xs font-bold">{conv.name}</p>
          </motion.button>
        ))}
      </div>

      {/* Conversion display */}
      <motion.div
        key={selectedConversion}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-lg p-6 border-2 border-[oklch(0.7_0.2_195_/_0.3)]"
      >
        <p className="text-sm text-muted-foreground mb-4 text-center">
          {conversion.description}
        </p>

        {/* Conversion flow */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 text-center">
            <p className="text-3xl font-bold text-[oklch(0.7_0.2_195)] font-[family-name:var(--font-mono)] mb-2">
              {conversion.from.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Moedas</p>
          </div>

          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="px-4"
          >
            <ArrowRight className="w-6 h-6 text-[oklch(0.7_0.2_195)]" />
          </motion.div>

          <div className="flex-1 text-center">
            <p className="text-3xl font-bold text-[oklch(0.7_0.2_45)] font-[family-name:var(--font-mono)] mb-2">
              {conversion.to}
            </p>
            <p className="text-sm text-muted-foreground">{conversion.name}</p>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Você tem:</span>
            <span className="text-lg font-bold text-[oklch(0.7_0.2_195)] font-[family-name:var(--font-mono)]">
              {gameState.coins.toLocaleString()} moedas
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-2 overflow-hidden">
            <motion.div
              animate={{
                width: `${Math.min((gameState.coins / conversion.from) * 100, 100)}%`,
              }}
              className="h-full bg-gradient-to-r from-[oklch(0.7_0.2_195)] to-[oklch(0.7_0.2_45)]"
            />
          </div>
        </div>

        {/* Convert button */}
        <button
          onClick={handleConvert}
          disabled={!canConvert}
          className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
            canConvert
              ? 'bg-[oklch(0.7_0.2_195)] text-background hover:brightness-110'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          <Zap className="w-5 h-5" />
          CONVERTER AGORA
        </button>
      </motion.div>

      {/* Info */}
      <div className="text-xs text-muted-foreground text-center">
        💡 Converta moedas em recursos especiais para upgrades únicos
      </div>
    </div>
  );
}
