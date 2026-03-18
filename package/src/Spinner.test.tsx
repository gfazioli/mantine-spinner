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

  it('has aria-label "Loading" by default', () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Loading');
  });

  it('applies animation delay to segments using duration', () => {
    const { container } = render(<Spinner segments={4} duration={1000} />);
    const lines = container.querySelectorAll('line');
    expect(lines[0]).toHaveStyle({ animationDelay: '0ms' });
    expect(lines[1]).toHaveStyle({ animationDelay: '250ms' });
  });

  it('reverses animation delay for counter-clockwise direction', () => {
    const { container } = render(
      <Spinner segments={4} duration={1000} direction="counter-clockwise" />
    );
    const lines = container.querySelectorAll('line');
    expect(lines[1]).toHaveStyle({ animationDelay: '-250ms' });
  });

  it('renders custom label', () => {
    const { container } = render(<Spinner label="Caricamento" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Caricamento');
    expect(svg).toHaveAttribute('role', 'status');
  });

  it('renders aria-hidden when label is null', () => {
    const { container } = render(<Spinner label={null} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).not.toHaveAttribute('role');
    expect(svg).not.toHaveAttribute('aria-label');
  });

  it('sets paused CSS variable when paused is true', () => {
    const { container } = render(<Spinner paused />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({ '--spinner-play-state': 'paused' });
  });

  it('sets minOpacity and maxOpacity CSS variables', () => {
    const { container } = render(<Spinner minOpacity={0.2} maxOpacity={0.8} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({ '--spinner-min-opacity': '0.2' });
    expect(svg).toHaveStyle({ '--spinner-max-opacity': '0.8' });
  });

  it('applies cyclic colors to segments', () => {
    const { container } = render(<Spinner segments={4} colors={['red', 'blue']} />);
    const lines = container.querySelectorAll('line');
    const stroke0 = lines[0].getAttribute('stroke');
    const stroke1 = lines[1].getAttribute('stroke');
    const stroke2 = lines[2].getAttribute('stroke');
    const stroke3 = lines[3].getAttribute('stroke');
    expect(stroke0).toBe(stroke2);
    expect(stroke1).toBe(stroke3);
    expect(stroke0).not.toBe(stroke1);
  });

  it('renders children inside foreignObject', () => {
    const { container } = render(<Spinner>Loading</Spinner>);
    const foreignObject = container.querySelector('foreignObject');
    expect(foreignObject).toBeTruthy();
    expect(foreignObject?.textContent).toBe('Loading');
  });

  it('does not render foreignObject when no children', () => {
    const { container } = render(<Spinner />);
    const foreignObject = container.querySelector('foreignObject');
    expect(foreignObject).toBeNull();
  });

  it('sets data-variant attribute on lines', () => {
    const { container } = render(<Spinner variant="pulse" />);
    const line = container.querySelector('line');
    expect(line).toHaveAttribute('data-variant', 'pulse');
  });

  it('defaults to fade variant', () => {
    const { container } = render(<Spinner />);
    const line = container.querySelector('line');
    expect(line).toHaveAttribute('data-variant', 'fade');
  });

  it('applies getStyles to line elements', () => {
    const { container } = render(<Spinner classNames={{ line: 'custom-line-class' }} />);
    const line = container.querySelector('line');
    expect(line?.classList.contains('custom-line-class')).toBe(true);
  });
});
