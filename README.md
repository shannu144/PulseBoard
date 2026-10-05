# ⚡ PulseBoard - Personalized Content Dashboard
> **Software Development Engineer (SDE) Intern - Frontend Development Assignment**  
> Developed with Next.js 14 (App Router), TypeScript, Redux Toolkit, Tailwind CSS, Framer Motion, and Jest/React Testing Library.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.2-purple?style=flat&logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-Passing-emerald?style=flat)](#-testing)

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: [https://github.com/your-username/personalized-content-dashboard](https://github.com)
- **Live Hosted Application**: [https://pulseboard-dashboard.vercel.app](https://vercel.com)
- **Demo Video**: [Walkthrough Loom / Drive Video Link](https://loom.com)

---

## 🌟 Executive Summary

**PulseBoard** is an enterprise-grade, high-performance content dashboard that aggregates real-time intelligence from **News**, **Entertainment Recommendations (TMDB / Spotify)**, and **Social Media (Twitter/X & Instagram)**. 

Users can personalize their topic subscriptions, drag-and-drop to organize content cards, search with 300ms debouncing, toggle dark/light modes, inspect visual consumption analytics, switch between 5 languages, and save bookmarks with persistent local storage.

---

## 🎯 Requirements Coverage Matrix

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **Personalized Content Feed** | User category preferences (Tech, Sports, Finance, Entertainment, Science, Gaming) stored in Redux & localStorage | ✅ Complete |
| **Multi-Source Ingestion** | News (`/api/news`), Recommendations (`/api/recommendations`), and Social (`/api/social`) with fallback resilience | ✅ Complete |
| **Interactive Content Cards** | High-res imagery, badges, ratings, CTAs ("Read Story", "Play Media", "View Post"), social metrics (likes, retweets, comments) | ✅ Complete |
| **Drag & Drop Organization** | Smooth, tactile card reordering powered by `framer-motion` `Reorder.Group`, persistent across reloads | ✅ Complete |
| **Infinite Scrolling / Pagination**| Dynamic page slicing with "Load More" controls and item counter | ✅ Complete |
| **Dashboard Layout** | Collapsible Sidebar, sticky Header with search and quick actions, Mobile Navigation | ✅ Complete |
| **Trending Section** | Real-time ranked leaderboards (#1, #2, #3...) computed from engagement and viral velocity | ✅ Complete |
| **Favorites Section** | Instant bookmarking, local search, clear confirmation modal, and JSON export | ✅ Complete |
| **Debounced Search** | 300ms debounced search filtering titles, descriptions, hashtags, and authors with keyboard shortcut (`/`) | ✅ Complete |
| **Dark Mode & CSS Variables** | Smooth dark/light theme switching using CSS custom variables & Tailwind `dark` class | ✅ Complete |
| **Redux Toolkit State** | Centralized store with `preferencesSlice`, `feedSlice`, `favoritesSlice`, `authSlice` | ✅ Complete |
| **Testing** | Comprehensive unit & integration tests (Jest + RTL) + Playwright E2E test specs | ✅ Complete |
| **Bonus: Real-time Ingestion** | Live stream polling with simulated real-time event queue and floating banner notification | ✅ Complete |
| **Bonus: Multi-Language (i18n)** | 5 languages: English, Español, Français, Deutsch, हिन्दी | ✅ Complete |
| **Bonus: User Profile & Auth** | Interactive user profile editor, avatar chooser, and login/logout mode | ✅ Complete |
| **Bonus: Visual Analytics** | Interactive KPI cards, category breakdown meters, and content format charts | ✅ Complete |

---

## 🏗️ Architecture & Folder Structure

```
src/
├── app/
│   ├── api/
│   │   ├── news/route.ts            # Dynamic news endpoint with filter query support
│   │   ├── recommendations/route.ts # TMDB & Spotify style recommendation endpoint
│   │   ├── social/route.ts          # Social post streams with hashtags and metrics
│   │   └── realtime/route.ts        # Simulated live stream feed updates
│   ├── globals.css                  # CSS custom properties & theme styles
│   ├── layout.tsx                   # Root layout with StoreProvider & dark theme
│   └── page.tsx                     # Main Dashboard coordinator
├── components/
│   ├── auth/
│   │   └── AuthModal.tsx            # Profile customizer, avatar selector, session toggle
│   ├── feed/
│   │   ├── ContentCard.tsx          # Card with badges, image, metrics, drag handle, favorite
│   │   ├── ContentGrid.tsx          # Framer Motion Reorder drag-and-drop grid
│   │   ├── FeedFilters.tsx          # Format selector, category pills, density switcher
│   │   ├── LiveTicker.tsx           # Real-time event ticker & pending updates banner
│   │   ├── EmptyState.tsx           # Illustrated empty state with reset filter trigger
│   │   └── SkeletonCard.tsx         # Shimmer skeleton loader
│   ├── layout/
│   │   ├── Header.tsx               # Debounced search, theme toggle, lang switcher, profile
│   │   ├── Sidebar.tsx              # Navigation & category checklist
│   │   └── MobileNav.tsx            # Mobile bottom navigation bar
│   ├── providers/
│   │   └── StoreProvider.tsx        # Redux Provider + HTML class theme synchronizer
│   ├── sections/
│   │   ├── ForYouSection.tsx        # Personalized drag-and-drop feed
│   │   ├── TrendingSection.tsx      # Ranked viral cards
│   │   ├── FavoritesSection.tsx     # Bookmarked items with JSON export
│   │   ├── AnalyticsSection.tsx     # Real-time consumption charts & metrics
│   │   └── SettingsModal.tsx        # Full preferences configuration modal
│   └── ui/
│       ├── Badge.tsx                # Category and source badges
│       ├── Button.tsx               # Accessible button with states
│       ├── Modal.tsx                # Accessible animated modal dialog
│       └── NotificationToast.tsx    # Interactive toast container
├── data/
│   └── mockData.ts                  # High-fidelity multi-category fallback dataset
├── store/
│   ├── hooks.ts                     # Typed useDispatch and useSelector
│   ├── index.ts                     # Redux configureStore
│   └── slices/
│       ├── authSlice.ts             # Profile & authentication state
│       ├── favoritesSlice.ts        # Saved bookmarks with localStorage sync
│       ├── feedSlice.ts             # Feed items, search, drag order, pagination
│       └── preferencesSlice.ts      # Categories, theme, density, language, API keys
├── types/
│   └── index.ts                     # TypeScript interfaces
└── utils/
    ├── debounce.ts                  # Debounce helper
    ├── storage.ts                   # SSR-safe localStorage wrapper
    └── translations.ts              # 5-language dictionary
```

---

## 🛠️ State Management with Redux Toolkit

The application state is partitioned into four modular slices:

1. **`preferencesSlice`**:
   - Manages subscribed categories, color scheme (dark/light), card density (`compact`, `normal`, `visual`), real-time frequency, and language.
   - Synchronizes automatically with `localStorage` via `safeStorage` utility.

2. **`feedSlice`**:
   - Maintains feed items, active search queries, active category filters, format filters (`all`, `news`, `recommendation`, `social`), and pagination.
   - Preserves user's custom drag-and-drop order in `customOrderIds`.
   - Contains a pending real-time item queue (`pendingRealtimeItems`) so background updates don't abruptly shift the user's reading position.

3. **`favoritesSlice`**:
   - Maintains bookmarked items and an indexed `itemIds` array for $O(1)$ lookup checks.
   - Automatically writes to `localStorage` on every addition or removal.

4. **`authSlice`**:
   - Handles simulated authentication status, user profile information (name, email, bio), and customized avatar selection.

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js `18.18+` or `20+`
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/personalized-content-dashboard.git
   cd personalized-content-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm run start
```

---

## 🧪 Testing

The repository features comprehensive test coverage across unit tests, reducer logic, component interactions, and E2E flows.

### Running Unit & Integration Tests
```bash
npm test
```

### Test Suites Included:
- **`preferencesSlice.test.ts`**: Verifies category toggling, minimum 1 category constraint, dark mode toggling, density adjustments, language updates, and defaults reset.
- **`favoritesSlice.test.ts`**: Verifies adding bookmarks, toggling off bookmarks, individual removal, and bulk clearing.
- **`feedSlice.test.ts`**: Verifies debounced query dispatch, format filtering, drag-and-drop order persistence, real-time update queues, and pagination.
- **`ContentCard.test.tsx`**: Verifies rendering of titles, source tags, category badges, reading time, and bookmark button interaction.
- **`EmptyState.test.tsx`**: Verifies custom empty state rendering and reset filter callback invocation.

### Running E2E Tests (Playwright)
```bash
npx playwright test
```

---

## ♿ Accessibility & Performance Optimizations

- **Debounced Inputs**: Search queries are throttled with a 300ms debounce to prevent unnecessary re-renders.
- **Accessible ARIA Attributes**: Modals and interactive buttons include `aria-label`, role tags, and keyboard escape listeners.
- **Keyboard Navigation**: Press `/` or `Cmd+K` anywhere to immediately focus the search bar.
- **Color Contrast & Theme Variables**: Full WCAG AA compliant contrast ratios in both Light and Dark modes.
- **Responsive Layout**: Fluid experience across mobile phones (375px+), tablets, laptops, and ultra-wide displays.

---

## 👨‍💻 Author
**Software Development Engineer (SDE) Intern Candidate**  
PulseBoard - Personalized Content Dashboard
