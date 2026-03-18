import { Spinner } from '@gfazioli/mantine-spinner';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Group align="center" justify="center" gap={40}>
      <Spinner size={80} segments={16} thickness={4} inner={24} glow={2} color="blue" />
      <Spinner
        size={80}
        segments={16}
        thickness={4}
        inner={24}
        glow={4}
        variant="trail"
        color="teal"
      />
      <Spinner
        size={80}
        segments={24}
        thickness={4}
        inner={24}
        glow={6}
        gradient={{ from: 'orange', to: 'red' }}
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
      <Spinner size={80} segments={16} thickness={4} inner={24} glow={2} color="blue" />
      <Spinner
        size={80}
        segments={16}
        thickness={4}
        inner={24}
        glow={4}
        variant="trail"
        color="teal"
      />
      <Spinner
        size={80}
        segments={24}
        thickness={4}
        inner={24}
        glow={6}
        gradient={{ from: "orange", to: "red" }}
      />
    </Group>
  );
}
`;

export const glowDemo: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
