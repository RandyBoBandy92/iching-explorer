import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from '../context/GlobalContext';

const renderWithMockRouterAndContext = (
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

const renderWithRouterAndContext = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <GlobalProvider>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </GlobalProvider>
  );
};


export * from '@testing-library/react';
export { renderWithMockRouterAndContext, renderWithRouterAndContext };
