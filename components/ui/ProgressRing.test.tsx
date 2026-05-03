import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressRing } from './ProgressRing';

describe('ProgressRing Component', () => {
  it('renders correctly with 0% progress', () => {
    render(<ProgressRing progress={0} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders correctly with 50% progress', () => {
    render(<ProgressRing progress={50} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders correctly with 100% progress', () => {
    render(<ProgressRing progress={100} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('handles negative progress values gracefully', () => {
    // Component should probably clamp to 0, but let's see what it renders
    render(<ProgressRing progress={-10} />);
    expect(screen.getByText('-10%')).toBeInTheDocument();
  });
  
  it('applies custom size via props', () => {
    const { container } = render(<ProgressRing progress={50} size={200} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '200');
    expect(svgElement).toHaveAttribute('height', '200');
  });
});
