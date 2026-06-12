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

  videoUrl?: string;

  // CASE STUDY DATA

  developmentTime?: string;
  teamSize?: string;

  problem?: string;

  designGoals?: string[];

  technicalChallenges?: string[];

  solutions?: string[];

  results?: string[];

  lessonsLearned?: string[];
}

export const projectsData: Project[] = [
  {
    slug: 'arcane-ascent',
    developmentTime: '2 Weeks',

    teamSize: 'Solo Developer',

    problem:
      'Create a platformer that encourages players to think creatively about movement rather than simply jumping between predefined platforms.',

    designGoals: [
      'Create a unique traversal mechanic.',
      'Encourage planning and timing-based gameplay.',
      'Support vertical progression through environmental puzzles.',
      'Provide responsive and satisfying player movement.',
    ],

    technicalChallenges: [
      'Managing temporary platform lifecycles.',
      'Providing clear feedback before platform expiration.',
      'Maintaining responsive movement during precision jumps.',
      'Designing levels around a player-generated mechanic.',
    ],

    solutions: [
      'Implemented pooled platform objects with configurable lifetimes.',
      'Created shader-based visual cues for platform expiration states.',
      'Built a custom movement controller with coyote time and jump buffering.',
      'Designed modular vertical levels that support multiple traversal strategies.',
    ],

    results: [
      'Delivered a unique platforming experience centered on player-created paths.',
      'Achieved responsive and reliable movement controls.',
      'Successfully combined puzzle-solving with precision platforming.',
      'Released a polished and playable web build.',
    ],

    lessonsLearned: [
      'Player-generated mechanics require extensive level iteration.',
      'Visual feedback is critical when working with temporary gameplay objects.',
      'Small movement improvements significantly impact player experience.',
      'Puzzle-platformer design benefits from multiple valid solutions.',
    ],

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
      'Developed a custom 2D character controller featuring coyote time, jump buffering, and responsive airborne movement.',
      'Implemented an object-pooled platform conjuring system to minimize runtime allocations and improve performance.',
      'Created a temporary platform lifecycle framework with timed expiration and visual state feedback.',
      'Designed a dynamic camera system that adapts to player velocity and vertical progression.',
      'Implemented shader-driven visual indicators to communicate platform stability and remaining lifetime.',
      'Built modular level components that support vertical puzzle and traversal-based gameplay design.'
    ],
    tech: ['Unity', 'C#', 'HLSL', '2D Physics'],
    images: ['/images/arcane-1.jpg', '/images/arcane-2.jpg', '/images/arcane-3.jpg'],
    githubUrl: 'https://github.com/ShanmukhaSrinivasa',
    liveUrl: 'https://shanmukha.itch.io/arcane-ascent',
    videoUrl: "https://www.youtube.com/embed/yJryDfhwSu0?si=W8NnDO8f3S8j84Ei"
  },

  {
    slug: 'orbit-rogue',
    developmentTime: '3 Weeks',

    teamSize: 'Solo Developer',

    problem:
      'Create a replayable bullet-hell roguelite that remains challenging while using a one-button control scheme.',

    designGoals: [
      'Create accessible controls',
      'Provide meaningful progression',
      'Encourage replayability',
      'Deliver satisfying boss encounters',
    ],

    technicalChallenges: [
      'Balancing infinite difficulty scaling',
      'Generating varied bullet patterns',
      'Maintaining browser performance',
      'Designing meaningful shop upgrades',
    ],

    solutions: [
      'Implemented progressive scaling curves',
      'Built modular AI-driven attack phases',
      'Optimized projectile handling systems',
      'Created weighted shop reroll logic',
    ],

    results: [
      'Stable browser performance',
      'Replayable gameplay loop',
      'Infinite scaling difficulty system',
      'Successful public web release',
    ],

    lessonsLearned: [
      'Difficulty balancing requires extensive playtesting',
      'Data-driven systems improve iteration speed',
      'Player progression greatly increases retention',
    ],
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
    liveUrl: 'https://shanmukha.itch.io/orbit-rogue',
    videoUrl: "https://www.youtube.com/embed/A2VvaAXCKpo?si=VMz3rReXlMNNMuJE"
  },
  {
    slug: 'dash-and-doom',
    title: 'Dash & Doom',
    featured: true,

    tagline: 'Run faster. Survive longer. The Doom never stops.',

    type: 'Endless Runner',

    metadata: {
    role: 'Solo Developer',
    year: '2026',
    genre: 'Arcade / Endless Runner',
    platform: 'Android / Web / Windows'
    },

    shortDesc:
    'An endless runner featuring procedural level generation, adaptive difficulty scaling, collectible power-ups, and infinite progression designed for long-term replayability.',

    fullDescription:
    'Dash & Doom is a fast-paced endless runner built around procedural content generation and escalating challenge. Players navigate an ever-changing world filled with hazards, obstacles, and collectible rewards while attempting to survive for as long as possible. As progression increases, the game dynamically adjusts difficulty through faster obstacle patterns, denser level layouts, and increasingly demanding reaction windows. The project focuses on creating an endlessly replayable experience through procedural systems, progression mechanics, and scalable gameplay architecture designed for future content expansion.',

    developmentTime: 'Ongoing',

    teamSize: 'Solo Developer',

    problem:
    'Create an endless runner that remains engaging over long play sessions by combining procedural generation, scalable difficulty, and progression systems while maintaining smooth performance across multiple platforms.',

    designGoals: [
    'Create infinite replayability through procedural content.',
    'Maintain responsive and satisfying player controls.',
    'Gradually increase challenge without overwhelming players.',
    'Support future content expansion with modular systems.',
    'Provide rewarding progression and score-chasing gameplay.'
    ],

    technicalChallenges: [
    'Generating endless level layouts without repetition.',
    'Balancing dynamic difficulty progression.',
    'Maintaining performance during long gameplay sessions.',
    'Managing obstacle spawning and cleanup efficiently.',
    'Supporting multiple themes and environment variations.'
    ],

    solutions: [
    'Developed a modular procedural generation framework.',
    'Implemented adaptive difficulty scaling based on player progression.',
    'Used object pooling systems to reduce runtime allocations.',
    'Created reusable obstacle and environment modules.',
    'Built scalable game systems designed for future content additions.'
    ],

    results: [
    'Delivered a highly replayable endless runner experience.',
    'Achieved stable performance across target platforms.',
    'Created a foundation for future content updates and expansions.',
    'Successfully combined procedural generation with progression systems.',
    'Prepared the project for Android release and long-term support.'
    ],

    lessonsLearned: [
    'Procedural systems require extensive testing to avoid repetitive patterns.',
    'Difficulty scaling has a major impact on player retention.',
    'Object pooling is critical for endless gameplay scenarios.',
    'Modular architecture significantly simplifies future content additions.',
    'Player feedback is essential for balancing progression systems.'
    ],

    technicalDeepDive: [
    'Developed a modular procedural level generation framework for endless gameplay.',
    'Implemented adaptive difficulty scaling systems based on player progression and survival time.',
    'Built an object pooling architecture to efficiently manage obstacles, collectibles, and environment assets.',
    'Created reusable gameplay modules supporting future content and theme expansion.',
    'Optimized gameplay systems for mobile devices while maintaining smooth performance.',
    'Designed progression systems that reward long-term player engagement and replayability.'
    ],

    tech: [
    'Unity',
    'C#',
    'Procedural Generation',
    'Object Pooling',
    'Mobile Optimization'
    ],

    images: [
    '/images/pixel-dash-1.jpg',
    '/images/pixel-dash-2.jpg',
    '/images/pixel-dash-3.jpg'
    ],

    githubUrl: 'https://github.com/ShanmukhaSrinivasa',

    liveUrl: 'https://shanmukha.itch.io/pixel-dash'
  },


  {
    slug: 'last-service',

    title: 'Last Service',

    featured: true,

    tagline: 'The station is closed. One final task remains.',

    type: '3D Psychological Horror',

    metadata: {
    role: 'Solo Developer',
    year: '2025',
    genre: 'Horror / Exploration',
    platform: 'Windows'
    },

    shortDesc:
    'A 3D atmospheric horror experience focused on exploration, environmental storytelling, objective-driven progression, and psychological tension.',

    fullDescription:
    'Last Service is a first-person horror experience set within an isolated gas station where players must restore power, complete critical tasks, and uncover the truth behind a series of unsettling events. Rather than relying solely on jump scares, the project emphasizes atmosphere, environmental storytelling, and audio-driven tension to create a persistent feeling of unease. Players navigate dark environments using a flashlight, interact with objectives, manage inventory items, and avoid a hostile presence while piecing together clues hidden throughout the station.',

    developmentTime: '1 Week',

    teamSize: 'Solo Developer',

    problem:
    'Create a short horror experience capable of building tension through atmosphere, exploration, and environmental storytelling rather than relying entirely on scripted scares.',

    designGoals: [
    'Create a believable and immersive horror environment.',
    'Build tension through audio and lighting rather than excessive jump scares.',
    'Guide players through objective-driven exploration.',
    'Use environmental storytelling to communicate narrative elements.',
    'Maintain player engagement through interactive gameplay systems.'
    ],

    technicalChallenges: [
    'Creating believable tension without constant enemy encounters.',
    'Balancing darkness and visibility using dynamic lighting.',
    'Managing multiple interconnected gameplay systems.',
    'Designing exploration objectives that remain intuitive.',
    'Integrating AI behavior into a constrained environment.'
    ],

    solutions: [
    'Implemented dynamic lighting and flashlight systems to control visibility.',
    'Designed environmental storytelling elements to naturally guide player progression.',
    'Built modular objective and interaction systems for gameplay flexibility.',
    'Developed enemy AI behavior to create unpredictable encounters.',
    'Used layered audio systems to reinforce tension and player awareness.'
    ],

    results: [
    'Delivered a complete atmospheric horror experience within a one-week development cycle.',
    'Successfully combined exploration, objectives, and horror elements.',
    'Created a strong sense of tension using environmental and audio design.',
    'Established a reusable framework for future first-person horror projects.'
    ],

    lessonsLearned: [
    'Audio design is one of the most powerful tools for building player tension.',
    'Lighting dramatically influences player perception and atmosphere.',
    'Environmental storytelling can communicate narrative without extensive dialogue.',
    'Objective-driven gameplay helps maintain pacing within exploration-heavy experiences.',
    'Small environmental details significantly improve immersion.'
    ],

    technicalDeepDive: [
    'Implemented a first-person flashlight system with dynamic lighting controls.',
    'Developed enemy AI behaviors for environmental pursuit and player pressure.',
    'Created an inventory and interaction framework supporting objective progression.',
    'Designed modular door and interactable systems for environmental gameplay.',
    'Implemented checkpoint-based save functionality for player progression.',
    'Built layered audio systems including footsteps, ambient sounds, and tension cues.',
    'Utilized environmental storytelling techniques to communicate narrative context.',
    'Optimized lighting and interaction systems for stable gameplay performance.'
    ],

    tech: [
    'Unity',
    'C#',
    'Enemy AI',
    'Inventory System',
    'Lighting Systems',
    'Environmental Storytelling'
    ],

    images: [
    '/images/last-service-1.jpg',
    '/images/last-service-2.jpg',
    '/images/last-service-3.jpg'
    ],

    githubUrl: 'https://github.com/ShanmukhaSrinivasa',

    liveUrl: 'https://shanmukha.itch.io/last-service'
  },

  {
    slug: 'zombie-rush',

    title: 'Zombie Rush',

    featured: true,

    tagline: 'Survive the horde. Adapt or be overrun.',

    type: 'First-Person Survival Shooter',

    metadata: {
    role: 'Solo Developer',
    year: '2025',
    genre: 'FPS / Wave Survival',
    platform: 'Windows'
    },

    shortDesc:
    'A first-person wave survival shooter built in Unreal Engine, featuring scalable zombie AI, progressive difficulty systems, weapon-based combat, and performance-optimized enemy management.',

    fullDescription:
    'Zombie Rush is a first-person survival shooter developed in Unreal Engine where players must withstand increasingly difficult waves of zombies while managing resources, maintaining accuracy, and adapting to escalating threats. The project focuses on large-scale enemy encounters, responsive weapon systems, AI-driven enemy behavior, and dynamic difficulty progression. As waves advance, zombie counts, movement patterns, and combat pressure increase, creating a constantly evolving survival challenge. The game combines combat mechanics, progression systems, and performance-conscious architecture to deliver a smooth and engaging FPS experience.',

    developmentTime: '1 Month',

    teamSize: 'Solo Developer',

    problem:
    'Create a wave-based survival shooter capable of handling large numbers of AI-controlled enemies while maintaining responsive combat, stable performance, and progressively challenging gameplay.',

    designGoals: [
    'Deliver satisfying first-person combat.',
    'Create escalating survival-focused gameplay.',
    'Support large zombie encounters without sacrificing performance.',
    'Maintain engaging progression through wave-based difficulty scaling.',
    'Provide rewarding combat feedback and player progression.'
    ],

    technicalChallenges: [
    'Managing large numbers of active zombie AI.',
    'Optimizing AI pathfinding and navigation.',
    'Balancing wave progression and difficulty scaling.',
    'Maintaining performance during high-density combat scenarios.',
    'Creating responsive and impactful weapon systems.'
    ],

    solutions: [
    'Implemented scalable zombie spawning and wave-management systems.',
    'Optimized AI navigation and pathfinding behaviors.',
    'Developed progressive difficulty scaling tied to wave progression.',
    'Utilized object pooling and performance-conscious spawning systems.',
    'Designed weapon mechanics focused on responsiveness and player feedback.'
    ],

    results: [
    'Successfully delivered a complete first-person survival shooter experience.',
    'Supported large-scale zombie encounters while maintaining stable performance.',
    'Created scalable gameplay systems for future enemy and weapon additions.',
    'Established a reusable framework for wave-based combat experiences.'
    ],

    lessonsLearned: [
    'AI performance becomes increasingly important as enemy counts grow.',
    'Wave balancing has a major impact on long-term player engagement.',
    'Weapon feel significantly influences player satisfaction.',
    'Optimization should be considered early when designing large-scale encounters.',
    'Difficulty progression requires extensive playtesting to achieve proper pacing.'
    ],

    technicalDeepDive: [
    'Developed scalable zombie AI systems using Unreal Engine behavior frameworks.',
    'Implemented wave-based enemy spawning and progression management systems.',
    'Created weapon handling mechanics focused on responsiveness and combat feedback.',
    'Designed health, damage, and player survival systems.',
    'Built dynamic difficulty scaling tied to wave progression and enemy density.',
    'Implemented object pooling and performance optimizations for large enemy counts.',
    'Developed save systems, UI systems, and gameplay progression tracking.',
    'Optimized AI navigation and pathfinding for stable performance during large encounters.'
    ],

    tech: [
    'Unreal Engine',
    'Blueprints',
    'Zombie AI',
    'Wave Systems',
    'FPS Combat',
    'Performance Optimization'
    ],

    images: [
    '/images/zombie-rush-1.jpg',
    '/images/zombie-rush-2.jpg',
    '/images/zombie-rush-3.jpg'
    ],

    githubUrl: 'https://github.com/ShanmukhaSrinivasa',

    liveUrl: 'https://shanmukha.itch.io/zombie-rush'
  },


  {
  slug: 'word-hunter',
  title: 'Word Hunter',
  featured: true,
  developmentTime: '1 Week',

  teamSize: 'Solo Developer',

  problem:
    'Create an educational puzzle game that remains engaging through procedural generation and fast-paced gameplay rather than relying on static content.',

  designGoals: [
    'Generate unique gameplay sessions every round.',
    'Encourage vocabulary growth through gameplay.',
    'Provide immediate feedback for player actions.',
    'Maintain accessibility while supporting competitive score chasing.',
  ],

  technicalChallenges: [
    'Generating balanced randomized letter grids.',
    'Validating player input efficiently in real time.',
    'Preventing repetitive gameplay patterns.',
    'Maintaining UI responsiveness during rapid input.',
  ],

  solutions: [
    'Implemented weighted letter-frequency generation algorithms.',
    'Created a dictionary-validation system for real-time word checking.',
    'Designed procedural grid generation to ensure gameplay variety.',
    'Built responsive UI systems optimized for quick player interaction.',
  ],

  results: [
    'Delivered a replayable educational puzzle experience.',
    'Successfully generated unique gameplay sessions each round.',
    'Created a scalable foundation for future word-game features.',
    'Maintained responsive performance across supported platforms.',
  ],

  lessonsLearned: [
    'Procedural generation can significantly improve replayability in puzzle games.',
    'Small UI delays have a major impact on player experience.',
    'Algorithm design is critical for balancing educational and gameplay objectives.',
    'Weighted probability systems create more natural gameplay outcomes.',
  ],
  embedId:'',
  tagline: 'The ultimate test of vocabulary and speed.',
  type: 'Educational Puzzle',
  metadata: {
    role: 'Solo Developer',
    year: '2025',
    genre: 'Word / Puzzle',
    platform: 'Web / Windows'
  },
  shortDesc:'An algorithm-driven word puzzle game featuring procedural grid generation, real-time dictionary validation, and progressively challenging gameplay.',
  fullDescription:
  'Word Hunter is a puzzle game designed around procedural content generation and rapid decision-making. Players search for valid words within dynamically generated letter grids while racing against a countdown timer. The project focuses on combining educational gameplay with algorithmic systems such as weighted letter generation, real-time word validation, and progressive difficulty scaling. Each session presents a unique challenge, encouraging pattern recognition, vocabulary expansion, and fast-paced strategic thinking.',
  technicalDeepDive: [
    'Developed a weighted procedural grid-generation algorithm based on letter frequency distributions.',
    'Implemented a real-time dictionary-validation system for immediate player feedback.',
    'Built dynamic difficulty scaling systems to progressively increase challenge.',
    'Designed responsive UI workflows optimized for rapid text selection and input.',
    'Implemented persistent high-score tracking and session statistics management.',
    'Optimized text rendering and validation processes for smooth browser performance.',
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
  developmentTime: '2 Weeks',

  teamSize: 'Solo Developer',

  problem:
    'Create a reliable real-time multiplayer experience using Photon networking.',

  designGoals: [
    'Low-latency gameplay',
    'Simple matchmaking',
    'Reliable synchronization',
    'Clean competitive interface',
  ],

  technicalChallenges: [
    'Maintaining synchronized game states across multiple clients.',
    'Preventing invalid or duplicate player actions.',
    'Managing room creation, joining, and player disconnections.',
    'Handling network latency while preserving gameplay responsiveness.',
  ],

  solutions: [
    'Implemented Photon PUN networking callbacks for reliable event synchronization.',
    'Built an authoritative turn-management system to prevent invalid player actions.',
    'Developed room-based matchmaking supporting private and public sessions.',
    'Created synchronized win-condition validation to ensure consistent game results across clients.',
  ],

  results: [
    'Successfully delivered a fully functional online multiplayer experience.',
    'Achieved reliable game-state replication across connected clients.',
    'Implemented low-friction matchmaking and room management systems.',
    'Created a reusable networking foundation for future multiplayer projects.',
  ],

  lessonsLearned: [
    'Networked applications require significantly more state validation than single-player games.',
    'Authoritative gameplay systems help prevent synchronization issues.',
    'Clear multiplayer feedback improves player confidence during online interactions.',
    'Photon provides powerful networking tools but requires careful architecture planning.',
  ],
  title: 'Tic-Tac-Toe Online',
  featured: true,
  embedId:'',
  tagline:'A classic game rebuilt around modern multiplayer architecture.',
  type: 'Multiplayer Strategy',
  metadata: {
    role: 'Solo Developer',
    year: '2026',
    genre: 'Online Multiplayer / Puzzle',
    platform: 'Web / Windows'
  },
  shortDesc:'A multiplayer strategy game built using Photon PUN 2, featuring real-time synchronization, room-based matchmaking, and authoritative game-state management.',
  fullDescription:
  'Tic-Tac-Toe Online was developed as a networking-focused project designed to explore real-time multiplayer architecture using Photon PUN 2. While the gameplay is based on the classic Tic-Tac-Toe formula, the primary goal was to design and implement reliable client synchronization, matchmaking systems, turn validation, and networked game-state management. The project demonstrates core multiplayer development concepts including room creation, state replication, latency handling, and authoritative gameplay logic while maintaining a simple and accessible player experience.',
  technicalDeepDive: [
    'Implemented real-time multiplayer functionality using Photon PUN 2 networking.',
    'Developed room-based matchmaking systems supporting both private and public sessions.',
    'Built authoritative turn-management logic to ensure game-state consistency.',
    'Designed synchronized win-condition validation across all connected clients.',
    'Optimized network traffic by transmitting only essential gameplay events.',
    'Created responsive multiplayer UI systems that communicate network state and player actions.',
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
  developmentTime: '1 Week',

  teamSize: 'Solo Developer',

  problem:
    'Create a fast-paced arcade game capable of handling large numbers of active physics objects without sacrificing performance or responsiveness.',

  designGoals: [
    'Deliver satisfying physics-based interactions.',
    'Encourage rapid decision-making and precision.',
    'Maintain stable performance during chaotic gameplay.',
    'Provide escalating challenge through scalable difficulty systems.',
  ],

  technicalChallenges: [
    'Managing large numbers of dynamically spawned crates.',
    'Preventing performance degradation from frequent object creation and destruction.',
    'Balancing difficulty progression.',
    'Maintaining smooth physics simulation under heavy load.',
  ],

  solutions: [
    'Implemented an object pooling system to recycle crate instances efficiently.',
    'Optimized physics interactions and collision handling.',
    'Created a progressive spawn-rate system to scale difficulty over time.',
    'Designed score multipliers that reward accuracy and reaction speed.',
  ],

  results: [
    'Maintained stable gameplay performance during high-density scenarios.',
    'Successfully handled large volumes of active physics objects.',
    'Delivered a replayable score-chasing arcade experience.',
    'Created a scalable foundation for future gameplay expansions.',
  ],

  lessonsLearned: [
    'Object pooling is essential for performance-intensive arcade games.',
    'Physics-heavy gameplay requires careful optimization.',
    'Difficulty progression strongly influences player retention.',
    'Reward systems significantly impact player engagement and replayability.',
  ],
  embedId:'',
  tagline: 'Precision clicking meets chaotic physics.',
  type: 'Casual Arcade',
  metadata: {
    role: 'Solo Developer',
    year: '2025',
    genre: 'Arcade / Physics',
    platform: 'Web / Windows'
  },
  shortDesc:'A physics-driven arcade game featuring object pooling, dynamic difficulty scaling, and high-speed reaction-based gameplay.',
  fullDescription:
  'Clicky Crates is a fast-paced arcade experience built around physics simulation, rapid decision-making, and escalating difficulty. Players must quickly eliminate crates before the screen becomes overcrowded, balancing precision and speed to maintain control of the play area. The project focuses on handling large numbers of active physics objects while maintaining smooth performance through optimized spawning systems, object pooling, and scalable difficulty mechanics. As gameplay progresses, crate density and spawn frequency increase, creating increasingly chaotic and challenging scenarios.',
  technicalDeepDive: [
    'Implemented an object pooling architecture to efficiently manage rapid crate spawning and destruction.',
    'Developed optimized physics-based collision systems supporting high object counts.',
    'Created progressive difficulty scaling through dynamic spawn-rate and density adjustments.',
    'Designed a score multiplier framework based on reaction speed and click accuracy.',
    'Optimized browser performance to maintain consistent frame rates during high-density gameplay.',
    'Built scalable gameplay systems capable of supporting future mechanics and content additions.',
  ],
  tech: ['Unity','C#','Object Pooling','2D Physics','Performance Optimization'],
  images: [
    '/images/clicky-crates-1.jpg', 
    '/images/clicky-crates-2.jpg',
    '/images/clicky-crates-3.jpg'
  ],
  githubUrl: 'https://github.com/ShanmukhaSrinivasa',
  liveUrl: 'https://shanmukha.itch.io/clicky-crates'
}


];