// Design Philosophy: Sci-Fi Holographic Minimalism
// Game data configuration with 20 pet classes and balanced progression

import { EggType, PetTemplate, Upgrade, Mission, PetClass } from '@/types/game';

// 20 Pet Classes - cada uma mais rara que a anterior
export const PET_CLASSES: Record<PetClass, { name: string; emoji: string; color: string; baseChance: number }> = {
  normal: { name: 'Normal', emoji: '⚪', color: 'oklch(0.7 0.1 0)', baseChance: 0.15 },
  toxic: { name: 'Tóxico', emoji: '☠️', color: 'oklch(0.65 0.25 140)', baseChance: 0.12 },
  congelado: { name: 'Congelado', emoji: '❄️', color: 'oklch(0.75 0.2 195)', baseChance: 0.11 },
  abençoado: { name: 'Abençoado', emoji: '✨', color: 'oklch(0.8 0.25 60)', baseChance: 0.1 },
  flamejante: { name: 'Flamejante', emoji: '🔥', color: 'oklch(0.7 0.25 30)', baseChance: 0.09 },
  relâmpago: { name: 'Relâmpago', emoji: '⚡', color: 'oklch(0.75 0.2 80)', baseChance: 0.08 },
  terrestre: { name: 'Terrestre', emoji: '🌍', color: 'oklch(0.6 0.2 70)', baseChance: 0.07 },
  aquático: { name: 'Aquático', emoji: '💧', color: 'oklch(0.65 0.2 200)', baseChance: 0.06 },
  aéreo: { name: 'Aéreo', emoji: '🌪️', color: 'oklch(0.7 0.15 200)', baseChance: 0.05 },
  psíquico: { name: 'Psíquico', emoji: '🧠', color: 'oklch(0.7 0.25 290)', baseChance: 0.04 },
  sombrio: { name: 'Sombrio', emoji: '🌑', color: 'oklch(0.3 0.1 0)', baseChance: 0.035 },
  luminoso: { name: 'Luminoso', emoji: '☀️', color: 'oklch(0.9 0.2 60)', baseChance: 0.03 },
  metálico: { name: 'Metálico', emoji: '⚙️', color: 'oklch(0.6 0.1 0)', baseChance: 0.025 },
  cristalino: { name: 'Cristalino', emoji: '💎', color: 'oklch(0.8 0.2 280)', baseChance: 0.02 },
  infernal: { name: 'Infernal', emoji: '👿', color: 'oklch(0.6 0.3 20)', baseChance: 0.015 },
  celestial: { name: 'Celestial', emoji: '👼', color: 'oklch(0.85 0.2 70)', baseChance: 0.012 },
  cósmico: { name: 'Cósmico', emoji: '🌌', color: 'oklch(0.5 0.3 280)', baseChance: 0.008 },
  vazio: { name: 'Vazio', emoji: '🕳️', color: 'oklch(0.2 0.1 0)', baseChance: 0.005 },
  temporal: { name: 'Temporal', emoji: '⏳', color: 'oklch(0.7 0.2 50)', baseChance: 0.003 },
  dimensional: { name: 'Dimensional', emoji: '🌀', color: 'oklch(0.6 0.3 320)', baseChance: 0.001 },
};

// Pet templates for each rarity tier
const commonPets: PetTemplate[] = [
  { name: 'Cyber Gato', rarity: 'common', class: 'normal', multiplier: 1.2, weight: 1.0, dropChance: 0.25 },
  { name: 'Holo Cachorro', rarity: 'common', class: 'normal', multiplier: 1.3, weight: 1.1, dropChance: 0.25 },
  { name: 'Pixel Coelho', rarity: 'common', class: 'toxic', multiplier: 1.25, weight: 0.9, dropChance: 0.25 },
  { name: 'Data Hamster', rarity: 'common', class: 'congelado', multiplier: 1.15, weight: 0.8, dropChance: 0.25 },
];

const rarePets: PetTemplate[] = [
  { name: 'Neon Raposa', rarity: 'rare', class: 'flamejante', multiplier: 2.5, weight: 1.2, dropChance: 0.2 },
  { name: 'Quantum Lobo', rarity: 'rare', class: 'relâmpago', multiplier: 2.8, weight: 1.3, dropChance: 0.2 },
  { name: 'Holo Panda', rarity: 'rare', class: 'abençoado', multiplier: 2.3, weight: 1.1, dropChance: 0.2 },
  { name: 'Cyber Tigre', rarity: 'rare', class: 'terrestre', multiplier: 3.0, weight: 1.4, dropChance: 0.2 },
  { name: 'Glitch Urso', rarity: 'rare', class: 'aquático', multiplier: 2.6, weight: 1.5, dropChance: 0.2 },
];

const epicPets: PetTemplate[] = [
  { name: 'Plasma Dragão', rarity: 'epic', class: 'aéreo', multiplier: 5.5, weight: 1.6, dropChance: 0.16 },
  { name: 'Void Fênix', rarity: 'epic', class: 'psíquico', multiplier: 6.0, weight: 1.5, dropChance: 0.16 },
  { name: 'Astral Leão', rarity: 'epic', class: 'sombrio', multiplier: 5.0, weight: 1.7, dropChance: 0.17 },
  { name: 'Holo Grifo', rarity: 'epic', class: 'luminoso', multiplier: 5.8, weight: 1.6, dropChance: 0.16 },
  { name: 'Cyber Unicórnio', rarity: 'epic', class: 'metálico', multiplier: 6.5, weight: 1.4, dropChance: 0.16 },
  { name: 'Matrix Pegasus', rarity: 'epic', class: 'cristalino', multiplier: 5.3, weight: 1.5, dropChance: 0.19 },
];

const legendaryPets: PetTemplate[] = [
  { name: 'Quantum Leviatã', rarity: 'legendary', class: 'infernal', multiplier: 15.0, weight: 2.0, dropChance: 0.15 },
  { name: 'Celestial Hidra', rarity: 'legendary', class: 'celestial', multiplier: 18.0, weight: 2.1, dropChance: 0.1 },
  { name: 'Void Kraken', rarity: 'legendary', class: 'cósmico', multiplier: 20.0, weight: 2.2, dropChance: 0.08 },
  { name: 'Cosmic Behemoth', rarity: 'legendary', class: 'vazio', multiplier: 25.0, weight: 2.5, dropChance: 0.05 },
  { name: 'Eterno Guardião', rarity: 'legendary', class: 'temporal', multiplier: 30.0, weight: 2.3, dropChance: 0.02 },
];

const secretPets: PetTemplate[] = [
  { name: '⚡ Nexus Supremo', rarity: 'secret', class: 'dimensional', multiplier: 50.0, weight: 3.0, dropChance: 0.01 },
  { name: '✨ Entidade Cósmica', rarity: 'secret', class: 'dimensional', multiplier: 75.0, weight: 3.5, dropChance: 0.005 },
  { name: '🌌 Deus do Vazio', rarity: 'secret', class: 'dimensional', multiplier: 100.0, weight: 4.0, dropChance: 0.001 },
];

// Egg types configuration
export const EGGS: EggType[] = [
  {
    id: 'common',
    name: 'Ovo Básico',
    rarity: 'common',
    cost: 100,
    image: '/images/egg-common.png',
    petPool: [...commonPets, ...secretPets.slice(0, 1)],
  },
  {
    id: 'rare',
    name: 'Ovo Raro',
    rarity: 'rare',
    cost: 1000,
    image: '/images/egg-rare.png',
    petPool: [...rarePets, ...secretPets.slice(0, 2)],
  },
  {
    id: 'epic',
    name: 'Ovo Épico',
    rarity: 'epic',
    cost: 10000,
    image: '/images/egg-epic.png',
    petPool: [...epicPets, ...secretPets],
  },
  {
    id: 'legendary',
    name: 'Ovo Lendário',
    rarity: 'legendary',
    cost: 100000,
    image: '/images/egg-legendary.png',
    petPool: [...legendaryPets, ...secretPets],
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
  {
    id: 'class-chance-boost',
    name: 'Amplificador de Classe',
    description: 'Aumenta chances de classes raras em 5% por nível',
    cost: 3000,
    level: 0,
    maxLevel: 20,
    effect: (level) => level * 0.05,
    icon: '🎲',
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
  classChances: Object.fromEntries(
    Object.entries(PET_CLASSES).map(([key, val]) => [key, val.baseChance])
  ) as Record<PetClass, number>,
  totalRebirths: 0,
  totalAscensions: 0,
};
