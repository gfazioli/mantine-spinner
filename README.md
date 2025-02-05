# Mantine Spinner Component

<p align="center">
  <img width="866" alt="image" src="https://github.com/gfazioli/mantine-spinner/assets/432181/d9d37b48-ab49-44c7-9315-4ad9a48e70f8">
</p>

---

<div align="center">
  
  [![NPM version](https://img.shields.io/npm/v/%40gfazioli%2Fmantine-spinner?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-spinner)
  [![NPM Downloads](https://img.shields.io/npm/dm/%40gfazioli%2Fmantine-spinner?style=for-the-badge)](https://www.npmjs.com/package/@gfazioli/mantine-spinner)
  ![NPM License](https://img.shields.io/npm/l/%40gfazioli%2Fmantine-spinner?style=for-the-badge)

</div>

## Overview

This component is created on top of the [Mantine](https://mantine.dev/) library.

It allows to create a spinner effect with any content.

You can find more components on the [Mantine Extensions Hub](https://mantine-extensions.vercel.app/) library.

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
  function BoxComponent({ children, ...props }: { children: ReactNode; [key: string]: any }) {
    return (
      <Box {...props} p="md" w="200px" c="white" style={{ borderRadius: '8px' }}>
        {children}
      </Box>
    );
  }

  return (
    <Spinner {...props} w={560} h={300}>
      <BoxComponent bg="red">Hello World #1</BoxComponent>
      <BoxComponent bg="cyan">Hope you like it #2</BoxComponent>
      <BoxComponent bg="blue">Have a nice day #3</BoxComponent>
      <BoxComponent bg="lime">Goodbye #4</BoxComponent>
    </Spinner>
  );
}
```



