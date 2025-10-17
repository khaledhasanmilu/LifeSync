import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LearningQueue from '../app/(afterAuth)/learning/page';

// Mock fetch globally
global.fetch = jest.fn();

describe('LearningQueue Component', () => {
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
      
      if (url.includes('learning')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            {
              id: 1,
              name: 'Python Basics',
              type: 'YouTube',
              tags: ['Programming', 'Python'],
              progress: 10,
              total: 40,
              unit: 'min',
              status: 'in-progress',
              deadline: '2024-12-15',
              link: 'https://youtube.com/playlist/python-course'
            }
          ])
        });
      }
      
      return Promise.reject(new Error('Unknown URL'));
    });
  });

  test('renders learning queue dashboard', async () => {
    render(<LearningQueue />);
    
    await waitFor(() => {
      expect(screen.getByText('Learning Queue')).toBeInTheDocument();
    });
  });
});
