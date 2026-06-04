# Portfolio — Tech Stack & Project Scaffold Plan

## Context

Fresh repo at `/Users/viveka/Documents/Projects/portfolio` — no package.json, no source files. Goal is to nail down the complete tech stack before writing any code, then scaffold the project structure. Portfolio is **frontend-only, React-based (Vite)**, no Next.js, no backend. Targeting a **Fullstack Engineer** job search audience with a **glassmorphism + gradient** aesthetic (deep dark navy-black bg, frosted glass cards, violet→cyan→pink mesh gradients), adaptive layout, dark/light mode, animation-heavy but lightweight.

Sections selected: Hero + About/Bio, Work Experience, Skills/Tech Stack, Contact. No Projects section.

---

## Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Framework | **Vite + React 19** | Lightning-fast HMR dev server; outputs a pure static `dist/` folder; no server-side machinery |
| Language | **TypeScript** (strict mode) | Industry standard |
| Styling | **Tailwind CSS v4** | CSS-first `@theme {}` token config in `index.css`; every token is a CSS custom property; Lightning CSS engine |
| Dark/Light mode | **Custom ThemeContext** | Sets `data-theme` on `<html>` + persists to `localStorage` + respects `prefers-color-scheme`; no extra package needed |
| Animation | **motion** (formerly framer-motion) | Declarative `whileInView`, `AnimatePresence`, layout animations; tree-shakeable |
| Smooth scroll | **lenis** | GPU-accelerated scroll inertia; ~3 KB gzipped |
| Fonts | **@fontsource-variable/geist-sans** + **@fontsource-variable/geist-mono** | Self-hosted variable fonts; CSS import in `index.css`; zero Google CDN calls; no layout shift |
| Icons | **lucide-react** | Per-icon tree-shaking; stroke SVGs inherit `currentColor` |
| Class utils | **clsx** + **tailwind-merge** | Safe conditional class composition via shared `cn()` utility |

**Bootstrap command:**
```bash
npm create vite@latest . -- --template react-ts
```
Run inside the repo root — Vite will set up React + TypeScript with `vite.config.ts`, `tsconfig.json`, and `index.html`.

**Additional installs after bootstrap:**
```bash
npm install motion lenis geist lucide-react clsx tailwind-merge class-variance-authority
npm install -D tailwindcss tailwindcss-animate @fontsource-variable/geist-sans @fontsource-variable/geist-mono prettier
```

**Full `package.json` shape:**
```json
{
  "dependencies": {
    "react": "^19",
    "react-dom": "^19",
    "motion": "^12",
    "lenis": "^1",
    "lucide-react": "^1",
    "clsx": "^2",
    "tailwind-merge": "^3",
    "class-variance-authority": "^0.7"
  },
  "devDependencies": {
    "vite": "^6",
    "@vitejs/plugin-react": "^4",
    "typescript": "^6",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/node": "^25",
    "tailwindcss": "^4",
    "tailwindcss-animate": "^1",
    "@fontsource-variable/geist-sans": "latest",
    "@fontsource-variable/geist-mono": "latest",
    "eslint": "^10",
    "eslint-plugin-react-hooks": "^5",
    "@typescript-eslint/eslint-plugin": "^8",
    "prettier": "^3"
  }
}
```

---

## Aesthetic — Glassmorphism + Gradient

Color system anchored in `src/index.css` using `oklch()` for perceptually uniform gradient midpoints:

```css
@import "@fontsource-variable/geist-sans";
@import "@fontsource-variable/geist-mono";
@import "tailwindcss";
@import "tailwindcss-animate";

@theme {
  /* dark default */
  --color-bg:      oklch(6% 0.04 265);   /* #050510 — deep navy-black */
  --color-fg:      oklch(95% 0 0);
  --color-muted:   oklch(45% 0 0);
  --color-accent1: oklch(72% 0.19 270);  /* violet */
  --color-accent2: oklch(72% 0.18 200);  /* cyan */
  --color-accent3: oklch(72% 0.20 330);  /* pink */
  --color-border:  oklch(100% 0 0 / 0.08);
  --font-sans: "Geist Variable", system-ui, sans-serif;
  --font-mono: "Geist Mono Variable", monospace;
}

[data-theme="light"] {
  --color-bg:      oklch(98% 0.01 265);
  --color-fg:      oklch(10% 0 0);
  --color-muted:   oklch(50% 0 0);
  --color-accent1: oklch(52% 0.19 270);
  --color-accent2: oklch(52% 0.18 200);
  --color-accent3: oklch(52% 0.20 330);
  --color-border:  oklch(0% 0 0 / 0.08);
}

.glass {
  background: rgb(255 255 255 / 0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
}
```

---

## Theme Context (no extra package)

`src/lib/theme.tsx`:
```tsx
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'
const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark') }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
```

---

## Project Structure

```
portfolio/
├── .ai/
│   ├── context.md
│   └── implementation-plan/
│       └── 01-tech-stack.md        ← copy this plan here after scaffold
├── public/
│   └── favicon.ico
├── src/
│   ├── main.tsx                    ← ReactDOM.createRoot; wraps App in ThemeProvider
│   ├── App.tsx                     ← Lenis init, assembles Nav + all sections + Footer
│   ├── index.css                   ← font imports, @theme tokens, .glass, base styles
│   ├── components/
│   │   ├── ui/                     ← Minimal primitives
│   │   │   ├── button.tsx
│   │   │   ├── badge.tsx
│   │   │   └── gradient-text.tsx
│   │   ├── sections/               ← One file per page section
│   │   │   ├── hero.tsx
│   │   │   ├── about.tsx
│   │   │   ├── work.tsx
│   │   │   ├── skills.tsx
│   │   │   └── contact.tsx
│   │   ├── layout/
│   │   │   ├── nav.tsx             ← Sticky glass navbar + theme toggle button
│   │   │   └── footer.tsx
│   │   └── motion/                 ← Reusable animation wrapper components
│   │       ├── fade-in.tsx         ← whileInView scroll reveal
│   │       ├── stagger.tsx         ← stagger children with delay offsets
│   │       └── text-reveal.tsx     ← word/char split reveal animation
│   ├── lib/
│   │   ├── cn.ts                   ← clsx + tailwind-merge `cn()` utility
│   │   ├── lenis.ts                ← Lenis instance init, exported singleton
│   │   └── theme.tsx               ← ThemeContext + ThemeProvider (as above)
│   ├── hooks/
│   │   └── use-scroll-progress.ts  ← Page scroll % for nav indicator bar
│   ├── data/
│   │   ├── work.ts                 ← Typed job history array
│   │   └── skills.ts               ← Typed skills/tech list
│   └── types/
│       └── index.ts                ← Shared TS interfaces (WorkEntry, Skill, etc.)
├── index.html                      ← Vite entry HTML; set lang, meta, title here
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── .eslintrc.json
├── .prettierrc
└── package.json
```

---

## `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

---

## Implementation Steps

1. **Bootstrap** — Run `npm create vite@latest . -- --template react-ts` in the repo root. Accept overwrite prompts.
2. **Install extras** — `npm install motion lenis lucide-react clsx tailwind-merge class-variance-authority` and dev deps `tailwindcss tailwindcss-animate @fontsource-variable/geist-sans @fontsource-variable/geist-mono prettier`.
3. **Set up Tailwind v4** — Remove generated Tailwind config file if any; move all config into `src/index.css` via `@theme {}`.
4. **Write `.ai/implementation-plan/01-tech-stack.md`** — Save this plan there for context keeping.
5. **Scaffold core files** — `src/lib/cn.ts`, `src/lib/theme.tsx`, `src/lib/lenis.ts`, `src/types/index.ts`.
6. **Wire up `main.tsx` + `App.tsx`** — ThemeProvider wrap, Lenis init effect, section assembly.
7. **Data layer** — Populate `src/data/work.ts` and `src/data/skills.ts` with placeholder typed data.
8. **Build sections in order** — Hero → Nav → About → Work → Skills → Contact → Footer.
9. **Animation pass** — Wrap sections in `FadeIn`/`Stagger` motion components once content is confirmed.

---

## Verification

- `npm run dev` — site loads at `localhost:5173`, no console errors
- `npm run build` — `dist/` contains valid static HTML/CSS/JS
- Dark/light toggle persists across page refreshes
- `data-theme` attribute updates on `<html>` (check DevTools)
- Responsive at 375px (mobile), 768px (tablet), 1440px (desktop)
- Glass cards render with blur in Chrome, Firefox, Edge (`backdrop-filter` supported in all three)
- Animations trigger on scroll into view, not on page load
