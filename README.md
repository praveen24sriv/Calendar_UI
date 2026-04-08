# Calendar UI Component

## Standout Highlights
- Built full calendar logic from scratch (month matrix, range selection, leap-year/date handling) without calendar libraries.
- Delivers complete assessment scope: wall-calendar aesthetic, selectable date range, integrated notes, and responsive desktop/mobile UX.
- Uses frontend-only persistence via `localStorage`, matching the no-backend assessment requirement.
- Keeps bundle lean with CSS-only animations and no heavy UI/animation dependencies.
- Auto-shifts calendar accent palette by month for a more alive and seasonal UI.
- Adds hover/focus day tooltips (holiday name, range progress, and today context).
- Shows an animated range summary bar with nights, weekends, and holiday counts.
- Supports keyboard shortcuts: `←`/`→` month navigation, `Enter` day select, `Esc` range reset.
- Supports print mode (`Ctrl+P`) with clean calendar + notes output and hidden UI chrome.

## Architectural Strategy & Tech Stack
- Built with **React + Vite** and zero external calendar/animation libraries.
- **Framework:** React (Vite).
- **Styling:** CSS Modules / Vanilla CSS.
- **Persistence:** `localStorage`.

## Key Engineering Decisions

### 1. Vanilla CSS over Utility Frameworks (Tailwind)
- Used CSS Modules + Vanilla CSS to showcase core CSS architecture.
- **CSS Grid** handles 7x5/7x6 calendar layout math.
- **Flexbox** manages responsive panel structure.
- **CSS Variables** power theme, spacing, and consistency.

### 2. High-Fidelity Assets vs. Performance Budget
- Kept 12 monthly hero images for visual fidelity while optimizing delivery.
- Converted raw JPGs to compressed **WebP** via a custom Node.js + `sharp` script.
- Used **lazy loading** and dynamic imports so only the active month image loads initially.

### 3. State Management & Custom Hooks
- Managed state locally with React hooks to avoid over-engineering.
- Moved business logic into custom hooks like `useCalendar`, `useDateSelection`, and `useNotes`.

### 4. UX & Mobile Layout Priority
- Prioritized calendar interaction on mobile by placing the grid directly below the hero.
- Kept notes below the grid on small screens to reduce friction for primary actions.

### 5. CSS-Only Micro-Interactions
- Implemented month flip transitions with CSS keyframes for zero animation-library overhead.
- Triggered animation by changing a month/year-based React `key` on the grid container.

## Local Development Setup
- Install deps: `npm install`.
- Start dev server: `npm run dev`.
- Build production bundle: `npm run build`.



