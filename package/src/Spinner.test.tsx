import React from 'react';
import { render } from '@mantine-tests/core';
import { defaultProps, Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spinner />);
    expect(container).toBeTruthy();
  });

  it('has correct displayName', () => {
    expect(Spinner.displayName).toBe('Spinner');
  });

  it('renders correct number of segments by default', () => {
    const { container } = render(<Spinner />);
    const lines = container.querySelectorAll('line');
    expect(lines).toHaveLength(defaultProps.segments!);
  });

  it('renders custom number of segments', () => {
    const { container } = render(<Spinner segments={8} />);
    const lines = container.querySelectorAll('line');
    expect(lines).toHaveLength(8);
  });

  it('renders SVG with correct size for predefined sizes', () => {
    const { container } = render(<Spinner size="xl" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '58');
    expect(svg).toHaveAttribute('height', '58');
  });

  it('renders SVG with custom numeric size', () => {
    const { container } = render(<Spinner size={100} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '100');
    expect(svg).toHaveAttribute('height', '100');
  });

  it('applies stroke color from color prop', () => {
    const { container } = render(<Spinner color="red" />);
    const line = container.querySelector('line');
    expect(line).toHaveAttribute('stroke');
  });

  it('applies strokeWidth from thickness prop', () => {
    const { container } = render(<Spinner thickness={5} />);
    const line = container.querySelector('line');
    expect(line).toHaveAttribute('stroke-width', '5');
  });

  it('has role="status" for accessibility', () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('role', 'status');
  });

  it('has aria-label for accessibility', () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Loading');
  });

  it('applies animation delay to segments', () => {
    const { container } = render(<Spinner segments={4} speed={1000} />);
    const lines = container.querySelectorAll('line');
    expect(lines[0]).toHaveStyle({ animationDelay: '0ms' });
    expect(lines[1]).toHaveStyle({ animationDelay: '250ms' });
  });

  it('reverses animation delay for counter-clockwise direction', () => {
    const { container } = render(
      <Spinner segments={4} speed={1000} direction="counter-clockwise" />
    );
    const lines = container.querySelectorAll('line');
    expect(lines[1]).toHaveStyle({ animationDelay: '-250ms' });
  });
});
