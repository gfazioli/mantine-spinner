import { Spinner, SpinnerProps } from "@gfazioli/mantine-spinner";
import { MantineDemo } from "@mantinex/demo";

function Demo(props: SpinnerProps) {
  return <Spinner {...props} />;
}

const code = `
import { Spinner } from "@gfazioli/mantine-spinner";

function Demo() {
  return <Spinner {{props}} />;
}
`;

export const configurator: MantineDemo = {
  type: "configurator",
  component: Demo,
  code,
  centered: true,
  controls: [
    { type: "size", prop: "size", initialValue: "md", libraryValue: "md" },
    {
      type: "number",
      prop: "inner",
      min: 1,
      max: 256,
      step: 1,
      initialValue: 8,
      libraryValue: 8,
    },
    {
      type: "number",
      prop: "segments",
      min: 1,
      max: 64,
      step: 1,
      initialValue: 12,
      libraryValue: 12,
    },
    {
      type: "number",
      prop: "thickness",
      min: 1,
      max: 32,
      step: 1,
      initialValue: 3,
      libraryValue: 3,
    },
    {
      type: "number",
      prop: "speed",
      min: 1,
      max: 5000,
      step: 1,
      initialValue: 1200,
      libraryValue: 1200,
    },
    {
      type: "select",
      prop: "direction",
      data: [
        { label: "Clockwise", value: "clockwise" },
        { label: "Counter clockwise", value: "counter-clockwise" },
      ],
      initialValue: "clockwise",
      libraryValue: "clockwise",
    },
    {
      type: "color",
      prop: "color",
      initialValue: "",
      libraryValue: "",
    },
  ],
};
