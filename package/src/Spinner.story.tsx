import React from "react";
import { Spinner, SpinnerProps } from "./Spinner";

export default {
  title: "Spinner",
  args: {
    size: 140,
    inner: 44,
    segments: 22,
    thickness: 4,
    speed: 1150,
    color: "#006d8f",
    direction: "clockwise",
  },
  argTypes: {
    size: { control: { type: "range", min: 0, max: 300, step: 1 } },
    inner: { control: { type: "range", min: 0, max: 300, step: 1 } },
    segments: { control: { type: "range", min: 0, max: 100, step: 1 } },
    thickness: { control: { type: "range", min: 0, max: 100, step: 1 } },
    speed: { control: { type: "range", min: 400, max: 8400, step: 1 } },
    color: { control: "color" },
    direction: {
      control: {
        type: "select",
      },
      options: ["clockwise", "counter-clockwise"],
    },
  },
};

export function Usage(props: SpinnerProps) {
  return <Spinner {...props} />;
}

export function Properties(props: SpinnerProps) {
  return <Spinner />;
}
