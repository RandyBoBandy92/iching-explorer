import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

const renderWithRouterAndContext = (
  ui,
  {
    route = '/',
    contexts = [],
  } = {}
) => {
  window.history.pushState({}, 'Test page', route);

  const Providers = ({ children }) => (
    <MemoryRouter initialEntries={[route]}>
      {contexts.reduce((acc, { provider: Provider, value }) => (
        <Provider value={value}>{acc}</Provider>
      ), children)}
    </MemoryRouter>
  );

  Providers.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return render(<Providers>{ui}</Providers>);
};

export * from '@testing-library/react';
export { renderWithRouterAndContext };
