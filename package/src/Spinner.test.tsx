import React from 'react';
import { render } from '@mantine-tests/core';
import { defaultProps, Spinner } from './Spinner';
import { SpinnerGroup } from './SpinnerGroup';
import { SpinnerOverlay } from './SpinnerOverlay';

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

  it('sets trail variant', () => {
    const { container } = render(<Spinner variant="trail" />);
    const line = container.querySelector('line');
    expect(line).toHaveAttribute('data-variant', 'trail');
  });

  it('applies gradient colors across segments', () => {
    const { container } = render(
      <Spinner segments={3} gradient={{ from: '#000000', to: '#ffffff' }} />
    );
    const lines = container.querySelectorAll('line');
    const stroke0 = lines[0].getAttribute('stroke');
    const stroke1 = lines[1].getAttribute('stroke');
    const stroke2 = lines[2].getAttribute('stroke');
    expect(stroke0).toBe('rgb(0, 0, 0)');
    expect(stroke1).toBe('rgb(128, 128, 128)');
    expect(stroke2).toBe('rgb(255, 255, 255)');
  });

  it('gradient overrides color and colors props', () => {
    const { container } = render(
      <Spinner
        segments={2}
        color="red"
        colors={['green', 'blue']}
        gradient={{ from: '#000000', to: '#ffffff' }}
      />
    );
    const lines = container.querySelectorAll('line');
    expect(lines[0].getAttribute('stroke')).toBe('rgb(0, 0, 0)');
    expect(lines[1].getAttribute('stroke')).toBe('rgb(255, 255, 255)');
  });

  it('progress mode fills correct number of segments', () => {
    const { container } = render(<Spinner segments={10} progress={50} />);
    const lines = container.querySelectorAll('line');
    const filled = Array.from(lines).filter((l) => l.style.opacity === '1');
    const unfilled = Array.from(lines).filter((l) => l.style.opacity === '0');
    expect(filled).toHaveLength(5);
    expect(unfilled).toHaveLength(5);
  });

  it('progress mode sets data-progress and removes data-variant', () => {
    const { container } = render(<Spinner progress={50} />);
    const line = container.querySelector('line');
    expect(line).toHaveAttribute('data-progress');
    expect(line).not.toHaveAttribute('data-variant');
  });

  it('progress 0 shows no filled segments', () => {
    const { container } = render(<Spinner segments={8} progress={0} />);
    const lines = container.querySelectorAll('line');
    const filled = Array.from(lines).filter((l) => l.style.opacity === '1');
    expect(filled).toHaveLength(0);
  });

  it('progress 100 fills all segments', () => {
    const { container } = render(<Spinner segments={8} progress={100} />);
    const lines = container.querySelectorAll('line');
    const filled = Array.from(lines).filter((l) => l.style.opacity === '1');
    expect(filled).toHaveLength(8);
  });

  it('progress clamps values outside 0-100', () => {
    const { container } = render(<Spinner segments={10} progress={150} />);
    const lines = container.querySelectorAll('line');
    const filled = Array.from(lines).filter((l) => l.style.opacity === '1');
    expect(filled).toHaveLength(10);
  });

  it('glow boolean renders SVG filter with default intensity', () => {
    const { container } = render(<Spinner glow />);
    const filter = container.querySelector('filter');
    expect(filter).toBeTruthy();
    const blur = container.querySelector('feGaussianBlur');
    expect(blur).toHaveAttribute('stdDeviation', '3');
  });

  it('glow number renders SVG filter with custom intensity', () => {
    const { container } = render(<Spinner glow={5} />);
    const blur = container.querySelector('feGaussianBlur');
    expect(blur).toHaveAttribute('stdDeviation', '5');
  });

  it('glow applies filter attribute to lines', () => {
    const { container } = render(<Spinner glow />);
    const line = container.querySelector('line');
    expect(line?.getAttribute('filter')).toMatch(/url\(#spinner-glow/);
  });

  it('no filter when glow is 0 or false', () => {
    const { container } = render(<Spinner variant="fade" />);
    const filter = container.querySelector('filter');
    expect(filter).toBeNull();
    const line = container.querySelector('line');
    expect(line?.getAttribute('filter')).toBeNull();
  });

  it('hueRotate sets data-hue-rotate on root', () => {
    const { container } = render(<Spinner hueRotate />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('data-hue-rotate');
  });

  it('no data-hue-rotate when hueRotate is false', () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector('svg');
    expect(svg).not.toHaveAttribute('data-hue-rotate');
  });

  it('glow and hueRotate work together', () => {
    const { container } = render(<Spinner glow={3} hueRotate />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('data-hue-rotate');
    const filter = container.querySelector('filter');
    expect(filter).toBeTruthy();
  });

  it('gradientFrom and gradientTo create gradient', () => {
    const { container } = render(
      <Spinner segments={2} gradientFrom="#000000" gradientTo="#ffffff" />
    );
    const lines = container.querySelectorAll('line');
    expect(lines[0].getAttribute('stroke')).toBe('rgb(0, 0, 0)');
    expect(lines[1].getAttribute('stroke')).toBe('rgb(255, 255, 255)');
  });

  it('progress mode uses role="progressbar" with ARIA attributes', () => {
    const { container } = render(<Spinner progress={65} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('role', 'progressbar');
    expect(svg).toHaveAttribute('aria-valuenow', '65');
    expect(svg).toHaveAttribute('aria-valuemin', '0');
    expect(svg).toHaveAttribute('aria-valuemax', '100');
    expect(svg).toHaveAttribute('aria-label', 'Loading');
  });

  it('non-progress mode uses role="status"', () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('role', 'status');
    expect(svg).not.toHaveAttribute('aria-valuenow');
  });

  it('segmentShape dot renders circle elements', () => {
    const { container } = render(<Spinner segmentShape="dot" segments={4} />);
    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(4);
    const lines = container.querySelectorAll('line');
    expect(lines).toHaveLength(0);
  });

  it('segmentShape dot uses fill for color', () => {
    const { container } = render(<Spinner segmentShape="dot" color="red" />);
    const circle = container.querySelector('circle');
    expect(circle).toHaveAttribute('fill');
    expect(circle).not.toHaveAttribute('stroke-width');
  });

  it('segmentShape arc renders path elements', () => {
    const { container } = render(<Spinner segmentShape="arc" segments={4} />);
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(4);
    const lines = container.querySelectorAll('line');
    expect(lines).toHaveLength(0);
  });

  it('segmentShape arc uses stroke for color', () => {
    const { container } = render(<Spinner segmentShape="arc" color="red" />);
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('stroke');
    expect(path).toHaveAttribute('fill', 'none');
  });

  it('segmentShape defaults to line', () => {
    const { container } = render(<Spinner segments={4} />);
    const lines = container.querySelectorAll('line');
    expect(lines).toHaveLength(4);
  });

  it('gradient prop overrides gradientFrom/gradientTo', () => {
    const { container } = render(
      <Spinner
        segments={2}
        gradientFrom="#ff0000"
        gradientTo="#00ff00"
        gradient={{ from: '#000000', to: '#ffffff' }}
      />
    );
    const lines = container.querySelectorAll('line');
    expect(lines[0].getAttribute('stroke')).toBe('rgb(0, 0, 0)');
    expect(lines[1].getAttribute('stroke')).toBe('rgb(255, 255, 255)');
  });
});

describe('SpinnerGroup', () => {
  it('renders children', () => {
    const { container } = render(
      <SpinnerGroup>
        <Spinner />
        <Spinner />
      </SpinnerGroup>
    );
    const svgs = container.querySelectorAll('svg');
    expect(svgs).toHaveLength(2);
  });

  it('has correct displayName', () => {
    expect(SpinnerGroup.displayName).toBe('SpinnerGroup');
  });

  it('applies className', () => {
    const { container } = render(
      <SpinnerGroup className="custom-group">
        <Spinner />
      </SpinnerGroup>
    );
    const group = container.querySelector('.custom-group');
    expect(group).toBeTruthy();
  });
});

describe('SpinnerOverlay', () => {
  it('renders overlay when visible', () => {
    const { container } = render(
      <SpinnerOverlay visible>
        <div>Content</div>
      </SpinnerOverlay>
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('hides overlay when not visible', () => {
    const { container } = render(
      <SpinnerOverlay visible={false}>
        <div>Content</div>
      </SpinnerOverlay>
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeNull();
  });

  it('renders children content', () => {
    const { container } = render(
      <SpinnerOverlay visible={false}>
        <div data-testid="content">Content</div>
      </SpinnerOverlay>
    );
    expect(container.querySelector('[data-testid="content"]')).toBeTruthy();
  });

  it('has correct displayName', () => {
    expect(SpinnerOverlay.displayName).toBe('SpinnerOverlay');
  });

  it('passes spinnerProps to inner Spinner', () => {
    const { container } = render(
      <SpinnerOverlay visible spinnerProps={{ segments: 8 }}>
        <div>Content</div>
      </SpinnerOverlay>
    );
    const lines = container.querySelectorAll('line');
    expect(lines).toHaveLength(8);
  });
});
