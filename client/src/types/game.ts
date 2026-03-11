// Design Philosophy: Sci-Fi Holographic Minimalism
// Precise type definitions for game state management

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'secret';

export type PetClass = 
  | 'normal'
  | 'toxic'
  | 'congelado'
  | 'abençoado'
  | 'flamejante'
  | 'relâmpago'
  | 'terrestre'
  | 'aquático'
  | 'aéreo'
  | 'psíquico'
  | 'sombrio'
  | 'luminoso'
  | 'metálico'
  | 'cristalino'
  | 'infernal'
  | 'celestial'
  | 'cósmico'
  | 'vazio'
  | 'temporal'
  | 'dimensional';

export interface PetAbility {
  type: 'multi-click' | 'idle-boost' | 'critical-click';
  triggerCount?: number; // Ex: a cada 10 cliques
  multiplier?: number; // Ex: 1000x
  chance?: number; // Ex: 5% de chance
  description: string;
}

export interface Pet {
  id: string;
  name: string;
  rarity: Rarity;
  class: PetClass;
  multiplier: number; // Multiplicador de ganho por clique
  weight: number; // Peso do pet (afeta poder total)
  image: string;
  acquiredAt: number; // Timestamp
  level: number; // Nível do pet (para ascensão)
  ascensionLevel: number; // Nível de ascensão
  ability?: PetAbility; // Habilidade especial (para pets ultra raros)
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
  class: PetClass;
  multiplier: number;
  weight: number;
  dropChance: number; // Probabilidade de 0 a 1
  ability?: PetAbility;
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

export interface ClassChance {
  class: PetClass;
  chance: number; // Percentual de chance
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
  classChances: Record<PetClass, number>; // Chances de cada classe
  totalRebirths: number; // Número de rebirths realizados
  totalAscensions: number; // Número de ascensões realizadas
  rebirthMultiplier: number; // Multiplicador permanente de rebirth
  ascensionMultiplier: number; // Multiplicador permanente de ascensão
  bestPetId?: string; // ID do melhor pet
}

export interface ClickEffect {
  id: string;
  x: number;
  y: number;
  amount: number;
}
