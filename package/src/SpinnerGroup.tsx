import React from 'react';
import {
  Box,
  BoxProps,
  ElementProps,
  Factory,
  factory,
  StylesApiProps,
  useProps,
  useStyles,
} from '@mantine/core';
import classes from './SpinnerGroup.module.css';

export type SpinnerGroupStylesNames = 'root';

export interface SpinnerGroupProps
  extends BoxProps, StylesApiProps<SpinnerGroupFactory>, ElementProps<'div'> {
  /** Spinner components to stack concentrically */
  children: React.ReactNode;
}

export type SpinnerGroupFactory = Factory<{
  props: SpinnerGroupProps;
  ref: HTMLDivElement;
  stylesNames: SpinnerGroupStylesNames;
}>;

const defaultProps: Partial<SpinnerGroupProps> = {};

export const SpinnerGroup = factory<SpinnerGroupFactory>((_props, ref) => {
  const props = useProps('SpinnerGroup', defaultProps, _props);
  const { children, classNames, className, style, styles, unstyled, vars, ...others } = props;

  const getStyles = useStyles<SpinnerGroupFactory>({
    name: 'SpinnerGroup',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
  });

  return (
    <Box ref={ref} {...getStyles('root')} {...others}>
      {children}
    </Box>
  );
});

SpinnerGroup.classes = classes;
SpinnerGroup.displayName = 'SpinnerGroup';
