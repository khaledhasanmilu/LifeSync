import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LifeSyncDashboard from '../app/(afterAuth)/dashboard/page';

// Mock fetch globally
global.fetch = jest.fn();

describe('LifeSyncDashboard Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    fetch.mockClear();
    
    // Mock API responses
    fetch.mockImplementation((url) => {
      if (url === '/api/usr') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ username: 'Test User' })
        });
      }
      
      if (url.includes('income-expense')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ total_income: 1000, total_expense: 500, saving: 500 })
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

  test('renders dashboard with user name', async () => {
    render(<LifeSyncDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText(/Welcome back/)).toBeInTheDocument();
    });

    expect(screen.getByText('Guest')).toBeInTheDocument();
  });
});
