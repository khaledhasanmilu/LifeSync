import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TravelTracker from '../app/(afterAuth)/travel/page';

// Mock fetch globally
global.fetch = jest.fn();

describe('TravelTracker Component', () => {
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
      
      if (url.includes('travel-plans')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        });
      }
      
      return Promise.reject(new Error('Unknown URL'));
    });
  });

  test('renders travel tracker dashboard', async () => {
    render(<TravelTracker />);
    
    await waitFor(() => {
      expect(screen.getByText('Travel Tracker')).toBeInTheDocument();
    });
  });
});
