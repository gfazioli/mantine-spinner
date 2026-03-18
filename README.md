# Mantine Spinner Component

<img alt="mantine Spinner" src="https://github.com/gfazioli/mantine-spinner/blob/master/logo.jpeg" />

<div align="center">
  
  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-spinner?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-spinner)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-spinner?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-spinner)
  [![NPM Downloads](https://img.shields.io/npm/dy/%40gfazioli%2Fmantine-spinner?style=for-the-badge&label=%20&color=f90)](https://www.npmjs.com/package/@gfazioli/mantine-spinner)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-spinner?style=for-the-badge)

---

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)  

</div>

## Overview

> [!NOTE]
> Freely inspired by Matt Cannon on [CodePen](https://codepen.io/matt-cannon/pen/qEWKLoZ)

This component is created on top of the [Mantine](https://mantine.dev/) library.

[Mantine Spinner](https://gfazioli.github.io/mantine-spinner/) is a feature-rich React component designed to deliver smooth, customizable loading animations within Mantine-based applications. It exposes controls for visual tuning—including overall size, inner radius, segment count, stroke thickness, animation duration, direction, and much more—so you can match your brand and context, from subtle inline loaders to prominent page-level indicators.

### Features

- **Animation variants** — `fade`, `pulse`, `grow`, `trail` with customizable timing
- **Segment shapes** — `line`, `dot`, `arc` for different visual styles
- **Gradient colors** — Smooth color interpolation across segments
- **Glow effect** — SVG gaussian blur filter with adjustable intensity
- **Hue rotation** — Continuous rainbow color cycling
- **Progress mode** — Determinate progress indicator (0–100%) with `role="progressbar"`
- **Compound components** — `Spinner.Group` for concentric stacking, `Spinner.Overlay` for loading overlays
- **Accessibility** — `role="status"`, `aria-label`, `prefers-reduced-motion` support
- **Children support** — Render centered content inside the spinner
- **Mantine Styles API** — Full `classNames`, `styles`, and CSS variables support

To avoid hydration mismatches in SSR environments, the spinner renders exclusively on the client because its SVG geometry relies on floating‑point math that may differ between server and browser. Styling is provided via package CSS (with an optional ‎`@layer mantine-spinner` import) to integrate cleanly with modern CSS layering and Mantine’s design system, resulting in a dependable, visually consistent loading experience.

> [!note]
>
> → [Demo and Documentation](https://gfazioli.github.io/mantine-spinner/) → [Youtube Video](https://www.youtube.com/playlist?list=PL85tTROKkZrWyqCcmNCdWajpx05-cTal4) → [More Mantine Components](https://mantine-extensions.vercel.app/)


## Installation

```sh
npm install @gfazioli/mantine-spinner
```
or 

```sh
yarn add @gfazioli/mantine-spinner
```

After installation import package styles at the root of your application:

```tsx
import '@gfazioli/mantine-spinner/styles.css';
```

## Usage

```tsx
import { Spinner } from '@gfazioli/mantine-spinner';

function Demo() {
  return <Spinner />;
}
```

### More examples

```tsx
// Trail variant with glow (neon effect)
<Spinner variant="trail" glow={3} color="cyan" minOpacity={0.3} />

// Dot shape with gradient
<Spinner segmentShape="dot" gradient={{ from: 'blue', to: 'cyan' }} />

// Progress indicator with label
<Spinner progress={65} color="teal">
  <Text>65%</Text>
</Spinner>

// Concentric group
<Spinner.Group>
  <Spinner size={100} color="blue" />
  <Spinner size={60} color="cyan" direction="counter-clockwise" />
</Spinner.Group>

// Loading overlay
<Spinner.Overlay visible={isLoading}>
  <Card>Content</Card>
</Spinner.Overlay>
```

## Sponsor

<div align="center">

[<kbd> <br/> ❤️ If this component has been useful to you or your team, please consider becoming a sponsor <br/> </kbd>](https://github.com/sponsors/gfazioli?o=esc)

</div>

Your support helps me:

- Keep the project actively maintained with timely bug fixes and security updates	
- Add new features, improve performance, and refine the developer experience	
- Expand test coverage and documentation for smoother adoption	
- Ensure long‑term sustainability without relying on ad hoc free time	
- Prioritize community requests and roadmap items that matter most

Open source thrives when those who benefit can give back—even a small monthly contribution makes a real difference. Sponsorships help cover maintenance time, infrastructure, and the countless invisible tasks that keep a project healthy.

Your help truly matters.

💚 [Become a sponsor](https://github.com/sponsors/gfazioli?o=esc) today and help me keep this project reliable, up‑to‑date, and growing for everyone.

---
https://github.com/user-attachments/assets/2401bfe1-e829-4057-a654-7d0a895a9605

---  
[![Star History Chart](https://api.star-history.com/svg?repos=gfazioli/mantine-spinner&type=Timeline)](https://www.star-history.com/#gfazioli/mantine-spinner&Timeline)
