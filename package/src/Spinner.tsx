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

export type SpinnerVariant = 'fade' | 'pulse' | 'grow';

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
  }, [size, inner, segments, thickness]);

  const parsedColors = useMemo(() => {
    if (colors && colors.length > 0) {
      return colors.map((c) => parseThemeColor({ color: c, theme }).value);
    }
    return [parseThemeColor({ color: color || theme.primaryColor, theme }).value];
  }, [colors, color, theme]);

  const directionValue = direction === 'counter-clockwise' ? -1 : 1;
  const { sizeValue, center, radius, innerRadius } = geometry;

  if (!mounted) {
    return null;
  }

  const accessibilityProps =
    label === null
      ? { 'aria-hidden': true as const }
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
    >
      {Array.from({ length: segments }).map((_, index) => {
        const angle = (360 / segments) * index - 90;
        const rad = (angle * Math.PI) / 180;

        const x1 = center + innerRadius * Math.cos(rad);
        const y1 = center + innerRadius * Math.sin(rad);
        const x2 = center + radius * Math.cos(rad);
        const y2 = center + radius * Math.sin(rad);

        return (
          <line
            key={`${segments}-${index}`}
            {...getStyles('line', {
              style: {
                animationDelay: `${(index * duration * directionValue) / segments}ms`,
              },
            })}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={parsedColors[index % parsedColors.length]}
            strokeWidth={thickness}
            data-variant={variant}
            data-reduced-motion={shouldReduceMotion || undefined}
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
