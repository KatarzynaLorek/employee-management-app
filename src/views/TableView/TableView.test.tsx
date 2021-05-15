import React from 'react';
import { render } from '@testing-library/react';
import TableView from './TableView';

describe('TableView component', () => {
  it('renders properly', () => {
    const { getByText } = render(<TableView />);
    expect(getByText('Add')).toBeInTheDocument();
  });
});
