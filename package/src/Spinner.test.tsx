import { render, tests } from '@mantine-tests/core';
import React from 'react';
import { Spinner, SpinnerProps, SpinnerStylesNames } from './Spinner';

const defaultProps: SpinnerProps = {};

describe('@mantine/core/Spinner', () => {
  tests.itSupportsSystemProps<SpinnerProps, SpinnerStylesNames>({
    component: Spinner,
    props: defaultProps,
    styleProps: true,
    children: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@mantine/core/Spinner',
    stylesApiSelectors: ['root'],
  });

  it('supports perspective prop', () => {
    const { container } = render(<Spinner gap="500px" />);
    expect(container.querySelector('.mantine-Spinner-root')).toHaveStyle({ perspective: '500px' });
  });
});
