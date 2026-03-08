export interface Project {
  slug: string;
  title: string;
  featured: boolean; 
  tagline: string;
  type: string;
  embedId?: string;
  metadata: {
    role: string;
    year: string;
    genre: string;
    platform: string;
  };
  shortDesc: string;
  fullDescription: string;
  technicalDeepDive: string[];
  tech: string[];
  images: string[];
  githubUrl: string;
  liveUrl: string;
}

export const projectsData: Project[] = [
  {
    slug: 'arcane-ascent',
    title: 'Arcane Ascent',
    featured: true,
    // embedId: '16255455',
    tagline: 'The Void Tower awaits. The only way out is UP.',
    type: 'Atmospheric Platformer',
    metadata: {
      role: 'Lead Developer',
      year: '2026',
      genre: 'Puzzle Platformer',
      platform: 'Windows / Web'
    },
    shortDesc: 'A vertical climber featuring stylized environmental storytelling.',
    fullDescription: 'Arcane Ascent is a 2D puzzle-platformer where the path forward isnt given to you—you have to build it yourself. Trapped in a mystical tower, you wield the power to conjure temporary platforms from thin air. But be warned: your magic is unstable, and your footing will fade away in seconds.',
    technicalDeepDive: [
      'Implemented custom 2D character controller with coyote time.',
      'Developed an object-pooled platform conjuring system.',
      'Created a dynamic camera system based on vertical velocity.',
      'Architected shader-based cues for platform expiration.'
    ],
    tech: ['Unity', 'C#', 'HLSL', '2D Physics'],
    images: ['/images/arcane-1.jpg', '/images/arcane-2.jpg', '/images/arcane-3.jpg'],
    githubUrl: 'https://github.com/ShanmukhaSrinivasa',
    liveUrl: 'https://shanmukha.itch.io/arcane-ascent'
  },
  {
    slug: 'orbit-rogue',
    title: 'Orbit Rogue',
    featured: true,
    embedId:'16321282',
    tagline: 'Stuck in orbit. Destined for glory.',
    type: 'Arcade Roguelite',
    metadata: {
      role: 'Solo Developer',
      year: '2026',
      genre: 'Boss Rush / Bullet Hell',
      platform: 'Web / Windows'
    },
    shortDesc: 'A tactical one-button space shooter with infinite scaling difficulty.',
    fullDescription: 'Orbit Rogue is a high-intensity boss-rush experience where players control a ship locked in a gravitational orbit. Released on February 1, 2026, the game challenges players to survive infinite scaling difficulty while navigating complex bullet-hell patterns. Between encounters, players can utilize a shop system with rerolls to upgrade their arsenal.',
    technicalDeepDive: [
      'Implemented a "One-Button" input architecture for ship navigation.',
      'Developed an infinite difficulty scaling algorithm for boss phases.',
      'Architected a modular Shop system with weighted reroll logic.',
      'Designed procedural bullet patterns using AI state machines.',
      'Optimized browser performance for high-density projectile scenes.'
    ],
    tech: ['Unity', 'C#', 'Roguelite Logic', 'AI State Machines'],
    images: ['/images/orbit-rogue-hero.jpg', '/images/orbit-rogue-shop.jpg', '/images/orbit-rogue-boss.jpg'],
    githubUrl: 'https://github.com/ShanmukhaSrinivasa',
    liveUrl: 'https://shanmukha.itch.io/orbit-rogue'
  },
  {
    slug: 'pixel-dash',
    title: 'Pixel Dash',
    featured: true,
    // embedId:'15838317',
    tagline: 'High-speed reflex testing in a procedural world.',
    type: 'Endless Runner',
    metadata: {
      role: 'Solo Developer',
      year: '2025',
      genre: 'Arcade / Runner',
      platform: 'Web / Windows / Android'
    },
    shortDesc: 'A fast-paced 2D runner with procedural obstacle generation.',
    fullDescription: 'Dive into a beautifully crafted pixel world in this challenging 2D endless parkour platformer. The goal is simple: survive as long as you can. But with procedurally generated platforms, deadly traps, and ever-increasing speed, chasing that new high score will be the ultimate test of your skills. Master intuitive controls to jump over vast chasms, slide under dangerous ledges, and grab onto platforms to save yourself from a fall. Use the coins you collect in-game to visit the shop and personalize your experience, unlocking vibrant new colors for both your hero and the very platforms you run on!',
    technicalDeepDive: [
      'Developed a modular tile-spawning system.',
      'Implemented a "Ghost Trail" VFX system.',
      'Optimized 2D physics collisions for browsers.',
      'Managed dynamic difficulty scaling.'
    ],
    tech: ['Unity', 'C#', '2D Physics', 'Procedural Gen'],
    images: ['/images/pixel-dash-1.jpg','/images/pixel-dash-2.jpg','/images/pixel-dash-3.jpg'],
    githubUrl: 'https://github.com/ShanmukhaSrinivasa',
    liveUrl: 'https://shanmukha.itch.io/pixel-dash'
  },
  {
  slug: 'word-hunter',
  title: 'Word Hunter',
  featured: true,
  embedId:'',
  tagline: 'The ultimate test of vocabulary and speed.',
  type: 'Educational Puzzle',
  metadata: {
    role: 'Solo Developer',
    year: '2025',
    genre: 'Word / Puzzle',
    platform: 'Web / Windows'
  },
  shortDesc: 'A fast-paced vocabulary game focused on quick thinking and pattern recognition.',
  fullDescription: 'Word Hunter is an engaging educational puzzle game developed in late 2025. The core objective is to challenge the player’s vocabulary and speed, requiring them to find and select words from a randomized grid before the timer expires. It emphasizes clean UI feedback and a progressive difficulty curve to keep players engaged.',
  technicalDeepDive: [
    'Developed a randomized grid generation algorithm with weighted letter frequencies.',
    'Implemented a dictionary-check system to validate player inputs in real-time.',
    'Designed a responsive UI layout that adapts to various screen resolutions for web browsers.',
    'Integrated a high-score persistence system to track player progress across sessions.',
    'Optimized text rendering and input detection for a smooth, lag-free experience.'
  ],
  tech: ['Unity', 'C#', 'UI Toolkit', 'Algorithm Design'],
  images: [
    '/images/word-hunter-1.jpg',
    '/images/word-hunter-2.jpg', 
    '/images/word-hunter-3.jpg'
  ],
  githubUrl: 'https://github.com/ShanmukhaSrinivasa',
  liveUrl: 'https://shanmukha.itch.io/word-hunter'
},
{
  slug: 'tic-tac-toe-online',
  title: 'Tic-Tac-Toe Online',
  featured: true,
  embedId:'',
  tagline: 'The classic grid, now on the global network.',
  type: 'Multiplayer Strategy',
  metadata: {
    role: 'Solo Developer',
    year: '2026',
    genre: 'Online Multiplayer / Puzzle',
    platform: 'Web / Windows'
  },
  shortDesc: 'A real-time online multiplayer version of the classic Tic-Tac-Toe with global matchmaking.',
  fullDescription: 'Tic-Tac-Toe Online: Battle of the Board reimagines the classic 3x3 grid for the digital age. This project focused on implementing a robust networking architecture to allow players to compete in real-time battles over the internet. It features a streamlined matchmaking system and a clean, competitive UI designed for low-latency feedback.',
  technicalDeepDive: [
    'Implemented real-time networking using Photon Engine (PUN 2) to handle synchronized game states.',
    'Developed a custom room-based matchmaking system for private and public sessions.',
    'Architected server-authoritative win-condition logic to ensure game integrity across clients.',
    'Designed a responsive UI system that manages network latency with predictive visual cues.',
    'Optimized network traffic by serializing only essential bit-level data for grid updates.'
  ],
  tech: ['Unity', 'C#', 'Photon PUN 2', 'Network Architecture'],
  images: [
    '/images/tic-tac-toe-1.jpg',
    '/images/tic-tac-toe-2.jpg', 
    '/images/tic-tac-toe-3.jpg'
  ],
  githubUrl: 'https://github.com/ShanmukhaSrinivasa',
  liveUrl: 'https://shanmukha.itch.io/tic-tac-toe-online-battle-of-the-board'
},
{
  slug: 'clicky-crates',
  title: 'Clicky Crates',
  featured: true,
  embedId:'',
  tagline: 'Precision clicking meets chaotic physics.',
  type: 'Casual Arcade',
  metadata: {
    role: 'Solo Developer',
    year: '2025',
    genre: 'Arcade / Physics',
    platform: 'Web / Windows'
  },
  shortDesc: 'A high-speed physics-based clicking game where players must clear crates before the screen overflows.',
  fullDescription: 'Clicky Crates is a fast-paced arcade game developed in late 2025. The core gameplay revolves around physics-based interactions where players must destroy crates with precise clicks. The challenge lies in managing a constantly filling screen, requiring the player to maintain high reaction speeds while the system tracks score multipliers and physics collisions in real-time.',
  technicalDeepDive: [
    'Implemented a physics-based collision system for dynamic crate-on-crate interactions.',
    'Developed an object pooling system to handle rapid spawning and destruction of crates without performance drops.',
    'Designed a score multiplier algorithm based on click speed and consecutive accuracy.',
    'Optimized 2D physics performance to ensure a consistent 60FPS in web browsers.',
    'Created a progressive difficulty system that scales spawn rates and crate density over time.'
  ],
  tech: ['Unity', 'C#', '2D Physics', 'Object Pooling'],
  images: [
    '/images/clicky-crates-1.jpg', 
    '/images/clicky-crates-2.jpg',
    '/images/clicky-crates-3.jpg'
  ],
  githubUrl: 'https://github.com/ShanmukhaSrinivasa',
  liveUrl: 'https://shanmukha.itch.io/clicky-crates'
}
];