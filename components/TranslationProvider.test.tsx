import { render, screen, waitFor } from '@testing-library/react';
import { TranslationProvider, T, useTranslation } from './TranslationProvider';
import { useAppStore } from '@/lib/store';

jest.mock('@/lib/store', () => ({
  useAppStore: jest.fn(),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

// Component that calls useTranslation outside provider — used to test the error boundary
const TestComponent = () => {
  useTranslation();
  return <div data-testid="test-comp">Works</div>;
};

describe('TranslationProvider', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    (useAppStore as unknown as jest.Mock).mockReturnValue({ language: 'en' });
  });

  it('should render children without translating if language is English', async () => {
    render(
      <TranslationProvider>
        <T>Hello World</T>
      </TranslationProvider>
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should translate if language is not English', async () => {
    (useAppStore as unknown as jest.Mock).mockReturnValue({ language: 'hi' });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ translatedText: 'नमस्ते' }),
    });

    render(
      <TranslationProvider>
        <T>Hello World</T>
      </TranslationProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('नमस्ते')).toBeInTheDocument();
    });
    expect(mockFetch).toHaveBeenCalledWith('/api/translate', expect.any(Object));
  });

  it('should use cache for repeated translations', async () => {
    (useAppStore as unknown as jest.Mock).mockReturnValue({ language: 'hi' });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ translatedText: 'नमस्ते' }),
    });

    const { rerender } = render(
      <TranslationProvider>
        <T>Hello World</T>
      </TranslationProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('नमस्ते')).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);

    rerender(
      <TranslationProvider>
        <T>Hello World</T>
      </TranslationProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('नमस्ते')).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should fallback to original text if API fails', async () => {
    (useAppStore as unknown as jest.Mock).mockReturnValue({ language: 'hi' });
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <TranslationProvider>
        <T>Hello World</T>
      </TranslationProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should throw error if useTranslation used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow('useTranslation must be used within a TranslationProvider');
    consoleSpy.mockRestore();
  });
});
