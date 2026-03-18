import { Spinner } from '@gfazioli/mantine-spinner';
import { Group } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Group align="center" justify="center" gap={40}>
      <Spinner
        size={80}
        segments={24}
        thickness={4}
        inner={24}
        gradient={{ from: 'blue', to: 'cyan' }}
      />
      <Spinner
        size={80}
        segments={24}
        thickness={4}
        inner={24}
        gradient={{ from: 'pink', to: 'violet' }}
        variant="trail"
      />
      <Spinner
        size={80}
        segments={24}
        thickness={4}
        inner={24}
        gradient={{ from: 'orange', to: 'yellow' }}
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
        segments={24}
        thickness={4}
        inner={24}
        gradient={{ from: "blue", to: "cyan" }}
      />
      <Spinner
        size={80}
        segments={24}
        thickness={4}
        inner={24}
        gradient={{ from: "pink", to: "violet" }}
        variant="trail"
      />
      <Spinner
        size={80}
        segments={24}
        thickness={4}
        inner={24}
        gradient={{ from: "orange", to: "yellow" }}
      />
    </Group>
  );
}
`;

export const gradient: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
