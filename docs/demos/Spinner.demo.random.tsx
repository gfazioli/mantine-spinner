import { useEffect, useState } from 'react';
import { Spinner, SpinnerProps, SpinnerVariant } from '@gfazioli/mantine-spinner';
import { CodeHighlight } from '@mantine/code-highlight';
import { Button, Center, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

const VARIANTS: SpinnerVariant[] = ['fade', 'pulse', 'grow', 'trail'];
const DIRECTIONS = ['clockwise', 'counter-clockwise'] as const;
const LINECAPS = ['round', 'square', 'butt'] as const;

function Demo() {
  const [props, setProps] = useState<SpinnerProps>();

  interface RandomInRangeParams {
    min: number;
    max: number;
    step: number;
  }

  useEffect(random, []);

  function randomInRange({ min, max, step }: RandomInRangeParams): number {
    const range = (max - min) / step;
    return Math.floor(Math.random() * (range + 1)) * step + min;
  }

  function randomColor(): string {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()}`;
  }

  function pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function random() {
    const useGradient = Math.random() > 0.5;
    const glow = Math.random() > 0.6 ? randomInRange({ min: 2, max: 6, step: 1 }) : 0;
    const hueRotate = Math.random() > 0.7;
    const variant = pick(VARIANTS);

    setProps({
      size: randomInRange({ min: 60, max: 200, step: 1 }),
      inner: randomInRange({ min: 8, max: 80, step: 1 }),
      segments: randomInRange({ min: 8, max: 48, step: 1 }),
      thickness: randomInRange({ min: 1, max: 10, step: 1 }),
      duration: randomInRange({ min: 400, max: 2000, step: 100 }),
      variant,
      direction: pick(DIRECTIONS),
      strokeLinecap: pick(LINECAPS),
      color: useGradient ? undefined : randomColor(),
      gradientFrom: useGradient ? randomColor() : undefined,
      gradientTo: useGradient ? randomColor() : undefined,
      glow: glow || undefined,
      hueRotate: hueRotate || undefined,
      minOpacity: variant === 'trail' && glow ? 0.3 : 0,
    });
  }

  const codeParts = [
    `size={${props?.size}}`,
    `inner={${props?.inner}}`,
    `segments={${props?.segments}}`,
    `thickness={${props?.thickness}}`,
    `duration={${props?.duration}}`,
    `variant="${props?.variant}"`,
    `direction="${props?.direction}"`,
    `strokeLinecap="${props?.strokeLinecap}"`,
    props?.color ? `color="${props.color}"` : null,
    props?.gradientFrom ? `gradientFrom="${props.gradientFrom}"` : null,
    props?.gradientTo ? `gradientTo="${props.gradientTo}"` : null,
    props?.glow ? `glow={${props.glow}}` : null,
    props?.hueRotate ? 'hueRotate' : null,
    props?.minOpacity ? `minOpacity={${props.minOpacity}}` : null,
  ].filter(Boolean);

  return (
    <>
      <Stack align="center" gap={64} mb={32}>
        <Center h={200} w={200}>
          <Spinner {...props} />
        </Center>
        <Button onClick={random}>Random</Button>
      </Stack>
      <CodeHighlight
        w={{ base: 'auto', lg: 800 }}
        radius={32}
        language="tsx"
        code={`<Spinner\n  ${codeParts.join('\n  ')}\n/>`}
      />
    </>
  );
}

export const random: MantineDemo = {
  type: 'code',
  component: Demo,
};
