import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupPage from '../app/signup/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('SignupPage Component', () => {
  test('renders signup page with create account message', () => {
    render(<SignupPage />);
    
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });
});
