import React from 'react';
import { Box, BoxProps, ElementProps } from '@mantine/core';
import classes from './SpinnerGroup.module.css';

export interface SpinnerGroupProps extends BoxProps, ElementProps<'div'> {
  /** Spinner components to stack concentrically */
  children: React.ReactNode;
}

export const SpinnerGroup = React.forwardRef<HTMLDivElement, SpinnerGroupProps>(
  ({ className, ...others }, ref) => (
    <Box ref={ref} {...others} className={[classes.group, className].filter(Boolean).join(' ')} />
  )
);

SpinnerGroup.displayName = 'SpinnerGroup';
