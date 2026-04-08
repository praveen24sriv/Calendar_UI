# Wall Calendar — Frontend Engineering Assessment

A wall calendar component built with React + Vite as part of a frontend engineering assessment. The goal was to translate a physical wall calendar design into a functional, interactive web component.

Live demo: https://calendar-ui-pied.vercel.app/

---

## What I Built

### Calendar Core
- Full month grid built from scratch using date math — no calendar library
- Leading and trailing days from adjacent months shown in grid
- Month navigation (previous, next, today jump)
- CSS-only flip animation with direction awareness — forward flip when going next, backward when going prev
- Adjacent month hero images preloaded for smoother transitions

### Date Range Selection
- Click a start date, click an end date
- Hover preview shows the range before you commit the second click
- Reverse range handled — if you pick an earlier end date, it corrects automatically
- Range summary bar shows nights count, weekends in range, and holidays in range
- Esc key clears the selection

### Holiday Support
- Fixed Indian public holidays + year-specific movable festivals (Holi, Diwali, etc.)
- Dot indicator on holiday dates in the grid
- Holiday tooltip on hover
- Holiday chip strip below the grid listing that month's holidays
- ARIA labels include holiday context for screen readers

### Notes
- Separate notes per month, keyed by yyyy-MM
- Persisted in localStorage — notes survive page refresh
- Debounced autosave + manual save via button or Cmd/Ctrl+S
- Save status indicator: Typing → Saving → Saved / Autosaved / Save failed
- Character count shown when content exists
- Last saved time shown when content exists
- Quick starter templates: Day plan, Reminders, Wins
- Lined-paper textarea styling

### Theming
- Every month has its own color palette defined as CSS variables
- Tokens cover accent, strong, soft, ghost, ink, muted, and line
- Theme cascades across the entire UI — calendar header, grid, notes panel, layout chrome
- Transitions smoothly when switching months

### Responsive Design
- Desktop: side-by-side split view (calendar left, notes right)
- Mobile: vertically stacked, full-width notes
- Notes panel stretches edge-to-edge on desktop intentionally — mirrors a physical notepad

### Other
- Keyboard shortcuts: ← → to navigate months, Esc to clear range
- Print mode — strips decorative chrome, outputs a clean calendar
- Hero image fallback UI if an asset fails to load
- Hero images converted to .webp via a sharp pipeline (convert-hero-images.mjs)

---

## Why These Choices

**CSS Modules over Tailwind**
The brief specifically called out CSS/styling implementation as an evaluation criterion. Wanted to show actual CSS architecture — grid layout, custom properties, keyframe animations — rather than utility classes. All design tokens live in one globals file and cascade through the app via CSS variables.

**date-fns over a calendar library**
Building the grid from scratch felt like the point of the exercise. date-fns handles just the date math (startOfMonth, eachDayOfInterval, isSameDay) without bringing in any UI opinions.

**CSS-only animations**
The flip animation is purely CSS keyframes triggered by swapping a className. No animation library, no JavaScript timing. Changing the key prop on the grid causes React to remount it which replays the animation naturally.

**Debounced autosave + manual save**
Autosave alone felt too invisible. Manual save alone felt too demanding. Having both — autosave after a short idle period with a visible status indicator, plus a save button for when you want to be sure — felt like the right balance.

**Seasonal theming**
Wanted the UI to feel alive across months, not just functional. Each month has a distinct palette that drives every themed element consistently. January is cool blue, April is a spring violet, October is warm amber, and so on.

**localStorage for notes**
Straightforward frontend-only persistence, exactly as the brief specified. No backend, no complexity.

---

## Trade-offs

- Hero images are local .webp assets converted via sharp — adds to repo size but loads fast and works offline. Unsplash URLs would reduce repo size but break without internet.
- Movable Indian holidays (Holi, Diwali, Eid) are hardcoded per year. A real app would compute or fetch these dynamically.
- No unit tests — prioritized completeness and polish within the assessment timeframe. The component architecture (custom hooks, pure date helpers, isolated components) is written to be testable.
- Keyboard navigation covers month switching and range clearing but not full grid arrow-key navigation — that would require a focus management system that felt out of scope here.

---

## If I Had More Time

- Drag-to-select range instead of click-click
- Full arrow-key grid navigation with proper focus management
- Dynamic movable holiday computation instead of hardcoded values
- Unit tests for the date math and range selection logic
- Swipe gestures for month navigation on mobile

---

## Running Locally

```bash
git clone <https://github.com/praveen24sriv/Calendar_UI>
cd wall-calendar
npm install
npm run dev
```

```bash
npm run build    # production build
npm run preview  # preview production build locally
npm run lint     # run ESLint
```