import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LifeSyncToDo from '../app/(afterAuth)/todo/page';

// Mock fetch globally
global.fetch = jest.fn();

describe('LifeSyncToDo Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    fetch.mockClear();
    
    // Mock API responses
    fetch.mockImplementation((url) => {
      if (url === '/api/usr') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ userId: 'test-user-123' })
        });
      }
      
      if (url.includes('tasks')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ tasks: [] })
        });
      }
      
      return Promise.reject(new Error('Unknown URL'));
    });
  });

  test('renders todo dashboard', async () => {
    render(<LifeSyncToDo />);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Dashboard/i })).toBeInTheDocument();
    });
  });
});
