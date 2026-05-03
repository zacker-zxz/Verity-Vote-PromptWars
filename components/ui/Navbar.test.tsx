import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Navbar } from './Navbar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}));

jest.mock('@/components/TranslationProvider', () => ({
  useTranslation: () => ({ translate: (t: string) => Promise.resolve(t) }),
  T: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/lib/store', () => ({
  useAppStore: () => ({ language: 'en', setLanguage: jest.fn() }),
}));

describe('Navbar Component', () => {
  it('should render the brand logo', async () => {
    render(<Navbar />);
    // Wait for the mounted state
    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
    expect(screen.getByText('VoteGuide')).toBeInTheDocument();
  });

  it('should toggle mobile menu when hamburger is clicked', async () => {
    render(<Navbar />);
    
    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    const toggleBtn = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(toggleBtn);
    
    await waitFor(() => {
      // The menu items should be visible
      expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    });
  });

  it('should toggle language dropdown when globe is clicked', async () => {
    render(<Navbar />);
    
    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    const langBtn = screen.getByRole('button', { name: /change language/i });
    fireEvent.click(langBtn);
    
    await waitFor(() => {
      expect(screen.getByText('हिन्दी')).toBeInTheDocument();
    });
  });
});
