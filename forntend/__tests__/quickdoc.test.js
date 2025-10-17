import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuickDoc from '../app/(afterAuth)/quickdock/page';

describe('QuickDoc Component', () => {
  test('renders quickdoc dashboard', () => {
    render(<QuickDoc />);
    
    expect(screen.getByText('News Hub')).toBeInTheDocument();
  });
});
