import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormComponent from '../components/FormComponent';

test('onSubmit function is called with input value', () => {
  const mockOnSubmit = jest.fn();
  render(<FormComponent onSubmit={mockOnSubmit} />);

  const input = screen.getByPlaceholderText('Enter text');
  const button = screen.getByText('Submit');

  fireEvent.change(input, { target: { value: 'test input' } });
  fireEvent.click(button);

  expect(mockOnSubmit).toHaveBeenCalledWith('test input');
  expect(input.value).toBe(''); // Input should be cleared after submission
});
