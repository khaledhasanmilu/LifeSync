import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../app/login/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('LoginPage Component', () => {
  test('renders login page with welcome message', () => {
    render(<LoginPage />);
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });
});
