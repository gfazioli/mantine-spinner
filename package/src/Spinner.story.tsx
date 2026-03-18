import React, { useState } from 'react';
import { Spinner, SpinnerProps } from './Spinner';
import { SpinnerGroup } from './SpinnerGroup';
import { SpinnerOverlay } from './SpinnerOverlay';

export default {
  title: 'Spinner',
  args: {
    size: 140,
    inner: 44,
    segments: 22,
    thickness: 4,
    duration: 1150,
    color: '#006d8f',
    direction: 'clockwise',
    strokeLinecap: 'round',
    transitionTimingFunction: 'ease',
    variant: 'fade',
    paused: false,
    glow: false,
    hueRotate: false,
    minOpacity: 0,
    maxOpacity: 1,
  },
  argTypes: {
    size: { control: { type: 'range', min: 0, max: 300, step: 1 } },
    inner: { control: { type: 'range', min: 0, max: 300, step: 1 } },
    segments: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    thickness: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    duration: { control: { type: 'range', min: 400, max: 8400, step: 1 } },
    color: { control: 'color' },
    direction: {
      control: { type: 'select' },
      options: ['clockwise', 'counter-clockwise'],
    },
    strokeLinecap: {
      control: { type: 'select' },
      options: ['round', 'butt', 'square'],
    },
    transitionTimingFunction: {
      control: { type: 'select' },
      options: ['ease', 'ease-in', 'ease-out', 'ease-in-out'],
    },
    variant: {
      control: { type: 'select' },
      options: ['fade', 'pulse', 'grow', 'trail'],
    },
    glow: { control: 'boolean' },
    hueRotate: { control: 'boolean' },
    paused: { control: 'boolean' },
    minOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    maxOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
  },
};

export function Usage(props: SpinnerProps) {
  return <Spinner {...props} />;
}

export function Properties() {
  return <Spinner />;
}

export function TrailVariant() {
  return <Spinner size={100} segments={16} thickness={4} inner={30} variant="trail" />;
}

export function GradientColors() {
  return (
    <Spinner
      size={100}
      segments={24}
      thickness={4}
      inner={30}
      gradient={{ from: 'blue', to: 'cyan' }}
    />
  );
}

export function ProgressMode() {
  const [progress, setProgress] = useState(65);
  return (
    <div>
      <Spinner size={100} segments={20} thickness={6} inner={30} progress={progress} color="teal" />
      <br />
      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
      />
      <span> {progress}%</span>
    </div>
  );
}

export function NeonEffect() {
  return (
    <Spinner
      size={100}
      segments={16}
      thickness={4}
      inner={30}
      variant="trail"
      glow={3}
      color="cyan"
      minOpacity={0.3}
    />
  );
}

export function GlowEffect() {
  return <Spinner size={100} segments={16} thickness={4} inner={30} glow={4} color="blue" />;
}

export function HueRotateEffect() {
  return (
    <Spinner
      size={100}
      segments={24}
      thickness={4}
      inner={30}
      hueRotate
      glow={4}
      gradient={{ from: 'blue', to: 'cyan' }}
    />
  );
}

export function Group() {
  return (
    <SpinnerGroup>
      <Spinner size={120} segments={20} thickness={4} inner={40} color="blue" />
      <Spinner
        size={70}
        segments={14}
        thickness={3}
        inner={20}
        color="cyan"
        direction="counter-clockwise"
      />
    </SpinnerGroup>
  );
}

export function Overlay() {
  return (
    <SpinnerOverlay visible spinnerProps={{ size: 60, segments: 16, thickness: 4, inner: 18 }}>
      <div style={{ padding: 40, background: '#f0f0f0', borderRadius: 8, width: 300, height: 200 }}>
        <h3>Card content</h3>
        <p>This content is overlaid by a spinner.</p>
      </div>
    </SpinnerOverlay>
  );
}
