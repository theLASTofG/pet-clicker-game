// Design Philosophy: Sci-Fi Holographic Minimalism
// Precise type definitions for game state management

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

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

export interface GameState {
  coins: number;
  clickPower: number; // Moedas ganhas por clique
  totalClicks: number;
  pets: Pet[];
  unlockedEggs: string[]; // IDs dos tipos de ovos desbloqueados
}

export interface ClickEffect {
  id: string;
  x: number;
  y: number;
  amount: number;
}
