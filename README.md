# Interactive Wall Calendar UI (React + Vite)

A polished frontend-only calendar component inspired by a physical wall calendar layout.

## What this project demonstrates

- **Wall calendar aesthetic** with a hero image panel + monthly calendar panel.
- **Date range selection** (start date, end date, preview-on-hover, in-range highlighting).
- **Integrated notes section** with `localStorage` persistence.
- **Responsive layout**:
	- Desktop: side-by-side panels.
	- Mobile: stacked, touch-friendly layout.
- **Bonus UX features**:
	- `Today` quick-jump button.
	- Lightweight holiday markers on common dates.

## Tech stack

- React 19
- Vite 8
- CSS Modules
- date-fns

## Project structure

```text
src/
├── assets/
│   └── hero-image.jpg
├── components/
│   ├── Calendar/
│   ├── Hero/
│   ├── Notes/
│   └── Layout/
├── hooks/
│   ├── useCalendar.js
│   ├── useDateSelection.js
│   └── useNotes.js
├── utils/
│   ├── dateHelpers.js
│   └── classNames.js
├── App.jsx
├── index.css
└── main.jsx
```

## Local development

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Production build

```bash
npm run build
```

## Notes persistence model

Notes are stored client-side in `localStorage` under `calendar-ui-notes-v1`.
Each note is keyed by visible month and selected start date.

## Assessment submission checklist

- [ ] Push this project to a public GitHub/GitLab repository.
- [ ] Record a short demo (Loom/YouTube) showing:
	- Date range selection behavior
	- Notes save + reload behavior
	- Desktop and mobile responsiveness
- [ ] (Optional) Deploy a live demo using Vercel/Netlify/GitHub Pages.

## Customizing the hero image

Replace `src/assets/hero-image.jpg` with your own calendar image to match your preferred aesthetic.
