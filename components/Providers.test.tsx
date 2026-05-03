import { render, screen } from '@testing-library/react';
import { Providers } from './Providers';

describe('Providers Component', () => {
  it('should render children correctly', () => {
    render(
      <Providers>
        <div data-testid="child">Test Child</div>
      </Providers>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
