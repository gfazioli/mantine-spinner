import { Spinner } from '@gfazioli/mantine-spinner';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Group align="center" justify="center" gap={40}>
      <Spinner size={80} segments={16} thickness={4} inner={24} hueRotate color="blue" />
      <Spinner
        size={80}
        segments={24}
        thickness={4}
        inner={24}
        hueRotate
        glow={4}
        gradient={{ from: 'blue', to: 'cyan' }}
      />
      <Spinner
        size={80}
        segments={16}
        thickness={4}
        inner={24}
        hueRotate
        glow={3}
        variant="trail"
        color="cyan"
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
      <Spinner size={80} segments={16} thickness={4} inner={24} hueRotate color="blue" />
      <Spinner
        size={80}
        segments={24}
        thickness={4}
        inner={24}
        hueRotate
        glow={4}
        gradient={{ from: "blue", to: "cyan" }}
      />
      <Spinner
        size={80}
        segments={16}
        thickness={4}
        inner={24}
        hueRotate
        glow={3}
        variant="trail"
        color="cyan"
        minOpacity={0.3}
      />
    </Group>
  );
}
`;

export const hueRotateDemo: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
