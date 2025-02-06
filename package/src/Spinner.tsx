import {
  Box,
  BoxProps,
  Factory,
  MantineColor,
  MantineSize,
  StylesApiProps,
  createVarsResolver,
  factory,
  getSize,
  getThemeColor,
  parseThemeColor,
  px,
  useMantineTheme,
  useProps,
  useStyles,
} from "@mantine/core";
import React from "react";

import classes from "./Spinner.module.css";

export type SpinnerDirection = "clockwise" | "counter-clockwise";

export type SpinnerStylesNames = "root";

export type SpinnerCssVariables = {
  root: "--spinner-size" | "--spinner-color" | "--spinner-animation-duration";
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

  /** Animation duration in ms, default value is `1200` */
  speed?: number;

  /** Spinner animation direction */
  direction?: SpinnerDirection;

  /** Key of `theme.colors` or any valid CSS color, default value is `theme.primaryColor`  */
  color?: MantineColor;
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
  size: "md",
  inner: 8,
  segments: 12,
  thickness: 3,
  speed: 1200,
  direction: "clockwise",
};

const varsResolver = createVarsResolver<SpinnerFactory>(
  (theme, { size, inner, color, speed }) => {
    return {
      root: {
        "--spinner-size": getSize(size, "spinner-size"),
        "--spinner-inner": getSize(inner, "spinner-inner"),
        "--spinner-color": color ? getThemeColor(color, theme) : undefined,
        "--spinner-animation-duration": `${speed || 1}ms`,
      },
    };
  },
);

export const Spinner = factory<SpinnerFactory>((_props, ref) => {
  const props = useProps("Spinner", defaultProps, _props);
  const theme = useMantineTheme();

  const [over, setOver] = React.useState(false);

  const {
    size,
    inner,
    segments,
    thickness,
    speed,
    color,
    direction,

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
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const getSizeValue = (size: MantineSize | (string & {}) | number): number => {
    if (
      typeof size === "string" &&
      ["lg", "xl", "md", "sm", "xs"].includes(size)
    ) {
      return {
        xl: 58,
        lg: 44,
        md: 36,
        sm: 22,
        xs: 18,
      }[size];
    }

    return px(size) as number;
  };

  const sizeValue = getSizeValue(size);
  const innerValue = getSizeValue(inner);
  const center = sizeValue / 2;
  const maxRadius = center - thickness;
  const radius = Math.min(sizeValue / 2, maxRadius);
  const innerRadius = Math.min(innerValue, radius);

  const directionValue = direction === "counter-clockwise" ? -1 : 1;

  const parsedColor = parseThemeColor({
    color: color || theme.primaryColor,
    theme,
  });

  return (
    <Box
      {...getStyles("root")}
      component="svg"
      {...others}
      xmlns="http://www.w3.org/2000/svg"
      width={sizeValue}
      height={sizeValue}
      viewBox={`0 0 ${sizeValue} ${sizeValue}`}
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
            key={`line-${index}`}
            className={classes.line}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={parsedColor.value}
            strokeWidth={thickness}
            style={{
              animationDelay: `${(index * speed * directionValue) / segments}ms`,
            }}
          />
        );
      })}
    </Box>
  );
});

Spinner.classes = classes;
Spinner.displayName = "Spinner";
