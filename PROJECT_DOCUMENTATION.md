# PulseBoard: Personalized Content & Intelligence Dashboard
## Technical Project Documentation & Architectural Overview
**Role Application**: Software Development Engineer (SDE) Intern - Frontend Development  
**Author**: SDE Intern Candidate  
**Date**: October 2026  
**Tech Stack**: Next.js 14 (App Router), TypeScript, Redux Toolkit, Tailwind CSS, Framer Motion, Jest, React Testing Library, Playwright  

---

## 1. Executive Summary & Problem Statement

Modern digital professionals, developers, and knowledge workers consume information fragmented across disparate platforms: breaking news from journalism outlets, multimedia recommendations from Spotify and TMDB, and real-time community sentiment from Twitter/X and Instagram.

**PulseBoard** solves this problem by providing a centralized, reactive, and personalized content dashboard. It aggregates multi-source feeds into a single unified stream, allowing users to:
- Customize topic preferences with persistent local state.
- Reorganize content cards via tactile drag-and-drop.
- Perform high-performance debounced searches across all categories.
- Read stories distraction-free in an interactive Reader Mode with AI summaries and media previews.
- Track real-time events via non-intrusive stream queuing.
- Analyze their content consumption habits through interactive analytics.

---

## 2. System Architecture & High-Level Design

### 2.1 Component Architecture
```
+-------------------------------------------------------------------------------+
|                               PulseBoard App                                  |
|                                                                               |
|  +--------------------+  +-------------------------------------------------+  |
|  |      Sidebar       |  |                     Header                      |  |
|  | - Navigation Tabs  |  | - Debounced Search Bar (300ms)                  |  |
|  | - Category Toggles |  | - Dark/Light Theme Toggle (CSS Variables)       |  |
|  | - User Card        |  | - Language Switcher (5 locales)                 |  |
|  |                    |  | - Profile & Settings Triggers                   |  |
|  +--------------------+  +-------------------------------------------------+  |
|                                                                               |
|  +-------------------------------------------------------------------------+  |
|  |                             Active View                                 |  |
|  |                                                                         |  |
|  |  [ For You ]       [ Trending ]       [ Favorites ]     [ Insights ]    |  |
|  |  - Live Ticker     - Viral Badges     - Saved Items     - KPI Metrics   |  |
|  |  - AI Briefing     - Velocity Ranks   - JSON Export     - Category Bars |  |
|  |  - Filter Pills                       - Clear Modal     - Diversity     |  |
|  |  - Reorder Grid                                                         |  |
|  |  - Pagination                                                           |  |
|  +-------------------------------------------------------------------------+  |
|                                                                               |
|  +-------------------------------------------------------------------------+  |
|  |                     Overlays, Drawers & Modals                          |  |
|  |  - ReaderModal (AI Takeaways, Audio Reader, Media Equalizer)            |  |
|  |  - CreatePostModal (Custom User Stories & Validation)                   |  |
|  |  - SettingsModal (Subscriptions, Density, API Keys, Reset)             |  |
|  |  - AuthModal (Profile Editor, Avatar Chooser, Session Mode)             |  |
|  |  - ShortcutsModal (Keyboard Navigation Cheat Sheet)                     |  |
|  |  - ToastContainer (Non-blocking notification system)                    |  |
|  +-------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------+
```

---

## 3. State Management Architecture (Redux Toolkit)

PulseBoard employs **Redux Toolkit (RTK)** to maintain a centralized, immutable, and predictable state layer. The store is modularized into four slices:

### 3.1 `preferencesSlice`
- **Responsibilities**: Subscribed categories (`technology`, `sports`, `finance`, `entertainment`, `science`, `gaming`), dark mode boolean, content density (`compact`, `normal`, `visual`), real-time frequency, language code (`en`, `es`, `fr`, `de`, `hi`), and optional custom API keys (NewsAPI, TMDB).
- **Constraints**: Enforces a minimum-1 category rule to prevent empty dashboard states.
- **Persistence**: Automatically synchronizes with browser `localStorage` on every change via safe serialization helpers with SSR safety.

### 3.2 `feedSlice`
- **Responsibilities**: Master list of content items, active search query, active category filters, format filters (`all`, `news`, `recommendation`, `social`), custom drag-and-drop order IDs (`customOrderIds`), pagination page number, and incoming real-time queue.
- **Async Logic**: `fetchFeedItems` async thunk queries internal API routes (`/api/news`) with fallback resilience to mock data.
- **Non-Jarring Real-Time Queue**: New items from live streams are placed into `pendingRealtimeItems`. A floating banner alerts the user (*"X new updates ready"*), enabling the user to refresh on demand without interrupting their active reading scroll position.
- **Custom Post Injection**: `addNewPost` action allows users to author and publish custom notes or stories directly into the feed.

### 3.3 `favoritesSlice`
- **Responsibilities**: Bookmarked items array and an indexed `itemIds` array for $O(1)$ lookup checks.
- **Persistence**: Automatically synced with `localStorage`.

### 3.4 `authSlice`
- **Responsibilities**: User profile management (display name, email, avatar URL, bio, join date) and authentication state toggles (Logged-in vs Guest Explorer).

---

## 4. Key Engineering Highlights & Innovations

### 4.1 Tactile Drag-and-Drop Reordering (`Framer Motion`)
Using `framer-motion`'s `Reorder.Group` and `Reorder.Item`, users can reorder feed cards with smooth 60 FPS physics-based animations. The reordered IDs are immediately written to local storage, ensuring custom layouts persist across sessions.

### 4.2 Debounced Search Architecture
Input changes are debounced using a custom 300ms timer. The search engine scans across titles, descriptions, source names, author handles, and hashtags. Users can press `/` or `Cmd+K` anywhere on the page to instantly focus the search bar.

### 4.3 In-Dashboard Reader Mode & Media Preview (`ReaderModal`)
Instead of redirecting users externally, clicking any headline opens an interactive reading modal featuring:
- **AI Executive Takeaways**: Synthesized bullet highlights.
- **Interactive Equalizer & Media Player**: Audio waveform animations for Spotify/podcasts.
- **Adjustable Typography**: Font sizing (`A-`, `A`, `A+`) and simulated Text-to-Speech audio reader.

### 4.4 Multi-Language Internationalization (i18n)
Built-in internationalization dictionary supporting 5 languages:
1. 🇺🇸 **English** (`en`)
2. 🇪🇸 **Español** (`es`)
3. 🇫🇷 **Français** (`fr`)
4. 🇩🇪 **Deutsch** (`de`)
5. 🇮🇳 **हिन्दी** (`hi`)

### 4.5 Visual Content Analytics
An interactive insights tab computes real-time statistics:
- Dynamic category breakdown progress meters.
- Content format proportions (News vs Recommendations vs Social).
- Estimated reading time calculation.
- Recommendation engine diversity score.

---

## 5. Testing & Quality Assurance

The codebase includes comprehensive test coverage using **Jest**, **React Testing Library**, and **Playwright**:

```
PASS __tests__/store/preferencesSlice.test.ts
PASS __tests__/store/favoritesSlice.test.ts
PASS __tests__/store/feedSlice.test.ts
PASS __tests__/components/EmptyState.test.tsx
PASS __tests__/components/ContentCard.test.tsx

Test Suites: 5 passed, 5 total
Tests:       21 passed, 21 total
Time:        4.069 s
```

### Test Scenarios Covered:
1. **Category Selection & Constraints**: Toggling categories on/off, verifying minimum-1 category rule, resetting preferences.
2. **Bookmarking Edge Cases**: Toggling favorites, preventing duplicates, clearing all items, JSON export.
3. **Feed Reducer Logic**: Query dispatch, type filtering, drag-and-drop order preservation, pending update queues, custom post creation (`addNewPost`).
4. **Component Rendering & Interactions**: Verifying card metadata, bookmark button interaction, empty state action callbacks.
5. **E2E Test Specifications**: Playwright script (`e2e/dashboard.spec.ts`) testing search debouncing, theme toggles, and profile editing.

---

## 6. Performance & Accessibility (WCAG AA)

- **Optimized Bundle Size**: Next.js 14 code splitting with initial page payload under 72 kB.
- **Image Fallback Boundary**: Custom error handling prevents broken image icons by automatically rendering category gradients.
- **Keyboard First**: Comprehensive keybindings (`/`, `D`, `N`, `1-4`, `S`, `P`, `?`, `Esc`).
- **WCAG AA Compliance**: High-contrast color palettes for both light mode and dark mode.

---

## 7. Submission Checklist & Links

| Item | URL / Location |
| :--- | :--- |
| **GitHub Repository** | [https://github.com/shannu144/PulseBoard](https://github.com/shannu144/PulseBoard) |
| **Live Hosted Link** | `https://pulseboard-dashboard.vercel.app` (deploy via Vercel) |
| **Demo Video (Loom)** | `https://www.loom.com/share/your-loom-id` |
| **Project Documentation** | Google Doc Link (see README) |
