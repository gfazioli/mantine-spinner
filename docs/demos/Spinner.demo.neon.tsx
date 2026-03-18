import { Spinner } from '@gfazioli/mantine-spinner';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Group align="center" justify="center" gap={40}>
      <Spinner
        size={80}
        segments={16}
        thickness={4}
        inner={24}
        variant="trail"
        glow={3}
        color="cyan"
        minOpacity={0.3}
      />
      <Spinner
        size={80}
        segments={16}
        thickness={4}
        inner={24}
        variant="trail"
        glow={5}
        color="lime"
        minOpacity={0.3}
      />
      <Spinner
        size={80}
        segments={16}
        thickness={4}
        inner={24}
        variant="trail"
        glow={3}
        gradient={{ from: 'pink', to: 'violet' }}
        minOpacity={0.3}
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
      <Spinner
        size={80}
        segments={16}
        thickness={4}
        inner={24}
        variant="trail"
        glow={3}
        color="cyan"
        minOpacity={0.3}
      />
      <Spinner
        size={80}
        segments={16}
        thickness={4}
        inner={24}
        variant="trail"
        glow={5}
        color="lime"
        minOpacity={0.3}
      />
      <Spinner
        size={80}
        segments={16}
        thickness={4}
        inner={24}
        variant="trail"
        glow={3}
        gradient={{ from: "pink", to: "violet" }}
        minOpacity={0.3}
      />
    </Group>
  );
}
`;

export const neon: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
