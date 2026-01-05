// Design Philosophy: Sci-Fi Holographic Minimalism
// Game data configuration with balanced progression

import { EggType, PetTemplate } from '@/types/game';

// Pet templates for each rarity tier
const commonPets: PetTemplate[] = [
  { name: 'Cyber Gato', rarity: 'common', multiplier: 1.2, dropChance: 0.3 },
  { name: 'Holo Cachorro', rarity: 'common', multiplier: 1.3, dropChance: 0.25 },
  { name: 'Pixel Coelho', rarity: 'common', multiplier: 1.25, dropChance: 0.25 },
  { name: 'Data Hamster', rarity: 'common', multiplier: 1.15, dropChance: 0.2 },
];

const rarePets: PetTemplate[] = [
  { name: 'Neon Raposa', rarity: 'rare', multiplier: 2.5, dropChance: 0.25 },
  { name: 'Quantum Lobo', rarity: 'rare', multiplier: 2.8, dropChance: 0.2 },
  { name: 'Holo Panda', rarity: 'rare', multiplier: 2.3, dropChance: 0.25 },
  { name: 'Cyber Tigre', rarity: 'rare', multiplier: 3.0, dropChance: 0.15 },
  { name: 'Glitch Urso', rarity: 'rare', multiplier: 2.6, dropChance: 0.15 },
];

const epicPets: PetTemplate[] = [
  { name: 'Plasma Dragão', rarity: 'epic', multiplier: 5.5, dropChance: 0.2 },
  { name: 'Void Fênix', rarity: 'epic', multiplier: 6.0, dropChance: 0.15 },
  { name: 'Astral Leão', rarity: 'epic', multiplier: 5.0, dropChance: 0.25 },
  { name: 'Holo Grifo', rarity: 'epic', multiplier: 5.8, dropChance: 0.18 },
  { name: 'Cyber Unicórnio', rarity: 'epic', multiplier: 6.5, dropChance: 0.12 },
  { name: 'Matrix Pegasus', rarity: 'epic', multiplier: 5.3, dropChance: 0.1 },
];

const legendaryPets: PetTemplate[] = [
  { name: 'Quantum Leviatã', rarity: 'legendary', multiplier: 15.0, dropChance: 0.15 },
  { name: 'Celestial Hidra', rarity: 'legendary', multiplier: 18.0, dropChance: 0.1 },
  { name: 'Void Kraken', rarity: 'legendary', multiplier: 20.0, dropChance: 0.08 },
  { name: 'Cosmic Behemoth', rarity: 'legendary', multiplier: 25.0, dropChance: 0.05 },
  { name: 'Eterno Guardião', rarity: 'legendary', multiplier: 30.0, dropChance: 0.02 },
];

// Egg types configuration
export const EGGS: EggType[] = [
  {
    id: 'common',
    name: 'Ovo Básico',
    rarity: 'common',
    cost: 100,
    image: '/images/egg-common.png',
    petPool: commonPets,
  },
  {
    id: 'rare',
    name: 'Ovo Raro',
    rarity: 'rare',
    cost: 1000,
    image: '/images/egg-rare.png',
    petPool: rarePets,
  },
  {
    id: 'epic',
    name: 'Ovo Épico',
    rarity: 'epic',
    cost: 10000,
    image: '/images/egg-epic.png',
    petPool: epicPets,
  },
  {
    id: 'legendary',
    name: 'Ovo Lendário',
    rarity: 'legendary',
    cost: 100000,
    image: '/images/egg-legendary.png',
    petPool: legendaryPets,
  },
];

// Rarity colors for UI (using OKLCH for consistency)
export const RARITY_COLORS = {
  common: {
    glow: 'oklch(0.7 0.2 195)', // Cyan
    border: 'oklch(0.7 0.2 195 / 0.4)',
    bg: 'oklch(0.7 0.2 195 / 0.1)',
  },
  rare: {
    glow: 'oklch(0.65 0.25 320)', // Magenta
    border: 'oklch(0.65 0.25 320 / 0.4)',
    bg: 'oklch(0.65 0.25 320 / 0.1)',
  },
  epic: {
    glow: 'oklch(0.7 0.2 45)', // Orange
    border: 'oklch(0.7 0.2 45 / 0.4)',
    bg: 'oklch(0.7 0.2 45 / 0.1)',
  },
  legendary: {
    glow: 'oklch(0.75 0.2 145)', // Green
    border: 'oklch(0.75 0.2 145 / 0.4)',
    bg: 'oklch(0.75 0.2 145 / 0.1)',
  },
};

// Initial game state
export const INITIAL_GAME_STATE = {
  coins: 0,
  clickPower: 1,
  totalClicks: 0,
  pets: [],
  unlockedEggs: ['common'], // Começa com ovo comum desbloqueado
};
