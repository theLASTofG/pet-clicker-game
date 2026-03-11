// Design Philosophy: Sci-Fi Holographic Minimalism
// Asymmetric layout with floating panels and space background

import ClickButton from '@/components/ClickButton';
import EggCard from '@/components/EggCard';
import PetInventory from '@/components/PetInventory';
import ProgressTracker from '@/components/ProgressTracker';
import DevTools from '@/components/DevTools';
import UpgradeShop from '@/components/UpgradeShop';
import DailyMissions from '@/components/DailyMissions';
import IdleCounter from '@/components/IdleCounter';
import ClassChanceBooster from '@/components/ClassChanceBooster';
import IncrementalGame from '@/components/IncrementalGame';
import RebirthAscensionShop from '@/components/RebirthAscensionShop';
import BestPetDisplay from '@/components/BestPetDisplay';
import StatsDisplay from '@/components/StatsDisplay';
import { Button } from '@/components/ui/button';
import { EGGS } from '@/data/gameData';
import { useGame } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { RotateCcw, Info } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Home() {
  const { gameState, resetGame, unlockEgg } = useGame();

  // Auto-unlock eggs based on total pets
  const handleUnlockCheck = () => {
    const petCount = gameState.pets.length;
    
    if (petCount >= 3 && !gameState.unlockedEggs.includes('rare')) {
      unlockEgg('rare');
      toast.success('Novo ovo desbloqueado: Ovo Raro!');
    }
    if (petCount >= 8 && !gameState.unlockedEggs.includes('epic')) {
      unlockEgg('epic');
      toast.success('Novo ovo desbloqueado: Ovo Épico!');
    }
    if (petCount >= 15 && !gameState.unlockedEggs.includes('legendary')) {
      unlockEgg('legendary');
      toast.success('Novo ovo desbloqueado: Ovo Lendário!');
    }
    if (petCount >= 25 && !gameState.unlockedEggs.includes('mythic')) {
      unlockEgg('mythic');
      toast.success('Novo ovo desbloqueado: Ovo Mítico!');
    }
    if (petCount >= 40 && !gameState.unlockedEggs.includes('void')) {
      unlockEgg('void');
      toast.success('Novo ovo desbloqueado: Ovo do Vazio!');
    }
    if (petCount >= 60 && !gameState.unlockedEggs.includes('cosmic')) {
      unlockEgg('cosmic');
      toast.success('Novo ovo desbloqueado: Ovo Cósmico!');
    }
    if (petCount >= 80 && !gameState.unlockedEggs.includes('temporal')) {
      unlockEgg('temporal');
      toast.success('Novo ovo desbloqueado: Ovo Temporal!');
    }
    if (petCount >= 100 && !gameState.unlockedEggs.includes('omega')) {
      unlockEgg('omega');
      toast.success('Novo ovo desbloqueado: Ovo Ômega!');
    }
  };

  // Check unlocks whenever pets change
  useEffect(() => {
    handleUnlockCheck();
  }, [gameState.pets.length]);

  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar todo o progresso?')) {
      resetGame();
      toast.success('Jogo resetado com sucesso!');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Space background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/hero-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-background/50 to-background/80" />

      {/* Content */}
      <div className="relative z-10 container py-8 space-y-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] tracking-wider mb-2">
              <span className="text-[oklch(0.7_0.2_195)] neon-glow">PET</span>{' '}
              <span className="text-foreground">CLICKER</span>
            </h1>
            <p className="text-muted-foreground text-sm tracking-wide">
              Colete pets holográficos e aumente seus ganhos
            </p>
          </div>

          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="glass-panel">
                  <Info className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-panel border-[oklch(0.7_0.2_195_/_0.3)]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-[family-name:var(--font-heading)] tracking-wide">
                    Como Jogar
                  </DialogTitle>
                  <DialogDescription className="space-y-3 text-left pt-4">
                    <p><strong className="text-[oklch(0.7_0.2_195)]">1. Clique</strong> no botão central para ganhar moedas</p>
                    <p><strong className="text-[oklch(0.65_0.25_320)]">2. Compre ovos</strong> para obter pets aleatórios</p>
                    <p><strong className="text-[oklch(0.7_0.2_45)]">3. Pets aumentam</strong> seu ganho por clique</p>
                    <p><strong className="text-[oklch(0.75_0.2_145)]">4. Desbloqueie</strong> ovos melhores coletando pets</p>
                    <p className="text-xs text-muted-foreground pt-2">
                      • 3 pets → Ovo Raro<br/>
                      • 8 pets → Ovo Épico<br/>
                      • 15 pets → Ovo Lendário<br/>
                      • 25 pets → Ovo Mítico<br/>
                      • 40 pets → Ovo do Vazio<br/>
                      • 60 pets → Ovo Cósmico<br/>
                      • 80 pets → Ovo Temporal<br/>
                      • 100 pets → Ovo Ômega
                    </p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleReset}
              className="glass-panel hover:bg-destructive/20"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </motion.header>

        {/* Stats */}
        <StatsDisplay />

        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ProgressTracker />
        </motion.div>

        {/* Main game area */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
          {/* Left: Pet Inventory */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PetInventory />
          </motion.div>

          {/* Center: Click Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center py-8"
          >
            <ClickButton />
          </motion.div>

          {/* Right: Egg Shop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] tracking-wide mb-4">
              Loja de Ovos
            </h2>
            
            <div className="grid gap-4">
              {EGGS.map(egg => (
                <EggCard
                  key={egg.id}
                  egg={egg}
                  isLocked={!gameState.unlockedEggs.includes(egg.id)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Idle Counter */}
        <IdleCounter />

        {/* Upgrades and Missions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          <UpgradeShop />
          <DailyMissions />
        </motion.div>

        {/* Best Pet Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <BestPetDisplay />
        </motion.div>

        {/* Advanced Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          <ClassChanceBooster />
          <IncrementalGame />
        </motion.div>

        {/* Rebirth and Ascension */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <RebirthAscensionShop />
        </motion.div>

        {/* Dev Tools */}
        <DevTools />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground pt-8"
        >
          <p>Desenvolvido com React + TypeScript + Framer Motion</p>
        </motion.footer>
      </div>
    </div>
  );
}
