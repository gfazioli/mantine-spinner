import {
  Box,
  BoxProps,
  Factory,
  StylesApiProps,
  createVarsResolver,
  factory,
  useProps,
  useStyles,
} from "@mantine/core";
import React from "react";

import classes from "./Spinner.module.css";

export type SpinnerStylesNames = "root";

export type SpinnerCssVariables = {
  root: "--spinner-animation-duration";
};

export interface SpinnerBaseProps {
  size?: number;
  inner?: number;
  segments?: number;
  thickness?: number;
  speed?: number;
  color?: string;
}

export interface SpinnerProps
  extends BoxProps,
    SpinnerBaseProps,
    StylesApiProps<SpinnerFactory> {}

export type SpinnerFactory = Factory<{
  props: SpinnerProps;
  ref: HTMLDivElement;
  stylesNames: SpinnerStylesNames;
  vars: SpinnerCssVariables;
}>;

export const defaultProps: Partial<SpinnerProps> = {
  size: 140,
  inner: 44,
  segments: 22,
  thickness: 4,
  speed: 1150,
  color: "#006d8f",
};

const varsResolver = createVarsResolver<SpinnerFactory>((theme, { speed }) => {
  return {
    root: {
      "--spinner-animation-duration": `${speed || 1}ms`,
    },
  };
});

export const Spinner = factory<SpinnerFactory>((_props, ref) => {
  const props = useProps("Spinner", defaultProps, _props);

  const [over, setOver] = React.useState(false);

  const {
    size,
    inner,
    segments,
    thickness,
    speed,
    color,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  const getStyles = useStyles<SpinnerFactory>({
    name: "Spinner",
    props,
    classes,
    className,
    style: {
      ...style,
      "--spinner-play-state": over && pauseOnHover ? "paused" : "running",
    },
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const fixedSize = 220;
  const center = fixedSize / 2;
  const maxRadius = center - thickness;
  const radius = Math.min(size / 2, maxRadius);
  const innerRadius = Math.min(inner, radius);

  return (
    <Box
      {...getStyles("root")}
      component="svg"
      {...others}
      xmlns="http://www.w3.org/2000/svg"
      width={220}
      height={220}
      viewBox="0 0 220 220"
      preserveAspectRatio="xMidYMid meet"
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
            className={classes.line}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={thickness}
            style={{
              animationDelay: `${(index * speed) / segments}ms`,
            }}
          />
        );
      })}
    </Box>
  );
});

Spinner.classes = classes;
Spinner.displayName = "Spinner";
