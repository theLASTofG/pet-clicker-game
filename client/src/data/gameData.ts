// Design Philosophy: Sci-Fi Holographic Minimalism
// Game data configuration with balanced progression

import { EggType, PetTemplate, Upgrade, Mission } from '@/types/game';

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

const secretPets: PetTemplate[] = [
  { name: '⚡ Nexus Supremo', rarity: 'secret', multiplier: 50.0, dropChance: 0.01 },
  { name: '✨ Entidade Cósmica', rarity: 'secret', multiplier: 75.0, dropChance: 0.005 },
  { name: '🌌 Deus do Vazio', rarity: 'secret', multiplier: 100.0, dropChance: 0.001 },
];

// Egg types configuration
export const EGGS: EggType[] = [
  {
    id: 'common',
    name: 'Ovo Básico',
    rarity: 'common',
    cost: 100,
    image: '/images/egg-common.png',
    petPool: [...commonPets, ...secretPets.slice(0, 1)], // 1% chance de secret
  },
  {
    id: 'rare',
    name: 'Ovo Raro',
    rarity: 'rare',
    cost: 1000,
    image: '/images/egg-rare.png',
    petPool: [...rarePets, ...secretPets.slice(0, 2)], // 2% chance de secret
  },
  {
    id: 'epic',
    name: 'Ovo Épico',
    rarity: 'epic',
    cost: 10000,
    image: '/images/egg-epic.png',
    petPool: [...epicPets, ...secretPets], // 5% chance de secret
  },
  {
    id: 'legendary',
    name: 'Ovo Lendário',
    rarity: 'legendary',
    cost: 100000,
    image: '/images/egg-legendary.png',
    petPool: [...legendaryPets, ...secretPets], // 10% chance de secret
  },
];

// Rarity colors for UI (using OKLCH for consistency)
export const RARITY_COLORS = {
  common: {
    glow: 'oklch(0.7 0.2 195)',
    border: 'oklch(0.7 0.2 195 / 0.4)',
    bg: 'oklch(0.7 0.2 195 / 0.1)',
  },
  rare: {
    glow: 'oklch(0.65 0.25 320)',
    border: 'oklch(0.65 0.25 320 / 0.4)',
    bg: 'oklch(0.65 0.25 320 / 0.1)',
  },
  epic: {
    glow: 'oklch(0.7 0.2 45)',
    border: 'oklch(0.7 0.2 45 / 0.4)',
    bg: 'oklch(0.7 0.2 45 / 0.1)',
  },
  legendary: {
    glow: 'oklch(0.75 0.2 145)',
    border: 'oklch(0.75 0.2 145 / 0.4)',
    bg: 'oklch(0.75 0.2 145 / 0.1)',
  },
  secret: {
    glow: 'oklch(0.8 0.3 280)',
    border: 'oklch(0.8 0.3 280 / 0.6)',
    bg: 'oklch(0.8 0.3 280 / 0.2)',
  },
};

// Upgrades configuration
export const UPGRADES: Upgrade[] = [
  {
    id: 'auto-clicker',
    name: 'Auto-Clicker',
    description: 'Clica automaticamente a cada 2 segundos',
    cost: 500,
    level: 0,
    maxLevel: 5,
    effect: (level) => level,
    icon: '🤖',
  },
  {
    id: 'global-multiplier',
    name: 'Multiplicador Global',
    description: 'Aumenta todos os ganhos em 20% por nível',
    cost: 1000,
    level: 0,
    maxLevel: 10,
    effect: (level) => 1 + level * 0.2,
    icon: '📈',
  },
  {
    id: 'passive-income',
    name: 'Renda Passiva',
    description: 'Ganha 1% do seu poder por segundo',
    cost: 2000,
    level: 0,
    maxLevel: 5,
    effect: (level) => level * 0.01,
    icon: '💰',
  },
  {
    id: 'double-egg',
    name: 'Ovo Duplo',
    description: 'Chance de obter 2 pets ao abrir um ovo',
    cost: 5000,
    level: 0,
    maxLevel: 3,
    effect: (level) => level * 0.1,
    icon: '🥚',
  },
];

// Daily missions configuration
export const generateDailyMissions = (): Mission[] => [
  {
    id: 'clicks-100',
    name: 'Clique 100 Vezes',
    description: 'Faça 100 cliques para ganhar 500 moedas',
    type: 'clicks',
    target: 100,
    current: 0,
    reward: 500,
    completed: false,
  },
  {
    id: 'earn-5000',
    name: 'Ganhe 5.000 Moedas',
    description: 'Acumule 5.000 moedas para ganhar um upgrade grátis',
    type: 'coins',
    target: 5000,
    current: 0,
    reward: 1000,
    completed: false,
  },
  {
    id: 'collect-3-pets',
    name: 'Colete 3 Pets',
    description: 'Abra ovos e colete 3 pets novos para ganhar 2.000 moedas',
    type: 'pets',
    target: 3,
    current: 0,
    reward: 2000,
    completed: false,
  },
  {
    id: 'open-5-eggs',
    name: 'Abra 5 Ovos',
    description: 'Abra 5 ovos para ganhar um multiplicador 1.5x por 1 hora',
    type: 'eggs',
    target: 5,
    current: 0,
    reward: 1500,
    completed: false,
  },
];

// Initial game state
export const INITIAL_GAME_STATE = {
  coins: 0,
  clickPower: 1,
  totalClicks: 0,
  pets: [],
  unlockedEggs: ['common'],
  upgrades: UPGRADES.map(u => ({ id: u.id, level: 0 })),
  missions: generateDailyMissions(),
  lastIdleTime: Date.now(),
  autoClickerActive: false,
  globalMultiplier: 1,
};
