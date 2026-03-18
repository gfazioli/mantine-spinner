import React from 'react';
import { Box, BoxProps, ElementProps } from '@mantine/core';
import { Spinner, SpinnerProps } from './Spinner';
import classes from './SpinnerOverlay.module.css';

export interface SpinnerOverlayProps extends BoxProps, ElementProps<'div'> {
  /** Controls overlay visibility. Default value is `true` */
  visible?: boolean;

  /** Backdrop blur in px. Default value is `2` */
  blur?: number;

  /** Props passed to the inner Spinner component */
  spinnerProps?: SpinnerProps;

  /** Content rendered beneath the overlay */
  children?: React.ReactNode;
}

export const SpinnerOverlay = React.forwardRef<HTMLDivElement, SpinnerOverlayProps>(
  ({ visible = true, blur = 2, spinnerProps, children, className, style, ...others }, ref) => (
    <Box
      ref={ref}
      {...others}
      className={[classes.wrapper, className].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
      {visible && (
        <div
          className={classes.overlay}
          style={
            blur
              ? { backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }
              : undefined
          }
        >
          <Spinner {...spinnerProps} />
        </div>
      )}
    </Box>
  )
);

SpinnerOverlay.displayName = 'SpinnerOverlay';
