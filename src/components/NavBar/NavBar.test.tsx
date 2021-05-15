import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import NavBar from './NavBar';

const renderNavBar = () => {
  const history = createMemoryHistory();
  return render(
    <Router history={history}>
      <NavBar />
    </Router>,
  );
};

describe('NavBar component', () => {
  it('renders NavBar properly', () => {
    const { getByText } = renderNavBar();
    expect(getByText('Employee management app')).toBeInTheDocument();
  });
});
