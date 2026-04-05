import React from 'react';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  Factory,
  factory,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import { Spinner, SpinnerProps } from './Spinner';
import classes from './SpinnerOverlay.module.css';

export type SpinnerOverlayStylesNames = 'root' | 'overlay';

export type SpinnerOverlayCssVariables = {
  root: '--spinner-overlay-z-index' | '--spinner-overlay-blur';
};

export interface SpinnerOverlayProps
  extends BoxProps, StylesApiProps<SpinnerOverlayFactory>, ElementProps<'div'> {
  /** Controls overlay visibility. Default value is `true` */
  visible?: boolean;

  /** Backdrop blur in px. Default value is `2` */
  blur?: number;

  /** Overlay z-index. Default value is `400` */
  zIndex?: number;

  /** Props passed to the inner Spinner component */
  spinnerProps?: SpinnerProps;

  /** Content rendered beneath the overlay */
  children?: React.ReactNode;
}

export type SpinnerOverlayFactory = Factory<{
  props: SpinnerOverlayProps;
  ref: HTMLDivElement;
  stylesNames: SpinnerOverlayStylesNames;
  vars: SpinnerOverlayCssVariables;
}>;

const defaultProps: Partial<SpinnerOverlayProps> = {
  visible: true,
  blur: 2,
  zIndex: 400,
};

const varsResolver = createVarsResolver<SpinnerOverlayFactory>((_, { blur, zIndex }) => ({
  root: {
    '--spinner-overlay-z-index': zIndex?.toString(),
    '--spinner-overlay-blur': blur ? `blur(${blur}px)` : undefined,
  },
}));

export const SpinnerOverlay = factory<SpinnerOverlayFactory>((_props) => {
  const props = useProps('SpinnerOverlay', defaultProps, _props);
  const {
    visible,
    blur,
    zIndex,
    spinnerProps,
    children,
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    ...others
  } = props;

  const getStyles = useStyles<SpinnerOverlayFactory>({
    name: 'SpinnerOverlay',
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

  return (
    <Box {...getStyles('root')} {...others}>
      {children}
      {visible && (
        <div {...getStyles('overlay')}>
          <Spinner {...spinnerProps} />
        </div>
      )}
    </Box>
  );
});

SpinnerOverlay.classes = classes;
SpinnerOverlay.displayName = 'SpinnerOverlay';
