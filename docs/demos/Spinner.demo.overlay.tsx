import { useState } from 'react';
import { Spinner } from '@gfazioli/mantine-spinner';
import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [loading, setLoading] = useState(true);

  return (
    <Stack align="center" gap="lg">
      <Spinner.Overlay
        visible={loading}
        blur={2}
        spinnerProps={{ size: 50, segments: 16, thickness: 4, inner: 16 }}
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder w={360}>
          <Text fw={500} size="lg" mb="xs">
            Card content
          </Text>
          <Text size="sm" c="dimmed">
            This content is covered by a loading overlay when the spinner is visible. Toggle the
            button below to show or hide it.
          </Text>
        </Card>
      </Spinner.Overlay>
      <Group>
        <Button onClick={() => setLoading((v) => !v)}>{loading ? 'Hide' : 'Show'} overlay</Button>
      </Group>
    </Stack>
  );
}

const code = `
import { useState } from "react";
import { Spinner } from "@gfazioli/mantine-spinner";
import { Button, Card, Group, Stack, Text } from "@mantine/core";

function Demo() {
  const [loading, setLoading] = useState(true);

  return (
    <Stack align="center" gap="lg">
      <Spinner.Overlay
        visible={loading}
        blur={2}
        spinnerProps={{ size: 50, segments: 16, thickness: 4, inner: 16 }}
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder w={360}>
          <Text fw={500} size="lg" mb="xs">Card content</Text>
          <Text size="sm" c="dimmed">
            This content is covered by a loading overlay when the spinner is visible.
            Toggle the button below to show or hide it.
          </Text>
        </Card>
      </Spinner.Overlay>
      <Group>
        <Button onClick={() => setLoading((v) => !v)}>
          {loading ? "Hide" : "Show"} overlay
        </Button>
      </Group>
    </Stack>
  );
}
`;

export const overlay: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
