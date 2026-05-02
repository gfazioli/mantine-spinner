import { MantineSize, px, rem } from '@mantine/core';

export const SPINNER_SIZE_VALUES: Record<string, number> = {
  xl: 58,
  lg: 44,
  md: 36,
  sm: 22,
  xs: 18,
};

export const SPINNER_DEFAULT_SIZE: MantineSize = 'md';

/**
 * Resolves a `size` value to a number of CSS pixels for SVG geometry.
 *
 * `MantineSize` keys (`xs`–`xl`) map to the predefined scale. Numeric and
 * pixel-convertible strings (`'2rem'`, `'40px'`) are converted via `px()`.
 * Values that cannot be converted (percentages, viewport units, anything
 * `px()` returns `NaN` for) fall back to the default size — geometry stays
 * valid while CSS scaling continues to honor the original value.
 */
export function getSpinnerSizeValue(size: MantineSize | (string & {}) | number): number {
  if (typeof size === 'string' && size in SPINNER_SIZE_VALUES) {
    return SPINNER_SIZE_VALUES[size];
  }
  const numeric = px(size) as number;
  return Number.isFinite(numeric) ? numeric : SPINNER_SIZE_VALUES[SPINNER_DEFAULT_SIZE];
}

/**
 * Resolves a `size` value to a CSS-valid string for the `--spinner-size`
 * custom property. Mirrors `getSpinnerSizeValue` for keyword/numeric inputs
 * and passes through non-convertible strings (percentages, viewport units)
 * unchanged so CSS keeps the original semantics.
 */
export function getSpinnerSizeCssValue(
  size: MantineSize | (string & {}) | number | undefined
): string | undefined {
  if (size === undefined) {
    return undefined;
  }
  if (typeof size === 'string' && size in SPINNER_SIZE_VALUES) {
    return rem(SPINNER_SIZE_VALUES[size]);
  }
  if (typeof size === 'number') {
    return rem(size);
  }
  const numeric = px(size) as number;
  return Number.isFinite(numeric) ? rem(numeric) : size;
}
