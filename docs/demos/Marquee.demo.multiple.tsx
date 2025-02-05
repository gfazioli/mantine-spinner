import { Spinner } from "@gfazioli/mantine-spinner";
import { Box } from "@mantine/core";
import { MantineDemo } from "@mantinex/demo";
import { ReactNode } from "react";

function Wrapper() {
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
    <>
      <Spinner w={790} mb={16} fadeEdges>
        <BoxComponent bg="red">Hello World #1</BoxComponent>
        <BoxComponent bg="cyan">Hope you like it #2</BoxComponent>
        <BoxComponent bg="blue">Have a nice day #3</BoxComponent>
        <BoxComponent bg="lime">Goodbye #4</BoxComponent>
      </Spinner>
      <Spinner reverse w={790} fadeEdges>
        <BoxComponent bg="red">Hello World #1</BoxComponent>
        <BoxComponent bg="cyan">Hope you like it #2</BoxComponent>
        <BoxComponent bg="blue">Have a nice day #3</BoxComponent>
        <BoxComponent bg="lime">Goodbye #4</BoxComponent>
      </Spinner>
    </>
  );
}

const code = `
import { Spinner } from '@gfazioli/mantine-spinner';

function Demo() {
  function BoxComponent({ children, ...props }: { children: ReactNode; [key: string]: any }) {
    return (
      <Box {...props} p="md" w="200px" c="white" style={{ borderRadius: '8px' }}>
        {children}
      </Box>
    );
  }

  return (
    <>
      <Spinner w={800} mb={16} fadeEdges>
        <BoxComponent bg="red">Hello World #1</BoxComponent>
        <BoxComponent bg="cyan">Hope you like it #2</BoxComponent>
        <BoxComponent bg="blue">Have a nice day #3</BoxComponent>
        <BoxComponent bg="lime">Goodbye #4</BoxComponent>
      </Spinner>
      <Spinner reverse w={800} fadeEdges>
        <BoxComponent bg="red">Hello World #1</BoxComponent>
        <BoxComponent bg="cyan">Hope you like it #2</BoxComponent>
        <BoxComponent bg="blue">Have a nice day #3</BoxComponent>
        <BoxComponent bg="lime">Goodbye #4</BoxComponent>
      </Spinner>
    </>
  );
}
`;

export const multiple: MantineDemo = {
  type: "code",
  component: Wrapper,
  code,
};
