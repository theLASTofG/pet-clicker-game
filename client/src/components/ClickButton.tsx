// Design Philosophy: Sci-Fi Holographic Minimalism
// Central hexagonal click button with precise feedback and neon glow

import { useGame } from '@/contexts/GameContext';
import { ClickEffect } from '@/types/game';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';
import { useState } from 'react';

export default function ClickButton() {
  const { addCoins, incrementClicks, calculateClickPower } = useGame();
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickPower = calculateClickPower();
    addCoins(clickPower);
    incrementClicks();

    // Create floating text effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const effect: ClickEffect = {
      id: `${Date.now()}-${Math.random()}`,
      x,
      y,
      amount: clickPower,
    };

    setClickEffects(prev => [...prev, effect]);

    // Remove effect after animation
    setTimeout(() => {
      setClickEffects(prev => prev.filter(e => e.id !== effect.id));
    }, 1000);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Click effects */}
      {clickEffects.map(effect => (
        <motion.div
          key={effect.id}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -80, scale: 1.5 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute pointer-events-none z-50"
          style={{
            left: effect.x,
            top: effect.y,
          }}
        >
          <span className="text-2xl font-bold text-[oklch(0.7_0.2_195)] neon-glow font-[family-name:var(--font-mono)]">
            +{effect.amount}
          </span>
        </motion.div>
      ))}

      {/* Main click button - hexagonal shape */}
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        className="relative w-64 h-64 flex items-center justify-center group"
        style={{
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
        }}
      >
        {/* Hexagon background with glass effect */}
        <div 
          className="absolute inset-0 glass-panel animate-pulse-glow transition-all duration-200 group-hover:brightness-125"
          style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          }}
        />
        
        {/* Scan lines overlay */}
        <div 
          className="absolute inset-0 scan-lines opacity-30"
          style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          }}
        />

        {/* Icon */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <Coins className="w-20 h-20 text-[oklch(0.7_0.2_195)] drop-shadow-[0_0_10px_oklch(0.7_0.2_195)]" />
          <span className="text-xl font-bold text-[oklch(0.95_0.01_195)] font-[family-name:var(--font-heading)] tracking-wider">
            CLICAR
          </span>
        </div>

        {/* Orbital rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border-2 border-[oklch(0.7_0.2_195_/_0.3)] rounded-full"
          style={{ width: '110%', height: '110%', left: '-5%', top: '-5%' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border border-[oklch(0.65_0.25_320_/_0.3)] rounded-full"
          style={{ width: '120%', height: '120%', left: '-10%', top: '-10%' }}
        />
      </motion.button>
    </div>
  );
}
