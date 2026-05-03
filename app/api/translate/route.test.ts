/**
 * @jest-environment node
 */
import { POST } from './route';
import { NextRequest } from 'next/server';

describe('Translate API', () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
    process.env.GOOGLE_TRANSLATE_API_KEY = 'fake-api-key';
  });

  it('should return 400 if text is missing', async () => {
    const req = new NextRequest('http://localhost/api/translate', {
      method: 'POST',
      body: JSON.stringify({ targetLanguage: 'hi' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    
    const json = await res.json();
    expect(json.error).toBeDefined();
  });

  it('should return 413 if text is too long', async () => {
    const req = new NextRequest('http://localhost/api/translate', {
      method: 'POST',
      body: JSON.stringify({ text: 'a'.repeat(5001), targetLanguage: 'hi' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(413);
  });

  it('should call Google Translate API and return translated text', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { translations: [{ translatedText: 'नमस्ते' }] }
      })
    });

    const req = new NextRequest('http://localhost/api/translate', {
      method: 'POST',
      body: JSON.stringify({ text: 'Hello', targetLanguage: 'hi' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    
    const json = await res.json();
    expect(json.translatedText).toBe('नमस्ते');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('translation.googleapis.com'),
      expect.any(Object)
    );
  });

  it('should fallback if API key is missing', async () => {
    delete process.env.GOOGLE_TRANSLATE_API_KEY;

    const req = new NextRequest('http://localhost/api/translate', {
      method: 'POST',
      body: JSON.stringify({ text: 'Hello', targetLanguage: 'hi' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    
    const json = await res.json();
    expect(json.translatedText).toBe('Hello');
    expect(json.note).toContain('API not configured');
  });
});
