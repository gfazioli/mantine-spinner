import { Spinner, SpinnerProps } from '@gfazioli/mantine-spinner';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: SpinnerProps) {
  return (
    <Center h={400}>
      <Spinner {...props} />
    </Center>
  );
}

const code = `
import { Spinner } from "@gfazioli/mantine-spinner";

function Demo() {
  return <Spinner{{props}} />;
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code,
  maxWidth: 290,
  centered: true,
  controls: [
    {
      type: 'number',
      prop: 'size',
      min: 16,
      max: 200,
      step: 1,
      initialValue: 140,
      libraryValue: 140,
    },
    {
      type: 'number',
      prop: 'inner',
      min: 0,
      max: 100,
      step: 1,
      initialValue: 44,
      libraryValue: 44,
    },
    {
      type: 'number',
      prop: 'segments',
      min: 8,
      max: 64,
      step: 1,
      initialValue: 22,
      libraryValue: 22,
    },
    {
      type: 'number',
      prop: 'thickness',
      min: 1,
      max: 32,
      step: 1,
      initialValue: 4,
      libraryValue: 4,
    },
    {
      type: 'number',
      prop: 'duration',
      min: 400,
      max: 8400,
      step: 1,
      initialValue: 1200,
      libraryValue: 1200,
    },
    {
      type: 'select',
      prop: 'variant',
      data: [
        { label: 'Fade', value: 'fade' },
        { label: 'Pulse', value: 'pulse' },
        { label: 'Grow', value: 'grow' },
        { label: 'Trail', value: 'trail' },
      ],
      initialValue: 'fade',
      libraryValue: 'fade',
    },
    {
      type: 'select',
      prop: 'segmentShape',
      data: [
        { label: 'Line', value: 'line' },
        { label: 'Dot', value: 'dot' },
        { label: 'Arc', value: 'arc' },
      ],
      initialValue: 'line',
      libraryValue: 'line',
    },
    {
      type: 'segmented',
      prop: 'strokeLinecap',
      data: [
        { label: 'Round', value: 'round' },
        { label: 'Square', value: 'square' },
        { label: 'Butt', value: 'butt' },
      ],
      initialValue: 'round',
      libraryValue: 'round',
    },
    {
      type: 'select',
      prop: 'direction',
      data: [
        { label: 'Clockwise', value: 'clockwise' },
        { label: 'Counter clockwise', value: 'counter-clockwise' },
      ],
      initialValue: 'clockwise',
      libraryValue: 'clockwise',
    },
    {
      type: 'number',
      prop: 'glow',
      min: 0,
      max: 10,
      step: 1,
      initialValue: 0,
      libraryValue: 0,
    },
    {
      type: 'boolean',
      prop: 'hueRotate',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'boolean',
      prop: 'paused',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'color',
      prop: 'color',
      initialValue: '',
      libraryValue: '',
    },
    {
      type: 'color',
      prop: 'gradientFrom',
      initialValue: '',
      libraryValue: '',
    },
    {
      type: 'color',
      prop: 'gradientTo',
      initialValue: '',
      libraryValue: '',
    },
  ],
};
