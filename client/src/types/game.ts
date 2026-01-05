// Design Philosophy: Sci-Fi Holographic Minimalism
// Precise type definitions for game state management

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'secret';

export interface Pet {
  id: string;
  name: string;
  rarity: Rarity;
  multiplier: number; // Multiplicador de ganho por clique
  image: string;
  acquiredAt: number; // Timestamp
}

export interface EggType {
  id: string;
  name: string;
  rarity: Rarity;
  cost: number;
  image: string;
  petPool: PetTemplate[]; // Pool de pets possíveis
}

export interface PetTemplate {
  name: string;
  rarity: Rarity;
  multiplier: number;
  dropChance: number; // Probabilidade de 0 a 1
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  effect: (currentLevel: number) => number; // Retorna o valor do efeito
  icon: string;
}

export interface UpgradeState {
  id: string;
  level: number;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  type: 'clicks' | 'coins' | 'pets' | 'eggs';
  target: number;
  current: number;
  reward: number;
  completed: boolean;
  completedAt?: number;
}

export interface GameState {
  coins: number;
  clickPower: number; // Moedas ganhas por clique
  totalClicks: number;
  pets: Pet[];
  unlockedEggs: string[]; // IDs dos tipos de ovos desbloqueados
  upgrades: UpgradeState[];
  missions: Mission[];
  lastIdleTime: number; // Timestamp do último cálculo de idle
  autoClickerActive: boolean;
  globalMultiplier: number;
}

export interface ClickEffect {
  id: string;
  x: number;
  y: number;
  amount: number;
}
