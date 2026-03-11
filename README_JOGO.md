# 🎮 Pet Clicker - Jogo de Ovos e Pets

Um jogo clicker 100% funcional e visualmente impressionante, inspirado nos jogos de pets do Roblox, desenvolvido com React, TypeScript e Framer Motion.

## 🌟 Características

### ✨ Estilo Visual: Sci-Fi Holographic Minimalism
- **Glass Morphism**: Painéis translúcidos com efeito de vidro fosco
- **Neon Glow**: Efeitos de brilho neon em ciano, magenta, laranja e verde
- **Animações Fluidas**: Transições suaves e animações de impacto com Framer Motion
- **Background Espacial**: Cenário futurista com estrelas e elementos holográficos
- **Tipografia Técnica**: Fontes Orbitron (títulos), Inter (corpo) e Rajdhani (números)

### 🎯 Mecânicas de Jogo

#### Sistema de Cliques
- Clique no botão hexagonal central para ganhar moedas
- Cada clique mostra um efeito visual de texto flutuante com o valor ganho
- Poder de clique aumenta conforme você coleta pets

#### Sistema de Ovos
Quatro tipos de ovos com raridades crescentes:

1. **Ovo Básico** (Common) - 100 moedas
   - Pets: Cyber Gato, Holo Cachorro, Pixel Coelho, Data Hamster
   - Multiplicador: 1.15x - 1.3x

2. **Ovo Raro** (Rare) - 1,000 moedas
   - Pets: Neon Raposa, Quantum Lobo, Holo Panda, Cyber Tigre, Glitch Urso
   - Multiplicador: 2.3x - 3.0x
   - Desbloqueado com 3 pets

3. **Ovo Épico** (Epic) - 10,000 moedas
   - Pets: Plasma Dragão, Void Fênix, Astral Leão, Holo Grifo, Cyber Unicórnio, Matrix Pegasus
   - Multiplicador: 5.0x - 6.5x
   - Desbloqueado com 8 pets

4. **Ovo Lendário** (Legendary) - 100,000 moedas
   - Pets: Quantum Leviatã, Celestial Hidra, Void Kraken, Cosmic Behemoth, Eterno Guardião
   - Multiplicador: 15.0x - 30.0x
   - Desbloqueado com 15 pets

5. **Novos Ovos Avançados**:
   - **Ovo Mítico**: 500,000 moedas (25 pets)
   - **Ovo do Vazio**: 2,000,000 moedas (40 pets)
   - **Ovo Cósmico**: 10,000,000 moedas (60 pets)
   - **Ovo Temporal**: 50,000,000 moedas (80 pets)
   - **Ovo Ômega**: 250,000,000 moedas (100 pets)

#### Sistema de Pets Secretos e Habilidades
- **Pets Secretos**: Chance ultra baixa (<1%) de obter pets como "Deus do Vazio" ou "Nexus Supremo".
- **Habilidades Passivas**: Pets secretos possuem habilidades únicas:
  - **Multi-Click**: A cada X cliques, ganha um bônus massivo (ex: 1000x).
  - **Critical Click**: Chance de cliques críticos absurdamente altos.
- **Visual**: Pets com habilidades possuem uma descrição especial no inventário.

#### Sistema de Pets
- Cada pet possui um multiplicador único que aumenta seus ganhos por clique
- Pets são organizados por raridade no inventário
- Visual com efeitos de glow baseados na raridade
- Animação de flutuação em cada pet card

#### Sistema de Progresso
- **Conquistas**: 3 marcos de progresso para desbloquear novos ovos
- **Estatísticas**: Moedas, Poder/Clique, Total de Cliques, Número de Pets, Rebirths e Ascensões
- **Rebirth**: Reset de progresso (moedas, pets, upgrades) em troca de multiplicador 2x permanente. Requer 100k moedas e 10 pets.
- **Ascensão**: Reset total (incluindo Rebirths) em troca de multiplicador 5x global. Requer 5M moedas e 5 Rebirths.
- **Persistência**: Todo o progresso é salvo automaticamente no localStorage

### 🎨 Componentes Principais

- **ClickButton**: Botão hexagonal central com anéis orbitais animados
- **EggCard**: Cards de ovos com animação de abertura e revelação de pet
- **PetInventory**: Grid responsivo mostrando todos os pets coletados
- **StatsDisplay**: Painel de estatísticas em tempo real
- **ProgressTracker**: Sistema de conquistas com barras de progresso
- **DevTools**: Ferramentas de desenvolvedor (Ctrl+Shift+D para ativar)

## 🚀 Como Jogar

1. **Clique** no botão central para ganhar moedas
2. **Compre ovos** quando tiver moedas suficientes
3. **Colete pets** que aumentam seu poder de clique
4. **Desbloqueie** ovos melhores coletando mais pets
5. **Maximize** seus ganhos com pets lendários!

### Dicas de Progressão
- Comece comprando vários Ovos Básicos para aumentar seu poder inicial
- Foque em desbloquear o Ovo Raro (3 pets) rapidamente
- Pets com maior multiplicador são mais raros dentro de cada ovo
- O poder de clique é a soma de todos os multiplicadores dos seus pets

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Estilização com OKLCH colors
- **Framer Motion** - Animações fluidas
- **Wouter** - Roteamento
- **Shadcn/ui** - Componentes UI
- **Lucide React** - Ícones
- **Sonner** - Toast notifications
- **Nanoid** - Geração de IDs únicos

## 📱 Responsividade

O jogo é totalmente responsivo e funciona em:
- Desktop (1920x1080+)
- Tablet (768px+)
- Mobile (320px+)

## 🎮 Ferramentas de Desenvolvedor

Pressione **Ctrl+Shift+D** para ativar o painel de DevTools:
- +100 Moedas
- +1,000 Moedas
- +100,000 Moedas

Útil para testar rapidamente todas as funcionalidades do jogo!

## 💾 Persistência de Dados

O jogo salva automaticamente:
- Quantidade de moedas
- Todos os pets coletados
- Total de cliques
- Ovos desbloqueados

Os dados são salvos no `localStorage` do navegador e persistem entre sessões.

## 🎯 Balanceamento

O jogo foi cuidadosamente balanceado para proporcionar uma progressão satisfatória:

- **Early Game** (0-3 pets): Foco em cliques manuais e primeiros pets básicos
- **Mid Game** (3-8 pets): Desbloqueio de pets raros e aceleração de ganhos
- **Late Game** (8-15 pets): Pets épicos e preparação para lendários
- **End Game** (15+ pets): Coleção de pets lendários e maximização de poder

## 🎨 Paleta de Cores (OKLCH)

- **Cyan Neon**: `oklch(0.7 0.2 195)` - Primary, borders
- **Magenta Neon**: `oklch(0.65 0.25 320)` - Rare items
- **Orange Glow**: `oklch(0.7 0.2 45)` - Epic items
- **Green Tech**: `oklch(0.75 0.2 145)` - Legendary items
- **Dark Space**: `oklch(0.12 0.02 250)` - Background

## 📄 Estrutura do Projeto

```
client/
├── public/
│   └── images/          # Imagens geradas (ovos, background)
├── src/
│   ├── components/      # Componentes React
│   │   ├── ClickButton.tsx
│   │   ├── EggCard.tsx
│   │   ├── PetInventory.tsx
│   │   ├── StatsDisplay.tsx
│   │   ├── ProgressTracker.tsx
│   │   └── DevTools.tsx
│   ├── contexts/        # Context API
│   │   └── GameContext.tsx
│   ├── data/           # Configuração do jogo
│   │   └── gameData.ts
│   ├── types/          # TypeScript types
│   │   └── game.ts
│   ├── pages/          # Páginas
│   │   └── Home.tsx
│   └── index.css       # Estilos globais
```

## 🎯 Próximas Funcionalidades (Sugestões)

- [x] Sistema de upgrades permanentes
- [x] Ganho passivo de moedas (idle)
- [x] Mais tipos de pets e ovos (20 classes de pets)
- [x] Sistema de missões diárias
- [x] Sistema de Rebirth e Ascensão (Prestige)
- [ ] Leaderboard global
- [ ] Efeitos sonoros e música
- [ ] Animações de partículas mais elaboradas

## 📝 Notas de Desenvolvimento

- Todas as animações usam `framer-motion` para performance otimizada
- O cálculo de poder de clique é feito somando todos os multiplicadores dos pets
- A probabilidade de drop de cada pet é configurável em `gameData.ts`
- O sistema de raridade usa cores OKLCH para consistência visual
- Todas as imagens foram geradas com IA seguindo o tema sci-fi holográfico

---

**Desenvolvido com ❤️ usando React + TypeScript + Framer Motion**

Divirta-se coletando pets holográficos! 🚀✨
