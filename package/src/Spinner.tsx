import React, { useMemo } from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  Factory,
  factory,
  MantineColor,
  MantineSize,
  parseThemeColor,
  px,
  StylesApiProps,
  useMantineTheme,
  useProps,
  useStyles,
} from '@mantine/core';
import { useMounted, useReducedMotion } from '@mantine/hooks';
import classes from './Spinner.module.css';

export type SpinnerDirection = 'clockwise' | 'counter-clockwise';

export type SpinnerVariant = 'fade' | 'pulse' | 'grow' | 'trail';

export type SpinnerSegmentShape = 'line' | 'dot' | 'arc';

export type SpinnerStylesNames = 'root' | 'line' | 'content';

export type SpinnerCssVariables = {
  root:
    | '--spinner-animation-duration'
    | '--spinner-stroke-linecap'
    | '--spinner-timing-function'
    | '--spinner-play-state'
    | '--spinner-min-opacity'
    | '--spinner-max-opacity';
};

export interface SpinnerGradient {
  /** Start color of the gradient */
  from: MantineColor;
  /** End color of the gradient */
  to: MantineColor;
}

export interface SpinnerBaseProps {
  /** Controls `width` and `height` of the spinner. `Spinner` has predefined `xs`-`xl` values. Numbers are converted to rem. Default value is `'md'` */
  size?: MantineSize | (string & {}) | number;

  /** Controls size of inner part of the spinner, number is converted to rem. Default value is `8` */
  inner?: MantineSize | (string & {}) | number;

  /** Number of spinner segments. Default value is `12` */
  segments?: number;

  /** Controls spinner thickness, number is converted to rem. Default value is `3` */
  thickness?: number;

  /** Animation cycle duration in ms, default value is `1200` */
  duration?: number;

  /** Spinner animation direction */
  direction?: SpinnerDirection;

  /** Animation timing function */
  transitionTimingFunction?: string;

  /** Stroke linecap property */
  strokeLinecap?: 'round' | 'square' | 'butt';

  /** Key of `theme.colors` or any valid CSS color, default value is `theme.primaryColor` */
  color?: MantineColor;

  /** Accessible label for the spinner. Set to `null` to hide from assistive technology. Default value is `"Loading"` */
  label?: string | null;

  /** When `true`, pauses the spinner animation. Default value is `false` */
  paused?: boolean;

  /** Minimum opacity for segments during animation. Default value is `0` */
  minOpacity?: number;

  /** Maximum opacity for segments during animation. Default value is `1` */
  maxOpacity?: number;

  /** Array of colors to cycle through for each segment. Overrides `color` when provided */
  colors?: MantineColor[];

  /** Gradient applied across segments, interpolating from `from` to `to`. Overrides `color` and `colors` */
  gradient?: SpinnerGradient;

  /** Shorthand for `gradient.from`. When both `gradientFrom` and `gradientTo` are set, creates a gradient. Overridden by `gradient` */
  gradientFrom?: MantineColor;

  /** Shorthand for `gradient.to`. When both `gradientFrom` and `gradientTo` are set, creates a gradient. Overridden by `gradient` */
  gradientTo?: MantineColor;

  /** Determinate progress value (0–100). When set, segments fill proportionally and animation is disabled. Uses `role="progressbar"` with ARIA attributes */
  progress?: number;

  /** Adds a glow/bloom effect around each segment using an SVG filter. Pass `true` for default intensity (3) or a number to control the blur radius. Default value is `false` */
  glow?: boolean | number;

  /** Continuously rotates the hue of the entire spinner, creating a rainbow cycling effect. Default value is `false` */
  hueRotate?: boolean;

  /** Shape of individual segments. Default value is `'line'` */
  segmentShape?: SpinnerSegmentShape;

  /** Content rendered centered inside the spinner */
  children?: React.ReactNode;
}

export interface SpinnerProps extends BoxProps, SpinnerBaseProps, StylesApiProps<SpinnerFactory> {
  /** Animation variant. Default value is `'fade'` */
  variant?: SpinnerVariant;
}

export type SpinnerFactory = Factory<{
  props: SpinnerProps;
  ref: SVGSVGElement;
  stylesNames: SpinnerStylesNames;
  vars: SpinnerCssVariables;
  variant: SpinnerVariant;
}>;

export const defaultProps: Partial<SpinnerProps> = {
  size: 'md',
  inner: 8,
  segments: 12,
  thickness: 3,
  duration: 1200,
  direction: 'clockwise',
  strokeLinecap: 'round',
  transitionTimingFunction: 'ease',
  label: 'Loading',
  paused: false,
  minOpacity: 0,
  maxOpacity: 1,
  variant: 'fade',
  glow: false,
  hueRotate: false,
  segmentShape: 'line',
};

const SIZE_VALUES: Record<string, number> = {
  xl: 58,
  lg: 44,
  md: 36,
  sm: 22,
  xs: 18,
};

function getSizeValue(size: MantineSize | (string & {}) | number): number {
  if (typeof size === 'string' && size in SIZE_VALUES) {
    return SIZE_VALUES[size];
  }

  return px(size) as number;
}

function parseRgb(color: string): [number, number, number] {
  if (color.startsWith('#')) {
    const hex =
      color.length === 4
        ? `${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
        : color.slice(1, 7);
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  const match = color.match(/(\d+)/g);
  if (match && match.length >= 3) {
    return [+match[0], +match[1], +match[2]];
  }
  return [0, 0, 0];
}

function interpolateColor(from: string, to: string, t: number): string {
  const [r1, g1, b1] = parseRgb(from);
  const [r2, g2, b2] = parseRgb(to);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

const varsResolver = createVarsResolver<SpinnerFactory>(
  (_, { strokeLinecap, duration, transitionTimingFunction, paused, minOpacity, maxOpacity }) => {
    return {
      root: {
        '--spinner-stroke-linecap': strokeLinecap,
        '--spinner-animation-duration': `${duration || 1}ms`,
        '--spinner-timing-function': transitionTimingFunction,
        '--spinner-play-state': paused ? 'paused' : 'running',
        '--spinner-min-opacity': String(minOpacity ?? 0),
        '--spinner-max-opacity': String(maxOpacity ?? 1),
      },
    };
  }
);

export const Spinner = factory<SpinnerFactory>((_props, ref) => {
  const mounted = useMounted();
  const props = useProps('Spinner', defaultProps, _props);
  const theme = useMantineTheme();
  const reducedMotion = useReducedMotion();
  const shouldReduceMotion = theme.respectReducedMotion && reducedMotion;
  const reactId = React.useId();
  const filterId = `spinner-glow-${reactId.replace(/:/g, '')}`;

  const {
    size,
    inner,
    segments,
    thickness,
    duration,
    color,
    direction,
    transitionTimingFunction,
    strokeLinecap,
    label,
    paused,
    minOpacity,
    maxOpacity,
    colors,
    gradient,
    gradientFrom,
    gradientTo,
    progress,
    glow,
    hueRotate,
    segmentShape,
    children,
    variant,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  const getStyles = useStyles<SpinnerFactory>({
    name: 'Spinner',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const geometry = useMemo(() => {
    const sizeValue = getSizeValue(size);
    const innerValue = getSizeValue(inner);
    const center = sizeValue / 2;
    const maxRadius = center - thickness;
    const radius = Math.min(sizeValue / 2, maxRadius);
    const innerRadius = Math.min(innerValue, radius);
    return { sizeValue, center, radius, innerRadius };
  }, [size, inner, thickness]);

  const parsedColors = useMemo(() => {
    const effectiveGradient =
      gradient || (gradientFrom && gradientTo ? { from: gradientFrom, to: gradientTo } : undefined);
    if (effectiveGradient) {
      const fromColor = parseThemeColor({ color: effectiveGradient.from, theme }).value;
      const toColor = parseThemeColor({ color: effectiveGradient.to, theme }).value;
      return Array.from({ length: segments }, (_, i) =>
        interpolateColor(fromColor, toColor, segments > 1 ? i / (segments - 1) : 0)
      );
    }
    if (colors && colors.length > 0) {
      return colors.map((c) => parseThemeColor({ color: c, theme }).value);
    }
    return [parseThemeColor({ color: color || theme.primaryColor, theme }).value];
  }, [gradient, gradientFrom, gradientTo, colors, color, theme, segments]);

  const directionValue = direction === 'counter-clockwise' ? -1 : 1;
  const { sizeValue, center, radius, innerRadius } = geometry;
  const isProgress = progress !== undefined;
  const filledCount = isProgress
    ? Math.round((Math.min(Math.max(progress, 0), 100) / 100) * segments)
    : 0;
  const glowIntensity = typeof glow === 'number' ? glow : glow ? 3 : 0;
  const needsGlow = glowIntensity > 0;

  if (!mounted) {
    return null;
  }

  const clampedProgress = isProgress ? Math.round(Math.min(Math.max(progress, 0), 100)) : undefined;
  const accessibilityProps =
    label === null
      ? { 'aria-hidden': true as const }
      : isProgress
        ? {
            role: 'progressbar' as const,
            'aria-label': label,
            'aria-valuenow': clampedProgress,
            'aria-valuemin': 0,
            'aria-valuemax': 100,
          }
        : { role: 'status' as const, 'aria-label': label };

  return (
    <Box
      ref={ref}
      {...getStyles('root')}
      component="svg"
      {...others}
      xmlns="http://www.w3.org/2000/svg"
      width={sizeValue}
      height={sizeValue}
      viewBox={`0 0 ${sizeValue} ${sizeValue}`}
      preserveAspectRatio="xMidYMid meet"
      {...accessibilityProps}
      data-hue-rotate={hueRotate || undefined}
    >
      {needsGlow && (
        <defs>
          <filter
            id={filterId}
            filterUnits="userSpaceOnUse"
            x={-sizeValue}
            y={-sizeValue}
            width={sizeValue * 3}
            height={sizeValue * 3}
          >
            <feGaussianBlur stdDeviation={glowIntensity} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}
      {Array.from({ length: segments }).map((_, index) => {
        const angle = (360 / segments) * index - 90;
        const rad = (angle * Math.PI) / 180;

        const x1 = center + innerRadius * Math.cos(rad);
        const y1 = center + innerRadius * Math.sin(rad);
        const x2 = center + radius * Math.cos(rad);
        const y2 = center + radius * Math.sin(rad);

        const lineStyle = isProgress
          ? { opacity: index < filledCount ? maxOpacity : minOpacity }
          : { animationDelay: `${(index * duration * directionValue) / segments}ms` };

        const segColor = parsedColors[index % parsedColors.length];

        const commonProps = {
          key: `${segments}-${index}`,
          ...getStyles('line', { style: lineStyle }),
          filter: needsGlow ? `url(#${filterId})` : undefined,
          'data-variant': isProgress ? undefined : variant,
          'data-progress': isProgress || undefined,
          'data-reduced-motion': shouldReduceMotion || undefined,
        };

        if (segmentShape === 'dot') {
          const midRadius = (innerRadius + radius) / 2;
          const cx = center + midRadius * Math.cos(rad);
          const cy = center + midRadius * Math.sin(rad);
          const dotR = (radius - innerRadius) / 2;
          return <circle {...commonProps} cx={cx} cy={cy} r={dotR} fill={segColor} />;
        }

        if (segmentShape === 'arc') {
          const midRadius = (innerRadius + radius) / 2;
          const arcSpan = ((360 / segments) * 0.7 * Math.PI) / 180;
          const startRad = rad - arcSpan / 2;
          const endRad = rad + arcSpan / 2;
          const sx = center + midRadius * Math.cos(startRad);
          const sy = center + midRadius * Math.sin(startRad);
          const ex = center + midRadius * Math.cos(endRad);
          const ey = center + midRadius * Math.sin(endRad);
          const d = `M ${sx} ${sy} A ${midRadius} ${midRadius} 0 0 1 ${ex} ${ey}`;
          return (
            <path {...commonProps} d={d} stroke={segColor} strokeWidth={thickness} fill="none" />
          );
        }

        return (
          <line
            {...commonProps}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={segColor}
            strokeWidth={thickness}
          />
        );
      })}
      {children && (
        <foreignObject x="0" y="0" width={sizeValue} height={sizeValue} {...getStyles('content')}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {children}
          </div>
        </foreignObject>
      )}
    </Box>
  );
});

Spinner.classes = classes;
Spinner.displayName = 'Spinner';
