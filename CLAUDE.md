# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@gfazioli/mantine-spinner` is a Mantine extension component that renders an SVG-based loading spinner with customizable segments, size, duration, direction, animation variants, segment shapes, gradient colors, glow effects, and more. It renders client-side only (via `useMounted`) to avoid SSR hydration mismatches from floating-point SVG geometry.

## Commands

| Command | Description |
|---------|-------------|
| `yarn build` | Build the package via Rollup (output: `package/dist/`) |
| `yarn dev` | Start Next.js docs dev server on port 9281 |
| `yarn test` | Full test suite: syncpack → prettier → typecheck → lint → jest |
| `yarn jest` | Run Jest tests only |
| `yarn jest --testPathPattern=Spinner` | Run a single test file |
| `yarn lint` | ESLint + Stylelint |
| `yarn prettier:write` | Auto-format all files |
| `yarn docgen` | Generate component API docs (docgen.json) |
| `yarn docs:deploy` | Build and deploy docs to GitHub Pages |
| `yarn release:patch` | Bump patch version and deploy docs |
| `yarn storybook` | Start Storybook on port 8271 |

## Architecture

This repo follows the standard Mantine Extensions template (`mantine-base-component`). Two yarn workspaces: `package/` (the npm library) and `docs/` (the Next.js documentation site).

### Component Structure

The main component is `package/src/Spinner.tsx` using Mantine's `factory()` pattern with:
- `useProps` for default props merging
- `useStyles` + `createVarsResolver` for CSS variables (`--spinner-animation-duration`, `--spinner-stroke-linecap`, `--spinner-timing-function`, `--spinner-play-state`, `--spinner-min-opacity`, `--spinner-max-opacity`)
- CSS Modules via `Spinner.module.css` with multiple keyframe animations (`spinner-fade`, `spinner-pulse`, `spinner-grow`, `spinner-trail`, `spinner-hue-rotate`)

The spinner renders `N` SVG elements (`<line>`, `<circle>`, or `<path>` depending on `segmentShape`) arranged radially, each with a staggered `animationDelay`. SSR rendering is prevented via `useMounted()` from `@mantine/hooks`.

Compound components:
- `SpinnerGroup.tsx` — CSS grid wrapper for concentric spinner stacking
- `SpinnerOverlay.tsx` — Positioned overlay with backdrop blur and centered spinner

These are attached via `Object.assign` in `index.ts` and accessible as `Spinner.Group` / `Spinner.Overlay`.

### Build Pipeline

Rollup produces both ESM (`.mjs`) and CJS (`.cjs`) outputs. CSS class names are hashed via `hash-css-selector` with the `me` prefix. Non-index chunks get a `'use client'` banner.

### Styles

Two CSS entry points are published: `styles.css` (standard) and `styles.layer.css` (wrapped in `@layer mantine-spinner`).
