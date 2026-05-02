import { Spinner } from '@gfazioli/mantine-spinner';
import { Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Stack align="center" gap="md">
      <Text size="sm" c="dimmed">
        Resize the viewport — the spinner scales via CSS media queries with no React re-renders.
      </Text>
      <Spinner size={{ base: 'sm', sm: 'md', md: 'lg', lg: 'xl', xl: 100 }} />
    </Stack>
  );
}

const code = `
import { Spinner } from "@gfazioli/mantine-spinner";

function Demo() {
  return (
    <Spinner
      size={{
        base: "sm",
        sm: "md",
        md: "lg",
        lg: "xl",
        xl: 100,
      }}
    />
  );
}
`;

export const responsive: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
