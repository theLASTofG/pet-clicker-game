// Design Philosophy: Sci-Fi Holographic Minimalism
// Centralized game state management with localStorage persistence

import { INITIAL_GAME_STATE } from '@/data/gameData';
import { GameState, Pet } from '@/types/game';
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
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY = 'pet-clicker-save';

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Load saved game state from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
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

  // Calculate total click power based on pets
  const calculateClickPower = () => {
    if (gameState.pets.length === 0) return 1;
    
    const totalMultiplier = gameState.pets.reduce(
      (sum, pet) => sum + pet.multiplier,
      0
    );
    return Math.floor(totalMultiplier);
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
