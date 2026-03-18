import { Spinner } from '@gfazioli/mantine-spinner';
import { Center } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Center h={200}>
      <Spinner.Group>
        <Spinner size={120} segments={20} thickness={4} inner={44} color="blue" duration={1400} />
        <Spinner
          size={70}
          segments={14}
          thickness={3}
          inner={22}
          color="cyan"
          direction="counter-clockwise"
          duration={1000}
        />
        <Spinner size={30} segments={8} thickness={2} inner={8} color="violet" duration={800} />
      </Spinner.Group>
    </Center>
  );
}

const code = `
import { Spinner } from "@gfazioli/mantine-spinner";
import { Center } from "@mantine/core";

function Demo() {
  return (
    <Center h={200}>
      <Spinner.Group>
        <Spinner size={120} segments={20} thickness={4} inner={44} color="blue" duration={1400} />
        <Spinner
          size={70}
          segments={14}
          thickness={3}
          inner={22}
          color="cyan"
          direction="counter-clockwise"
          duration={1000}
        />
        <Spinner size={30} segments={8} thickness={2} inner={8} color="violet" duration={800} />
      </Spinner.Group>
    </Center>
  );
}
`;

export const group: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
