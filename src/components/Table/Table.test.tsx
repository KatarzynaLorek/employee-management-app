import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';

describe('Table component', () => {
  it('renders properly', () => {
    const { getAllByText } = render(<Table />);
    expect(getAllByText('Name')).toHaveLength(6);
  });
});
