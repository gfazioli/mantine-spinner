# Mantine Spinner Component

<img width="2752" height="1536" alt="mantine Spinner" src="https://github.com/user-attachments/assets/4ee5da74-8e5e-4b8e-bb50-b8fc401c3787" />

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

[Mantine Spinner](https://gfazioli.github.io/mantine-spinner/) is a dedicated React component designed to deliver smooth, customizable loading animations within Mantine-based applications. It exposes controls for visual tuning—including overall size, inner radius, segment count, stroke thickness, and animation speed—so you can match your brand and context, from subtle inline loaders to prominent page-level indicators. 

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
H## Sponsor

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
