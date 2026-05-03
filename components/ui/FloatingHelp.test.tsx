import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FloatingHelp } from './FloatingHelp';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}));

jest.mock('@/components/TranslationProvider', () => ({
  useTranslation: () => ({ translate: (t: string) => Promise.resolve(t) }),
  T: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('FloatingHelp Component', () => {
  it('should render the help button initially', () => {
    render(<FloatingHelp />);
    expect(screen.getByRole('button', { name: /open help chat/i })).toBeInTheDocument();
  });

  it('should open the chat interface when clicked', async () => {
    render(<FloatingHelp />);
    
    const button = screen.getByRole('button', { name: /open help chat/i });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('VoteGuide Assistant')).toBeInTheDocument();
    });
  });

  it('should close the chat interface when close button is clicked', async () => {
    render(<FloatingHelp />);
    
    // Open
    fireEvent.click(screen.getByRole('button', { name: /open help chat/i }));
    
    // Check it's open
    await waitFor(() => {
      expect(screen.getByText('VoteGuide Assistant')).toBeInTheDocument();
    });

    // Close
    const closeBtn = screen.getByRole('button', { name: /open help chat/i }); // It's the same FAB button toggle
    fireEvent.click(closeBtn);

    // Check it's closed
    await waitFor(() => {
      expect(screen.queryByText('VoteGuide Assistant')).not.toBeInTheDocument();
    });
  });
});
