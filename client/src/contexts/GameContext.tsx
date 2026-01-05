// Design Philosophy: Sci-Fi Holographic Minimalism
// Centralized game state management with localStorage persistence

import { INITIAL_GAME_STATE } from '@/data/gameData';
import { GameState, Pet, Mission } from '@/types/game';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface GameContextType {
  gameState: GameState;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  addPet: (pet: Pet) => void;
  incrementClicks: () => void;
  calculateClickPower: () => number;
  unlockEgg: (eggId: string) => void;
  resetGame: () => void;
  upgradeLevel: (upgradeId: string) => boolean;
  updateMission: (missionId: string, progress: number) => void;
  completeMission: (missionId: string) => void;
  processIdleGains: () => void;
  setAutoClicker: (active: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY = 'pet-clicker-save';

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.upgrades) parsed.upgrades = INITIAL_GAME_STATE.upgrades;
        if (!parsed.classChances) parsed.classChances = INITIAL_GAME_STATE.classChances;
        if (!parsed.missions) parsed.missions = INITIAL_GAME_STATE.missions;
        return parsed;
      } catch {
        return INITIAL_GAME_STATE;
      }
    }
    return INITIAL_GAME_STATE;
  });

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  // Auto-clicker interval
  useEffect(() => {
    if (!gameState.autoClickerActive) return;

    const autoClickerLevel = gameState.upgrades.find(u => u.id === 'auto-clicker')?.level || 0;
    if (autoClickerLevel === 0) return;

    const interval = setInterval(() => {
      const clickPower = calculateClickPower();
      addCoins(clickPower);
      incrementClicks();
    }, 2000 / autoClickerLevel);

    return () => clearInterval(interval);
  }, [gameState.autoClickerActive, gameState.upgrades, gameState.pets]);

  // Idle gains interval
  useEffect(() => {
    const interval = setInterval(() => {
      processIdleGains();
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.pets, gameState.upgrades]);

  // Calculate total click power based on pets and upgrades
  const calculateClickPower = () => {
    if (gameState.pets.length === 0) return 1;
    
    const petMultiplier = gameState.pets.reduce(
      (sum, pet) => sum + pet.multiplier,
      0
    );

    const globalMultiplierUpgrade = gameState.upgrades.find(u => u.id === 'global-multiplier');
    const globalMultiplier = globalMultiplierUpgrade 
      ? 1 + (globalMultiplierUpgrade.level * 0.2)
      : 1;

    return Math.floor(petMultiplier * globalMultiplier);
  };

  const addCoins = (amount: number) => {
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + amount,
    }));
  };

  const spendCoins = (amount: number): boolean => {
    if (gameState.coins >= amount) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - amount,
      }));
      return true;
    }
    return false;
  };

  const addPet = (pet: Pet) => {
    setGameState(prev => ({
      ...prev,
      pets: [...prev.pets, pet],
    }));
  };

  const incrementClicks = () => {
    setGameState(prev => ({
      ...prev,
      totalClicks: prev.totalClicks + 1,
    }));
  };

  const unlockEgg = (eggId: string) => {
    setGameState(prev => {
      if (prev.unlockedEggs.includes(eggId)) return prev;
      return {
        ...prev,
        unlockedEggs: [...prev.unlockedEggs, eggId],
      };
    });
  };

  const upgradeLevel = (upgradeId: string): boolean => {
    const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
    if (!upgrade) return false;

    // Find upgrade cost from UPGRADES data
    const { UPGRADES } = require('@/data/gameData');
    const upgradeData = UPGRADES.find((u: any) => u.id === upgradeId);
    if (!upgradeData) return false;

    const cost = upgradeData.cost * (upgrade.level + 1);
    
    if (gameState.coins < cost || upgrade.level >= upgradeData.maxLevel) {
      return false;
    }

    setGameState(prev => ({
      ...prev,
      coins: prev.coins - cost,
      upgrades: prev.upgrades.map(u =>
        u.id === upgradeId ? { ...u, level: u.level + 1 } : u
      ),
    }));

    if (upgradeId === 'auto-clicker') {
      setGameState(prev => ({ ...prev, autoClickerActive: true }));
    }

    return true;
  };

  const updateMission = (missionId: string, progress: number) => {
    setGameState(prev => ({
      ...prev,
      missions: prev.missions.map(m =>
        m.id === missionId
          ? { ...m, current: Math.min(m.current + progress, m.target) }
          : m
      ),
    }));
  };

  const completeMission = (missionId: string) => {
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + (prev.missions.find(m => m.id === missionId)?.reward || 0),
      missions: prev.missions.map(m =>
        m.id === missionId
          ? { ...m, completed: true, completedAt: Date.now() }
          : m
      ),
    }));
  };

  const processIdleGains = () => {
    const passiveIncomeUpgrade = gameState.upgrades.find(u => u.id === 'passive-income');
    if (!passiveIncomeUpgrade || passiveIncomeUpgrade.level === 0) return;

    const clickPower = calculateClickPower();
    const passiveGain = clickPower * (passiveIncomeUpgrade.level * 0.01);

    if (passiveGain > 0) {
      addCoins(passiveGain);
    }
  };

  const setAutoClicker = (active: boolean) => {
    setGameState(prev => ({
      ...prev,
      autoClickerActive: active,
    }));
  };

  const resetGame = () => {
    setGameState(INITIAL_GAME_STATE);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        addCoins,
        spendCoins,
        addPet,
        incrementClicks,
        calculateClickPower,
        unlockEgg,
        resetGame,
        upgradeLevel,
        updateMission,
        completeMission,
        processIdleGains,
        setAutoClicker,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
