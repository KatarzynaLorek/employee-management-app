import React from 'react';
import { getByText, render } from '@testing-library/react';
import TableRow from './TableRow';

describe('TableRow component', () => {
  it('renders properly', () => {
    const { getByText } = render(<TableRow />);
    expect(getByText('Name')).toBeInTheDocument();
  });

  it('renders title row', () => {
    const { getByText } = render(<TableRow isTitle />);
    expect(getByText('Actions')).toBeInTheDocument;
  });

  it('renders normal row', () => {
    const { getByText, container } = render(<TableRow />);
    expect(getByText('Update')).toBeInTheDocument;
    expect(container).not.toHaveTextContent('Actions');
  });
});
