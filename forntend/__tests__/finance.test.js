import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FinanceTracker from '../app/(afterAuth)/finance/page';

// Mock fetch globally
global.fetch = jest.fn();

describe('FinanceTracker Component', () => {
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
      
      if (url.includes('income-expense')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ total_income: 1000, total_expense: 500, saving: 500 })
        });
      }

      if (url.includes('budget')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        });
      }
      
      return Promise.reject(new Error('Unknown URL'));
    });
  });

  test('renders finance dashboard', async () => {
    render(<FinanceTracker />);
    
    await waitFor(() => {
      expect(screen.getByText('Financial Dashboard')).toBeInTheDocument();
    });
  });
});
