# CLAUDE.md

## Project
`@gfazioli/mantine-spinner` — an SVG-based loading spinner component for Mantine 9 with customizable segments, multiple animation variants, segment shapes, gradient colors, glow effects, determinate progress mode, and compound components for grouping and overlay display. Requires React 19 and TypeScript 6.

## Commands
| Command | Purpose |
|---------|---------|
| `yarn build` | Build the npm package via Rollup |
| `yarn dev` | Start the Next.js docs dev server (port 9281) |
| `yarn test` | Full test suite (syncpack + oxfmt + typecheck + lint + jest) |
| `yarn jest` | Run only Jest unit tests |
| `yarn docgen` | Generate component API docs (docgen.json) |
| `yarn docs:build` | Build the Next.js docs site for production |
| `yarn docs:deploy` | Build and deploy docs to GitHub Pages |
| `yarn lint` | Run oxlint + Stylelint |
| `yarn format:write` | Format all files with oxfmt |
| `yarn storybook` | Start Storybook dev server |
| `yarn clean` | Remove build artifacts |
| `yarn release:patch` | Bump patch version and deploy docs |
| `diny yolo` | AI-assisted commit (stage all, generate message, commit + push) |

> **Important**: After changing the public API, always run `yarn clean && yarn build` before `yarn test`.

## Architecture

### Workspace Layout
Yarn workspaces monorepo with two workspaces: `package/` (npm package) and `docs/` (Next.js 15 documentation site).

### Package Source (`package/src/`)
- `Spinner.tsx` -- main component using Mantine's `factory()` pattern. Renders an SVG with `N` radially-arranged segments, each with staggered `animationDelay`. Uses `useMounted()` from `@mantine/hooks` to return `null` during SSR, preventing hydration mismatches from floating-point SVG geometry. Also respects `prefers-reduced-motion` via `useReducedMotion`.
- `SpinnerGroup.tsx` -- compound component (`Spinner.Group`), a CSS grid wrapper for stacking multiple spinners concentrically.
- `SpinnerOverlay.tsx` -- compound component (`Spinner.Overlay`), a positioned overlay with configurable backdrop blur and z-index that renders a centered `Spinner` over its children.
- `Spinner.module.css` -- keyframe animations: `spinner-fade`, `spinner-pulse`, `spinner-grow`, `spinner-trail`, `spinner-hue-rotate`.
- `index.ts` -- attaches compound components via `Object.assign` (`Spinner.Group = SpinnerGroup`, `Spinner.Overlay = SpinnerOverlay`) and re-exports all types.

### Build Pipeline
Rollup bundles to dual ESM/CJS with `'use client'` banner. CSS modules hashed with `hash-css-selector` (prefix `me`). TypeScript declarations via `rollup-plugin-dts`. CSS split into `styles.css` and `styles.layer.css`.

## Component Details

### SVG Segment Shapes (`segmentShape` prop)
- `'line'` (default) -- renders `<line>` elements from inner radius to outer radius, styled with `stroke` and `strokeWidth`.
- `'dot'` -- renders `<circle>` elements positioned at the midpoint between inner and outer radius, with radius equal to half the segment length. Uses `fill` instead of `stroke`.
- `'arc'` -- renders `<path>` elements as arc segments along the midpoint radius. Each arc spans 70% of its angular slot (30% gap). Uses `stroke` and `strokeWidth`.

### Staggered Animation
Each of the `N` segments receives an `animationDelay` of `(index * duration * directionValue) / segments` ms. The `direction` prop (`'clockwise'` or `'counter-clockwise'`) controls the sign of the delay, reversing perceived rotation direction.

### Animation Variants (`variant` prop)
Four CSS animation variants controlled via `data-variant` attribute: `fade`, `pulse`, `grow`, `trail`. CSS variables drive timing: `--spinner-animation-duration`, `--spinner-timing-function`, `--spinner-play-state`, `--spinner-min-opacity`, `--spinner-max-opacity`.

### Client-Only Rendering (`useMounted`)
The component returns `null` until `useMounted()` returns `true`. This prevents SSR hydration mismatches caused by floating-point SVG coordinate calculations that may differ between server and client.

### Color System
Three color modes with clear precedence (highest to lowest):
1. `gradient` (or `gradientFrom`/`gradientTo`) -- interpolates RGB between two Mantine theme colors across all segments.
2. `colors` array -- cycles through provided colors per segment.
3. `color` -- single Mantine theme color (falls back to `theme.primaryColor`).

Colors are resolved via `parseThemeColor` for theme integration.

### Determinate Progress Mode
When `progress` (0-100) is set, animation is disabled. Segments fill proportionally (`filledCount = round(progress/100 * segments)`). ARIA switches from `role="status"` to `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax`.

### Glow Effect
`glow` prop (boolean or number) adds an SVG `<filter>` with `feGaussianBlur` + `feMerge` for a bloom effect around each segment. Filter ID is unique per instance via `React.useId()`.

### Hue Rotate
`hueRotate` prop enables a continuous CSS `hue-rotate` animation on the entire spinner via `data-hue-rotate` attribute.

### Compound Components
- **`Spinner.Group`** -- CSS grid wrapper (`SpinnerGroup.tsx`). Places all children in the same grid cell for concentric stacking. Styles API: `root`.
- **`Spinner.Overlay`** -- Positioned overlay (`SpinnerOverlay.tsx`). Wraps children and conditionally renders a backdrop with blur (`--spinner-overlay-blur`) and z-index (`--spinner-overlay-z-index`). Props: `visible` (default `true`), `blur` (default `2`), `zIndex` (default `400`), `spinnerProps`. Styles API: `root`, `overlay`.

### Styles API
- **Spinner**: `root` (SVG element), `line` (individual segment elements), `content` (foreignObject for children).
- **SpinnerGroup**: `root`.
- **SpinnerOverlay**: `root`, `overlay`.

CSS variables on Spinner root: `--spinner-animation-duration`, `--spinner-stroke-linecap`, `--spinner-timing-function`, `--spinner-play-state`, `--spinner-min-opacity`, `--spinner-max-opacity`.

### Accessibility
- `label` prop sets `aria-label` (default `"Loading"`). Set to `null` to apply `aria-hidden`.
- Indeterminate mode: `role="status"`.
- Progress mode: `role="progressbar"` with full ARIA value attributes.

## Testing
Jest with `jsdom`, `esbuild-jest` transform, CSS mocked via `identity-obj-proxy`. Tests use `@mantine-tests/core` render helper. Test file: `package/src/Spinner.test.tsx`.

## Ecosystem
This repo is part of the Mantine Extensions ecosystem, derived from the `mantine-base-component` template. See the workspace `CLAUDE.md` (in the parent directory) for:
- Development checklist (code -> test -> build -> docs -> release)
- Cross-cutting patterns (compound components, responsive CSS, GitHub sync)
- Update packages workflow
- Release process
