import { ReactNode } from 'react';
import { Spinner } from '@gfazioli/mantine-spinner';
import {
  IconBrand4chan,
  IconBrandAmazon,
  IconBrandBing,
  IconBrandGithub,
  IconBrandMantine,
  IconBrandWhatsapp,
  IconBrandWordpress,
} from '@tabler/icons-react';
import { ThemeIcon } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Wrapper(props: any) {
  const iconsBrand = [
    <IconBrand4chan style={{ width: '70%', height: '70%' }} />,
    <IconBrandWhatsapp style={{ width: '70%', height: '70%' }} />,
    <IconBrandWordpress style={{ width: '70%', height: '70%' }} />,
    <IconBrandBing style={{ width: '70%', height: '70%' }} />,
    <IconBrandGithub style={{ width: '70%', height: '70%' }} />,
    <IconBrandMantine style={{ width: '70%', height: '70%' }} />,
    <IconBrandAmazon style={{ width: '70%', height: '70%' }} />,
  ];

  function BoxComponent({ children, ...props }: { children: ReactNode; [key: string]: any }) {
    return (
      <ThemeIcon {...props} variant="transparent" size={'120px'}>
        {children}
      </ThemeIcon>
    );
  }

  return (
    <Spinner w={792} pauseOnHover fadeEdges>
      {iconsBrand.map((icon, index) => (
        <BoxComponent key={index}>{icon}</BoxComponent>
      ))}
    </Spinner>
  );
}

const code = `
import { Spinner } from '@gfazioli/mantine-spinner';
import {
  IconBrand4chan,
  IconBrandAmazon,
  IconBrandBing,
  IconBrandGithub,
  IconBrandMantine,
  IconBrandWhatsapp,
  IconBrandWordpress,
} from "@tabler/icons-react";

function Demo() {
  const iconsBrand = [
    <IconBrand4chan style={{ width: '70%', height: '70%' }} />,
    <IconBrandWhatsapp style={{ width: '70%', height: '70%' }} />,
    <IconBrandWordpress style={{ width: '70%', height: '70%' }} />,
    <IconBrandBing style={{ width: '70%', height: '70%' }} />,
    <IconBrandGithub style={{ width: '70%', height: '70%' }} />,
    <IconBrandMantine style={{ width: '70%', height: '70%' }} />,
    <IconBrandAmazon style={{ width: '70%', height: '70%' }} />,
  ];

  function BoxComponent({ children, ...props }: { children: ReactNode; [key: string]: any }) {
    return (
      <ThemeIcon {...props} variant="transparent" size={'120px'}>
        {children}
      </ThemeIcon>
    );
  }

  return (
    <Spinner w={792} pauseOnHover fadeEdges>
      {iconsBrand.map((icon, index) => (
        <BoxComponent key={index}>{icon}</BoxComponent>
      ))}
    </Spinner>
  );
}
`;

export const example: MantineDemo = {
  type: 'code',
  component: Wrapper,
  code,
};
