/**
 * @jest-environment node
 */
import { POST } from './route';
import { NextRequest } from 'next/server';

describe('Chat API', () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    mockFetch.mockClear();
    process.env.GEMINI_API_KEY = 'fake-api-key';
  });

  it('should return 400 for empty or invalid message', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: '   ' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('should return 413 if message is too long', async () => {
    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'a'.repeat(1001) }),
    });

    const res = await POST(req);
    expect(res.status).toBe(413);
  });

  it('should call Gemini API and return reply', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: 'Here is your answer.' }] } }]
      })
    });

    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'How do I vote?' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    
    const json = await res.json();
    expect(json.reply).toBe('Here is your answer.');
  });

  it('should return fallback response if API fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const req = new NextRequest('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'I need to register' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    
    const json = await res.json();
    expect(json.reply).toContain('register to vote online'); // Matches fallback response for 'register'
  });
});
