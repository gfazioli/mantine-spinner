import { useState } from 'react';
import { Spinner } from '@gfazioli/mantine-spinner';
import { Center, Slider, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [progress, setProgress] = useState(65);

  return (
    <Stack align="center" gap="lg">
      <Center h={200}>
        <Spinner size={120} segments={24} thickness={6} inner={38} progress={progress} color="teal">
          <Text fw={700} size="lg">
            {progress}%
          </Text>
        </Spinner>
      </Center>
      <Slider
        w={300}
        min={0}
        max={100}
        value={progress}
        onChange={setProgress}
        label={`${progress}%`}
      />
    </Stack>
  );
}

const code = `
import { useState } from "react";
import { Spinner } from "@gfazioli/mantine-spinner";
import { Center, Slider, Stack, Text } from "@mantine/core";

function Demo() {
  const [progress, setProgress] = useState(65);

  return (
    <Stack align="center" gap="lg">
      <Center h={200}>
        <Spinner
          size={120}
          segments={24}
          thickness={6}
          inner={38}
          progress={progress}
          color="teal"
        >
          <Text fw={700} size="lg">{progress}%</Text>
        </Spinner>
      </Center>
      <Slider
        w={300}
        min={0}
        max={100}
        value={progress}
        onChange={setProgress}
        label={\`\${progress}%\`}
      />
    </Stack>
  );
}
`;

export const progressDemo: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
