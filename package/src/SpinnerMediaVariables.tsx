import React from 'react';
import {
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  InlineStyles,
  keys,
  MantineBreakpoint,
  MantineSize,
  px,
  rem,
  useMantineTheme,
  type StyleProp,
} from '@mantine/core';

const SIZE_VALUES: Record<string, number> = {
  xl: 58,
  lg: 44,
  md: 36,
  sm: 22,
  xs: 18,
};

function getSizeCssValue(
  size: MantineSize | (string & {}) | number | undefined
): string | undefined {
  if (size === undefined) {
    return undefined;
  }
  if (typeof size === 'string' && size in SIZE_VALUES) {
    return rem(SIZE_VALUES[size]);
  }
  if (typeof size === 'number') {
    return rem(size);
  }
  // strings like "2rem", "50%", "44px" are passed through
  const numeric = px(size) as number;
  return Number.isFinite(numeric) ? rem(numeric) : size;
}

interface SpinnerMediaVariablesProps {
  size: StyleProp<MantineSize | (string & {}) | number>;
  selector: string;
}

export function SpinnerMediaVariables({ size, selector }: SpinnerMediaVariablesProps) {
  const theme = useMantineTheme();

  const baseStyles: Record<string, string | undefined> = filterProps({
    '--spinner-size': getSizeCssValue(getBaseValue(size)),
  });

  const queries = keys(theme.breakpoints).reduce<Record<string, Record<string, string>>>(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }

      if (typeof size === 'object' && size !== null && size[breakpoint] !== undefined) {
        const resolved = getSizeCssValue(size[breakpoint]);
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
