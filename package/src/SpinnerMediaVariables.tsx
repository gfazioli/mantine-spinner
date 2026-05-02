import React from 'react';
import {
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  InlineStyles,
  keys,
  MantineBreakpoint,
  MantineSize,
  useMantineTheme,
  type StyleProp,
} from '@mantine/core';
import { getSpinnerSizeCssValue, SPINNER_DEFAULT_SIZE } from './spinner-size';

interface SpinnerMediaVariablesProps {
  size: StyleProp<MantineSize | (string & {}) | number>;
  selector: string;
}

export function SpinnerMediaVariables({ size, selector }: SpinnerMediaVariablesProps) {
  const theme = useMantineTheme();

  // Mirror Spinner.tsx fallback: when a responsive object omits `base`, both
  // the SVG geometry and `--spinner-size` resolve to the default size, keeping
  // CSS dimensions and SVG coordinate system in sync at the base viewport.
  const baseValue = getBaseValue(size) ?? SPINNER_DEFAULT_SIZE;

  const baseStyles: Record<string, string | undefined> = filterProps({
    '--spinner-size': getSpinnerSizeCssValue(baseValue),
  });

  const queries = keys(theme.breakpoints).reduce<Record<string, Record<string, string>>>(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }

      if (typeof size === 'object' && size !== null && size[breakpoint] !== undefined) {
        const resolved = getSpinnerSizeCssValue(size[breakpoint]);
        if (resolved) {
          acc[breakpoint]['--spinner-size'] = resolved;
        }
      }

      return acc;
    },
    {}
  );

  const sortedBreakpoints = getSortedBreakpoints(keys(queries), theme.breakpoints).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );

  const media = sortedBreakpoints.map((breakpoint) => ({
    query: `(min-width: ${theme.breakpoints[breakpoint.value as MantineBreakpoint]})`,
    styles: queries[breakpoint.value],
  }));

  return <InlineStyles styles={baseStyles} media={media} selector={selector} />;
}
