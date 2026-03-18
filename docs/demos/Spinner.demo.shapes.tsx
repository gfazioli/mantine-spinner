import { Spinner } from '@gfazioli/mantine-spinner';
import { Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Group align="center" justify="center" gap={60}>
      <Stack align="center" gap="xs">
        <Spinner size={80} segments={16} thickness={4} inner={24} segmentShape="line" />
        <Text size="sm" c="dimmed">
          Line
        </Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Spinner size={80} segments={16} thickness={4} inner={24} segmentShape="dot" />
        <Text size="sm" c="dimmed">
          Dot
        </Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Spinner size={80} segments={16} thickness={4} inner={24} segmentShape="arc" />
        <Text size="sm" c="dimmed">
          Arc
        </Text>
      </Stack>
    </Group>
  );
}

const code = `
import { Spinner } from "@gfazioli/mantine-spinner";
import { Group, Stack, Text } from "@mantine/core";

function Demo() {
  return (
    <Group align="center" justify="center" gap={60}>
      <Stack align="center" gap="xs">
        <Spinner size={80} segments={16} thickness={4} inner={24} segmentShape="line" />
        <Text size="sm" c="dimmed">Line</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Spinner size={80} segments={16} thickness={4} inner={24} segmentShape="dot" />
        <Text size="sm" c="dimmed">Dot</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Spinner size={80} segments={16} thickness={4} inner={24} segmentShape="arc" />
        <Text size="sm" c="dimmed">Arc</Text>
      </Stack>
    </Group>
  );
}
`;

export const shapes: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
