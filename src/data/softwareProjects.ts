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
  /** Shown as a small badge on the card. */
  status?: 'live' | 'in-progress' | 'archived';
  /** Highlight this project with a larger card. */
  featured?: boolean;

  // ---- Case-study page ---------------------------------------------------
  role?: string;
  platform?: string;
  developmentTime?: string;
  teamSize?: string;
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
];

/** Every image for a project's lightbox, in page order. */
export const allSoftwareImages = (p: SoftwareProject): Caption[] => [
  ...(p.gallery ?? []),
  ...(p.screenshots?.desktop ?? []),
  ...(p.screenshots?.phone ?? []),
];
