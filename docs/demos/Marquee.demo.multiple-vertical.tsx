import { Spinner } from "@gfazioli/mantine-spinner";
import { Box, Flex } from "@mantine/core";
import { MantineDemo } from "@mantinex/demo";
import { ReactNode } from "react";

function Wrapper(props: any) {
  function BoxComponent({
    children,
    ...props
  }: {
    children: ReactNode;
    [key: string]: any;
  }) {
    return (
      <Box
        {...props}
        p="md"
        w="200px"
        c="white"
        style={{ borderRadius: "8px" }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Flex w={500}>
      <Spinner h={300} fadeEdges vertical>
        <BoxComponent bg="red">Hello World #1</BoxComponent>
        <BoxComponent bg="cyan">Hope you like it #2</BoxComponent>
        <BoxComponent bg="blue">Have a nice day #3</BoxComponent>
        <BoxComponent bg="lime">Goodbye #4</BoxComponent>
      </Spinner>
      <Spinner h={300} reverse fadeEdges vertical>
        <BoxComponent bg="red">Hello World #1</BoxComponent>
        <BoxComponent bg="cyan">Hope you like it #2</BoxComponent>
        <BoxComponent bg="blue">Have a nice day #3</BoxComponent>
        <BoxComponent bg="lime">Goodbye #4</BoxComponent>
      </Spinner>
    </Flex>
  );
}

const code = `
import { Spinner } from '@gfazioli/mantine-spinner';

  function BoxComponent({ children, ...props }: { children: ReactNode; [key: string]: any }) {
    return (
      <Box {...props} p="md" w="200px" c="white" style={{ borderRadius: '8px' }}>
        {children}
      </Box>
    );
  }

  return (
    <Flex w={500}>
      <Spinner h={300} fadeEdges vertical>
        <BoxComponent bg="red">Hello World #1</BoxComponent>
        <BoxComponent bg="cyan">Hope you like it #2</BoxComponent>
        <BoxComponent bg="blue">Have a nice day #3</BoxComponent>
        <BoxComponent bg="lime">Goodbye #4</BoxComponent>
      </Spinner>
      <Spinner h={300} reverse fadeEdges vertical>
        <BoxComponent bg="red">Hello World #1</BoxComponent>
        <BoxComponent bg="cyan">Hope you like it #2</BoxComponent>
        <BoxComponent bg="blue">Have a nice day #3</BoxComponent>
        <BoxComponent bg="lime">Goodbye #4</BoxComponent>
      </Spinner>
    </Flex>
  );
}
`;

export const multipleVertical: MantineDemo = {
  type: "code",
  component: Wrapper,
  code,
  centered: true,
};
