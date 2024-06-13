import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TableComponent from '../components/TableComponent';

test('Table is loaded', () => {
  render(<TableComponent />);
  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();
  expect(table).toBeVisible();
});
