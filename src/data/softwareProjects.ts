/**
 * Non-game software: apps, tools, libraries, CLIs, backends.
 * Add an entry here and it appears in the Software section, gets its own
 * case-study page at /software/<slug>, and shows up in the ⌘K menu and terminal.
 * Everything below `featured` is optional and only fills out the detail page.
 */
export interface Caption {
  src: string;
  caption: string;
}

export interface SoftwareProject {
  /** URL-safe id, e.g. "task-tracker". Also the page address: /software/<slug>. */
  slug: string;
  title: string;
  /** One-line hook shown under the title. */
  tagline: string;
  /** Kind of project, e.g. "Web App", "Desktop Tool", "CLI", "Library", "API". */
  type: string;
  year: string;
  /** 1–3 sentences on what it does and why it exists. */
  description: string;
  /** Up to ~4 short bullet points: features, technical wins, results. */
  highlights?: string[];
  /** Languages, frameworks and services, most important first. */
  stack: string[];
  /** Cover image in /public/images (WebP recommended, 16:9). */
  image?: string;
  /** Short muted loop (MP4 in /public/videos): plays on card hover and as the page cover. */
  previewVideo?: string;
  /** Presentation images, opened in a full-screen gallery from the card. */
  gallery?: Caption[];
  /** Source code. */
  githubUrl?: string;
  /** Live site, demo, store page or download. */
  liveUrl?: string;
  /** Label for the liveUrl button, e.g. "Get it on itch.io" (default "Open app"). */
  liveLabel?: string;
  /** Shown as a small badge on the card. */
  status?: 'live' | 'in-progress' | 'archived';
  /** Highlight this project with a larger card. */
  featured?: boolean;

  // ---- Case-study page ---------------------------------------------------
  role?: string;
  platform?: string;
  developmentTime?: string;
  teamSize?: string;
  license?: string;
  /** Longer overview for the detail page (falls back to `description`). */
  fullDescription?: string;
  /** Feature areas / modules, shown as chips. */
  modules?: string[];
  problem?: string;
  designGoals?: string[];
  technicalChallenges?: string[];
  solutions?: string[];
  results?: string[];
  lessonsLearned?: string[];
  /** "Under the hood" technical log. */
  technicalDeepDive?: string[];
  /** Product screenshots for the detail page. */
  screenshots?: { desktop?: Caption[]; phone?: Caption[] };
  /** Optional YouTube/Vimeo embed URL for a full walkthrough. */
  videoUrl?: string;
  /** Optional real excerpt from the project's code. */
  codeSnippet?: { title: string; language: string; code: string; caption?: string };
}

const DTD = '/images/software/debug-the-day';

export const softwareProjects: SoftwareProject[] = [
  {
    slug: 'debug-the-day',
    title: 'Debug the Day',
    tagline: 'Debug your day. Level up your life.',
    type: 'Full-stack Web App · PWA',
    year: '2026',
    description:
      'A personal life dashboard I designed and built to run my day from one place: tasks, habits with streaks, money with budgets, EMIs and loans, gold, silver and stock investments with live prices, a gym log, notes, a calendar and a portfolio of my games. Finishing things earns XP, levels and achievements, so the routine feels like a game. It installs on a phone as a PWA and runs for ₹0 a month on free tiers.',
    highlights: [
      'Money stored as exact paise; running balance and month carry-over computed in Postgres',
      'Live gold, silver and stock prices with no API keys; daily SIPs priced on their own day',
      'Row-level security on every table, server-side validation, XP awarded in one transaction',
      '54 design decisions (ADRs), 20 SQL migrations and 179 automated tests',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS 4', 'GSAP', 'PWA'],
    image: `${DTD}-cover.webp`,
    previewVideo: '/videos/debug-the-day-preview.mp4',
    gallery: [
      { src: `${DTD}-cover.webp`, caption: 'Debug your day. Level up your life.' },
      { src: `${DTD}-features.webp`, caption: 'One dashboard for the whole day' },
      { src: `${DTD}-mobile.webp`, caption: 'Made for the phone too: installable as an app' },
      { src: `${DTD}-money.webp`, caption: 'Money, exact to the paisa' },
      { src: `${DTD}-themes.webp`, caption: 'Dark first, light when you want it' },
      { src: `${DTD}-architecture.webp`, caption: 'Simple stack, careful data' },
    ],
    liveUrl: 'https://debugtheday.vercel.app/',
    status: 'live',
    featured: true,

    role: 'Solo designer & developer',
    platform: 'Web · Android (PWA)',
    developmentTime: '2.5 weeks · 48 commits',
    teamSize: 'Solo',
    fullDescription:
      'Debug the Day is a day planner and a game-dev portfolio in one account. Tasks, habits, money, investments, gym sessions, notes and a calendar live side by side, and the work I log on my games feeds the same XP, streaks and levels as everything else. A public profile page then turns that logged work into a portfolio I can share. It is built as a Next.js App Router app on Supabase, installs on Android as a PWA, and is designed to stay fast on a mid-range phone while costing nothing to run.',
    modules: [
      'Today view',
      'Tasks',
      'Habits & streaks',
      'Money & budgets',
      'EMIs & loans',
      'Investments',
      'Gym tracker',
      'Notes',
      'Calendar & reminders',
      'Games tracker',
      'Progress & achievements',
      'Public profile',
      'Ctrl+K command palette',
    ],
    problem:
      'To-do apps track tasks but not the games you ship, and portfolio sites show games but not the work behind them. I wanted one app I open first thing in the morning that runs my whole day, and that doubles as proof of the work I put into my games.',
    designGoals: [
      'The day comes first: the next thing to do or tick is always one tap away.',
      'Progress is earned: XP, streaks and levels are confirmed by the server, never decoration.',
      'Honest state: never imply a save worked before the server confirms it.',
      'Fast on a mid-range Android phone, with motion that never costs responsiveness.',
      'Run for ₹0 a month using only free tiers and open-source libraries.',
    ],
    technicalChallenges: [
      'Keeping money exact across budgets, EMIs, investments and month-to-month carry-over.',
      'Awarding XP exactly once, even when a completion is retried or undone and redone.',
      'Isolating every user’s data while letting them opt in to a public profile.',
      'Showing live gold, silver and stock prices without paid APIs or secret keys.',
      'Getting days, streaks and SIP dates right in one timezone (Asia/Kolkata).',
    ],
    solutions: [
      'Every amount is stored as whole paise; the running balance and carry-over are computed in Postgres.',
      'An XP ledger with a unique key per reward, written by a trigger inside the same transaction.',
      'Row-level security on every table, ownership taken from the server-side session, and no direct writes through the Data API.',
      'Prices from gold-api.com and Yahoo Finance; a daily SIP stores the amount and works out the grams from that day’s price.',
      'Explicit Asia/Kolkata date handling for tasks, habits, streaks and SIPs.',
    ],
    results: [
      'Live on Vercel and Supabase free tiers at ₹0 a month, installable on Android.',
      '13 modules in one account, with per-user feature toggles added after feedback from friends.',
      '54 recorded design decisions, 20 versioned SQL migrations and 179 automated tests.',
      'CI runs lint, type-check, unit tests and a production build on every push.',
    ],
    lessonsLearned: [
      'Writing every decision down as an ADR made a fast-moving solo project easy to reason about.',
      'Money and rewards belong in the database, where a transaction can guarantee them.',
      'Real feedback beat my assumptions: one clear action per page and plainer labels made it easier to use.',
      'Honest loading and offline states build more trust than optimistic UI that might be wrong.',
    ],
    technicalDeepDive: [
      'Next.js 16 App Router with Server Components and Server Actions; strict TypeScript throughout.',
      'Supabase Auth with SSR cookies and a session-refresh proxy; protected routes verified on the server.',
      'Postgres functions for the running balance, month carry-over, budgets pace and EMI arrears.',
      'Idempotent XP: unique ledger rows plus ON CONFLICT DO NOTHING inside the completion transaction.',
      'Habit XP with per-day check-ins and streak bonuses at 7 and 30 days; levels derived from total XP.',
      'Investment buys move money out of the balance without counting as spending; "Match my app" lines values up with an external app.',
      'Database security tests run against an in-memory Postgres (PGlite) in the Node test runner.',
      'GSAP and Lenis motion with reduced-motion fallbacks; WCAG AA contrast and full keyboard support.',
    ],
    screenshots: {
      desktop: [
        { src: `${DTD}-shot-overview.webp`, caption: 'Overview: greeting, quick add, level and XP' },
        { src: `${DTD}-shot-today.webp`, caption: 'Today’s list beside the daily streak and schedule' },
        { src: `${DTD}-shot-tasks.webp`, caption: 'Tasks with due dates, repeats and game links' },
        { src: `${DTD}-shot-habits.webp`, caption: 'Habits with check-ins and streak progress' },
        { src: `${DTD}-shot-money.webp`, caption: 'Money: the balance card, carry-over and month facts' },
        { src: `${DTD}-shot-budgets.webp`, caption: 'Budgets with pace markers' },
        { src: `${DTD}-shot-investments.webp`, caption: 'Investments with live gold and silver prices' },
        { src: `${DTD}-shot-emis.webp`, caption: 'EMIs and loans: still to repay, due this month' },
        { src: `${DTD}-shot-gym.webp`, caption: 'Gym: this week, volume chart and personal records' },
        { src: `${DTD}-shot-games.webp`, caption: 'Games portfolio with stage tracks and weekly time' },
        { src: `${DTD}-shot-progress.webp`, caption: 'Progress: year heatmap and the last seven days' },
        { src: `${DTD}-shot-palette.webp`, caption: 'The Ctrl+K command palette' },
      ],
      phone: [
        { src: `${DTD}-phone-overview.webp`, caption: 'Overview with quick add and level' },
        { src: `${DTD}-phone-today.webp`, caption: 'Today’s tasks and habits' },
        { src: `${DTD}-phone-money.webp`, caption: 'Money balance and month' },
        { src: `${DTD}-phone-investments.webp`, caption: 'Gold and silver totals' },
        { src: `${DTD}-phone-gym.webp`, caption: 'Gym summary and today’s workout' },
        { src: `${DTD}-phone-habits-light.webp`, caption: 'Habits in the light theme' },
      ],
    },
  },
  {
    slug: 'smart-autosave',
    title: 'Smart AutoSave & Scene Backup',
    tagline: 'Never lose a Unity scene again.',
    type: 'Unity Editor Extension',
    year: '2026',
    description:
      'A free, open-source Unity editor tool that quietly saves your work and keeps rolling scene backups. It saves on an interval you choose, saves the instant you press Play (before any script can freeze the editor), never interrupts a drag, and keeps timestamped snapshots you can restore in one click. Available on itch.io and under review on the Unity Asset Store.',
    highlights: [
      'Pre-Play save: scenes hit the disk before any runtime script can freeze the editor',
      'Drag-safe: waits while you hold the mouse, and never saves mid-compile',
      'Rolling backups outside Assets/ with one-click restore and automatic pruning',
      'Live Scene View overlay with a countdown and one-click pause/resume',
    ],
    stack: ['C#', 'Unity Editor API', 'UIElements', 'Overlays API', 'Unity Package Manager'],
    image: '/images/software/smart-autosave-hero.webp',
    previewVideo: '/videos/smart-autosave-preview.mp4',
    gallery: [
      { src: '/images/software/smart-autosave-hero.webp', caption: 'Smart AutoSave: never lose a scene again' },
      { src: '/images/software/smart-autosave-overlay.webp', caption: 'Scene View overlay: live countdown and one-click pause/resume' },
      { src: '/images/software/smart-autosave-settings.webp', caption: 'Every option in one place: Tools → Smart AutoSave Settings' },
      { src: '/images/software/smart-autosave-preplay.webp', caption: 'Pre-Play save: written to disk the instant you press Play' },
      { src: '/images/software/smart-autosave-backups.webp', caption: 'Rolling backups with one-click restore' },
      { src: '/images/software/smart-autosave-aware.webp', caption: 'Every loaded scene, plus edits inside Prefab Mode' },
      { src: '/images/software/smart-autosave-safe.webp', caption: 'Built to stay out of your way' },
    ],
    githubUrl: 'https://github.com/ShanmukhaSrinivasa/Unity-Smart-AutoSave',
    liveUrl: 'https://shanmukha.itch.io/smart-autosave',
    liveLabel: 'Get it on itch.io',
    status: 'live',
    featured: true,

    role: 'Solo developer',
    platform: 'Unity 2021.3+ & Unity 6 · Editor-only',
    teamSize: 'Solo',
    license: 'MIT · free & open source',
    videoUrl: 'https://www.youtube-nocookie.com/embed/gFy-Rloi064',
    fullDescription:
      'Smart AutoSave & Scene Backup is a lightweight, editor-only extension for Unity. It runs in the background of the editor, saving modified scenes, assets and Prefab Mode edits on a timer and again the moment you press Play, so a Play Mode freeze or crash never costs you work. Every save can also drop a timestamped copy of the scene into a Git-ignored backup folder outside Assets/, and the settings window lists those backups with their sizes and a one-click restore. A dockable Scene View overlay shows the countdown and lets you pause it. It installs from a Git URL in the Package Manager or as a .unitypackage, and nothing from it ships in your builds.',
    modules: [
      'Timed auto-save',
      'Pre-Play save',
      'Drag-safe & compile-safe',
      'Multi-scene support',
      'Prefab Mode support',
      'Rolling scene backups',
      'One-click restore',
      'Scene View overlay',
      'Console logs & toasts',
      'Package Manager install',
    ],
    problem:
      'Unity can freeze or crash when a runtime script misbehaves in Play Mode, and Ctrl+S is easy to forget during a long level-design session. One bad moment can wipe out hours of unsaved scene work, and Unity’s own tools offer no rolling history to fall back on.',
    designGoals: [
      'Save automatically without the user ever noticing it happen.',
      'Protect the riskiest moment: the instant you press Play.',
      'Never interfere with what you are doing: no saves mid-drag or mid-compile.',
      'Keep backups useful but invisible to the project, version control and the import pipeline.',
      'Ship as a drop-in, editor-only package with zero setup.',
    ],
    technicalChallenges: [
      'Saving at the right moment without interrupting an active drag or slider.',
      'Saving before Play Mode starts, when scripts may immediately freeze the editor.',
      'Handling several additively loaded scenes and isolated Prefab Mode edits.',
      'Keeping backups out of Assets/ so Unity doesn’t spend time re-importing them.',
      'Persisting settings per machine without touching the project or scene files.',
    ],
    solutions: [
      'An EditorApplication.update loop that skips while GUIUtility.hotControl is set, in Play Mode or while compiling.',
      'A playModeStateChanged hook that saves on ExitingEditMode, the instant Play is pressed.',
      'Iterating the loaded scenes and the current PrefabStage, saving only what is dirty.',
      'Timestamped .unity copies in <ProjectRoot>/AutoSaveBackups/ with an auto-generated .gitignore and pruning to a configurable limit.',
      'Settings stored in EditorPrefs behind typed properties, with sensible defaults and a 5-second minimum interval.',
    ],
    results: [
      'Released free on itch.io and submitted to the Unity Asset Store, where it is under review.',
      'Open source under MIT, installable from a Git URL in the Package Manager or as a .unitypackage.',
      'Editor-only assembly: works with Built-in, URP and HDRP, and adds nothing to player builds.',
      'A 57-second trailer with an original soundtrack and store-ready marketing images.',
    ],
    lessonsLearned: [
      'The best tools are invisible: guarding against drags and compiles mattered more than features.',
      'Editor callbacks like ExitingEditMode let you act at exactly the right moment.',
      'Where files live matters: keeping backups outside Assets/ avoided re-import lag entirely.',
      'Shipping is its own project: store rules, key images, licensing and a trailer took real work.',
    ],
    technicalDeepDive: [
      '[InitializeOnLoad] static constructor hooks EditorApplication.update and playModeStateChanged.',
      'Timer runs on EditorApplication.timeSinceStartup and re-arms safely on the first update after loading.',
      'Saves dirty scenes with EditorSceneManager.SaveOpenScenes() and assets with AssetDatabase.SaveAssets().',
      'Prefab Mode edits saved via PrefabUtility.SaveAsPrefabAsset on the current PrefabStage.',
      'Backups pruned per scene by creation time to keep between 1 and 10 copies.',
      'Restore copies the snapshot over the scene, refreshes the AssetDatabase and reopens it.',
      'Scene View overlay built on the Overlays API with UIElements, reading the live countdown.',
      'Separate editor assembly definition (Shanmukha.AutoSave.Editor) keeps it out of builds.',
    ],
    codeSnippet: {
      title: 'AutoSaveTool.cs · the save loop and the pre-Play save',
      language: 'C#',
      code: `private static void OnEditorUpdate()
{
    if (_nextSaveTime < 0)
    {
        ResetTimer();
    }

    if (!IsEnabled)
    {
        return;
    }

    // Never auto-save in Play Mode or while scripts compile
    if (EditorApplication.isPlayingOrWillChangePlaymode || EditorApplication.isCompiling)
    {
        return;
    }

    // Wait while the user is holding the mouse (dragging an object or slider)
    if (GUIUtility.hotControl != 0)
    {
        return;
    }

    if (EditorApplication.timeSinceStartup >= _nextSaveTime)
    {
        TryAutoSave("Timer");
        ResetTimer();
    }
}

private static void OnPlayModeChanged(PlayModeStateChange state)
{
    // ExitingEditMode fires the instant Play is pressed, before Play Mode starts
    if (IsEnabled && SaveOnPlay && state == PlayModeStateChange.ExitingEditMode)
    {
        TryAutoSave("Pre-Play Mode");
    }
    else if (state == PlayModeStateChange.EnteredEditMode)
    {
        ResetTimer();
    }
}`,
      caption:
        'The editor loop only saves when it is safe to: never in Play Mode, mid-compile or while you are dragging. The Play button gets its own save before any runtime code runs.',
    },
  },
  {
    slug: 'smart-toolkit',
    title: 'Smart Toolkit',
    tagline: 'Free online calculators and converters, ready in one click.',
    type: 'Web Platform · 51 tools',
    year: '2026',
    description:
      'A free collection of 51 browser-based tools and 44 guides: finance calculators written for Indian users, PDF and image tools, developer utilities, creator tools and 16 game-development calculators for Unity, Unreal and Godot work. Everything runs on the visitor’s device, so files and numbers are never uploaded, and there is no sign-up.',
    highlights: [
      '51 tools in 7 categories, 16 of them built for game developers',
      'Runs entirely in the browser: files and numbers never leave the device',
      'Every result shows its working, with 44 guides explaining the maths',
      '530+ regression tests across 78 test files',
    ],
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'pdf-lib', 'PDF.js', 'React Compiler', 'Vercel'],
    image: '/images/software/smart-toolkit-cover.webp',
    previewVideo: '/videos/smart-toolkit-preview.mp4',
    gallery: [
      { src: '/images/software/smart-toolkit-cover.webp', caption: 'Free online calculators and converters, ready in one click' },
      { src: '/images/software/smart-toolkit-gamedev.webp', caption: 'Built for Unity, Unreal and Godot work: sprite atlas, FOV and DLSS tools' },
      { src: '/images/software/smart-toolkit-beyond.webp', caption: 'Beyond games: finance, everyday and developer tools' },
      { src: '/images/software/smart-toolkit-mobile.webp', caption: 'Mobile-first: every tool works on a phone' },
    ],
    liveUrl: 'https://smarttoolkit.app/',
    liveLabel: 'Open Smart Toolkit',
    status: 'live',
    featured: true,

    role: 'Solo designer & developer',
    platform: 'Web · mobile-first',
    developmentTime: 'Jun–Nov 2026 · 267 commits',
    teamSize: 'Solo',
    fullDescription:
      'Smart Toolkit is a single site of small, focused tools for people who arrive from search with one job to finish right now: work out a loan EMI or SIP return, compress an image, merge a PDF, format JSON, size a game texture or match FOV between two games. Each tool is usable in the first screen, updates its answer as you type and shows how the number was worked out, with plain-language guides behind it. For game developers there is a dedicated set of 16 calculators covering texture memory, frame budgets, DLSS and FSR resolutions, sprite atlases, draw calls, LOD distances and more. All processing happens in the browser, the site is free with no account, and it is built to stay fast on a cheap phone.',
    modules: [
      'Game development · 16',
      'Finance · 8',
      'Creator tools · 8',
      'PDF tools · 5',
      'Developer tools · 5',
      'Everyday · 5',
      'Image tools · 4',
      'Guides · 44',
      'Ctrl+K tool search',
    ],
    problem:
      'People usually need an online tool for one small job, and most free tool sites make that harder than it should be: the answer is buried under marketing and sign-up walls, files are uploaded to someone else’s server, and numbers arrive with no explanation. Game developers in particular end up re-deriving the same maths, from VRAM and frame budgets to FOV and render scales, by hand or in spreadsheets.',
    designGoals: [
      'The tool is the page: a visitor can use it in the first screen, not after scrolling.',
      'Show the answer, then explain it, with the working visible so it can be checked.',
      'Private by default: calculations and file conversions happen on the visitor’s device.',
      'Only say what is true: concrete, checkable claims instead of slogans or invented proof.',
      'Fast on a cheap phone, with home, tools and guides feeling like one product.',
    ],
    technicalChallenges: [
      'Merging, splitting and converting PDFs and images without any server.',
      'Keeping 51 different tools consistent in layout, behaviour and quality.',
      'Getting numbers exactly right, including rounding, invalid input and very large values.',
      'Never leaving stale results or downloads on screen after an error or a new upload.',
      'Being found: most visitors land straight on a tool page from a search engine.',
    ],
    solutions: [
      'pdf-lib and PDF.js for PDF work and browser-side image compression and conversion, so files never leave the device.',
      'Central registries for tools, categories and FAQs that drive every page, the directory, search and related-tool links.',
      'Inputs validated before every calculation; errors clear old results and download links, and resets cancel older async work.',
      'A regression test written alongside each fix, running real page handlers under Node’s test runner.',
      'Per-tool FAQs, structured data, a sitemap with last-modified dates and IndexNow pings for search engines.',
    ],
    results: [
      'Live at smarttoolkit.app with 51 tools and 44 guides, free and with no sign-up.',
      'Tool pages score 95–100 on Lighthouse.',
      '78 regression test files with more than 530 test cases.',
      '267 commits between June and November 2026.',
    ],
    lessonsLearned: [
      'Putting the tool above the fold mattered more than any amount of explanatory copy.',
      'Showing the working makes a free calculator trustworthy.',
      'Small correctness bugs (rounding, stale downloads) are what users notice, so each fix gets a test.',
      'A data-driven registry is what makes 51 tools maintainable by one person.',
    ],
    technicalDeepDive: [
      'Next.js 16 App Router with React 19, strict TypeScript and the React Compiler; pages are prerendered and served from Vercel.',
      'Tool, category and FAQ registries in src/data feed every tool page, the directory, search and related tools.',
      'PDF merge, split and page extraction with pdf-lib, rendering with PDF.js, and image compression in the browser.',
      'Operation counters so replacing a file or pressing Reset invalidates older asynchronous work in the PDF tools.',
      'Finance maths written for Indian users: ₹ formatting, lakh and crore, GST inclusive and exclusive.',
      'Structured-data components and per-tool FAQs for search; scripts keep sitemap dates fresh and ping IndexNow.',
      'Regression tests transpile the real TSX pages and call production handlers with Node’s built-in test runner.',
      'Lucide icons imported one by one to keep bundles small; dark, mobile-first design with WCAG 2.1 AA contrast.',
    ],
    screenshots: {
      desktop: [
        { src: '/images/software/smart-toolkit-shot-home-hero.webp', caption: 'Homepage: search, popular tools and the promise' },
        { src: '/images/software/smart-toolkit-shot-home-gamedev.webp', caption: 'The game development band on the homepage' },
        { src: '/images/software/smart-toolkit-shot-game-dev-category.webp', caption: 'Game development category: 16 tools' },
        { src: '/images/software/smart-toolkit-shot-tools-directory.webp', caption: 'The full tools directory' },
        { src: '/images/software/smart-toolkit-shot-texture-memory.webp', caption: 'Texture Memory Calculator' },
        { src: '/images/software/smart-toolkit-shot-dlss-calculator.webp', caption: 'DLSS & FSR Resolution Calculator' },
        { src: '/images/software/smart-toolkit-shot-fov-converter.webp', caption: 'Game FOV Converter' },
        { src: '/images/software/smart-toolkit-shot-sprite-atlas.webp', caption: 'Sprite Atlas Generator' },
        { src: '/images/software/smart-toolkit-shot-emi-calculator.webp', caption: 'EMI Calculator with the working shown' },
        { src: '/images/software/smart-toolkit-shot-guide.webp', caption: 'A guide explaining the maths behind a tool' },
        { src: '/images/software/smart-toolkit-shot-guide-table.webp', caption: 'Guides use worked examples and tables' },
      ],
      phone: [
        { src: '/images/software/smart-toolkit-phone-home-hero.webp', caption: 'Homepage' },
        { src: '/images/software/smart-toolkit-phone-home-gamedev.webp', caption: 'Game development tools' },
        { src: '/images/software/smart-toolkit-phone-fov-converter.webp', caption: 'FOV Converter' },
        { src: '/images/software/smart-toolkit-phone-dlss-calculator.webp', caption: 'DLSS Calculator' },
        { src: '/images/software/smart-toolkit-phone-sprite-atlas.webp', caption: 'Sprite Atlas: adding sprites' },
        { src: '/images/software/smart-toolkit-phone-sprite-atlas-result.webp', caption: 'Sprite Atlas: the packed result' },
        { src: '/images/software/smart-toolkit-phone-emi-calculator.webp', caption: 'EMI Calculator' },
        { src: '/images/software/smart-toolkit-phone-guide.webp', caption: 'A guide on a phone' },
      ],
    },
  },
];

/** Every image for a project's lightbox, in page order. */
export const allSoftwareImages = (p: SoftwareProject): Caption[] => [
  ...(p.gallery ?? []),
  ...(p.screenshots?.desktop ?? []),
  ...(p.screenshots?.phone ?? []),
];
