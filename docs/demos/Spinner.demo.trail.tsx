import { Spinner } from '@gfazioli/mantine-spinner';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Group align="center" justify="center" gap={40}>
      <Spinner size={80} segments={12} thickness={4} inner={24} variant="trail" color="blue" />
      <Spinner size={80} segments={16} thickness={3} inner={28} variant="trail" color="teal" />
      <Spinner
        size={80}
        segments={20}
        thickness={3}
        inner={32}
        variant="trail"
        color="violet"
        direction="counter-clockwise"
      />
    </Group>
  );
}

const code = `
import { Spinner } from "@gfazioli/mantine-spinner";
import { Group } from "@mantine/core";

function Demo() {
  return (
    <Group align="center" justify="center" gap={40}>
      <Spinner size={80} segments={12} thickness={4} inner={24} variant="trail" color="blue" />
      <Spinner size={80} segments={16} thickness={3} inner={28} variant="trail" color="teal" />
      <Spinner
        size={80}
        segments={20}
        thickness={3}
        inner={32}
        variant="trail"
        color="violet"
        direction="counter-clockwise"
      />
    </Group>
  );
}
`;

export const trail: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
