# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@gfazioli/mantine-spinner` is a Mantine extension component that renders an SVG-based loading spinner with customizable segments, size, speed, and direction. It renders client-side only to avoid SSR hydration mismatches from floating-point SVG geometry.

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

The entire component is a single file: `package/src/Spinner.tsx`. It uses Mantine's `factory()` pattern with:
- `useProps` for default props merging
- `useStyles` + `createVarsResolver` for CSS variables (`--spinner-animation-duration`, `--spinner-stroke-linecap`, `--spinner-timing-function`)
- CSS Modules via `Spinner.module.css` with a `fade` keyframe animation on each `<line>` segment

The spinner renders `N` SVG `<line>` elements arranged radially, each with a staggered `animationDelay`. An `isClient` state gate prevents SSR rendering.

### Build Pipeline

Rollup produces both ESM (`.mjs`) and CJS (`.cjs`) outputs. CSS class names are hashed via `hash-css-selector` with the `me` prefix. Non-index chunks get a `'use client'` banner.

### Styles

Two CSS entry points are published: `styles.css` (standard) and `styles.layer.css` (wrapped in `@layer mantine-spinner`).
