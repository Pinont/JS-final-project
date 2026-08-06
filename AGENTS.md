# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component and the usual starting point for UI work
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.

## Application

This project is an **Infisical-inspired security infrastructure landing page** with an integrated design system. The app has two views toggled by a floating pill in the bottom-right corner.

### Views

- **Landing** — full marketing page (`src/App.tsx`, all section components inline)
- **Design System** — component/token reference (`src/DesignSystem.tsx`)

### Key files

- `src/App.tsx` — all landing page sections plus the view-switcher shell; imports `DesignSystem`
- `src/DesignSystem.tsx` — standalone design system explorer with sidebar nav and 11 sections
- `src/index.css` — Google Font imports (must stay at top), Tailwind v4, CSS custom properties, keyframe animations, utility classes

### Fonts

Three families are imported via Google Fonts CSS2 `@import` in `src/index.css` (must remain the first statements in the file):

| Family | Weight | Use |
|---|---|---|
| `Outfit` | 300–800 | Display headings, nav brand, section titles |
| `Inter` | 300–600 | Body copy, labels, UI text |
| `JetBrains Mono` | 400–600 | Terminal blocks, code snippets, mono tags |

Apply with utility classes `.font-display` (Outfit), default body (Inter), `.font-mono` (JetBrains Mono) — defined in `src/index.css`.

### Design tokens (CSS custom properties)

All tokens live in `:root` in `src/index.css`. Do not redefine them inline or in component files.

| Token | Value | Role |
|---|---|---|
| `--background` | `#09090e` | Page ground |
| `--card` | `#0f1117` | Card / panel surface |
| `--muted` | `#13151e` | Subdued surface |
| `--primary` | `#a8ff3e` | Infisical lime-green — CTAs, active states, success |
| `--accent` | `#ff6b35` | Firecrawl orange — secondary actions, warnings |
| `--accent-alt` | `#b94fff` | Purple — PAM / privileged access |
| `--cyan` | `#00d4ff` | Certificate management |
| `--foreground` | `#f0f2f5` | Primary text |
| `--muted-foreground` | `#6b7280` | Secondary / caption text |
| `--border` | `#1e2230` | Hairline rules, card borders |

### Color usage conventions

- Primary actions and success states → `--primary` (`#a8ff3e`)
- Destructive / error states → `#f87171`
- Warning / expiry states → `#fbbf24`
- Agent proxy / Firecrawl theming → `--accent` (`#ff6b35`)
- Iridescent gradient text → `.iridescent` utility class
- Glow text on green headlines → `.glow-green` utility class

### Animation utilities (defined in `src/index.css`)

| Class | Effect |
|---|---|
| `.animate-marquee` | Infinite horizontal scroll (logo strip) |
| `.animate-float` | Gentle vertical bob |
| `.animate-pulse-glow` | Green box-shadow pulse |
| `.animate-blink` | Cursor blink |
| `.animate-gradient-x` | Animated gradient background |
| `.animate-fade-in-up` | One-shot fade + slide in |

### Structural conventions

- All static data arrays live at the top of the file before component definitions, named in `SCREAMING_SNAKE_CASE`.
- Inline `onMouseEnter`/`onMouseLeave` handlers are used for hover states (no Tailwind `hover:` on dynamic color tokens).
- Cast `e.currentTarget` to `HTMLElement` when setting `.style` properties in hover handlers to satisfy TypeScript.
- Sections are self-contained functional components; no shared context or state between them except the top-level `view` toggle in `App`.
- The design system sidebar uses `href="#id"` anchor links with an `onClick` to track the active section in local state.
