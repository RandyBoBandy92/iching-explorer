import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { GlobalProvider } from "../context/GlobalContext";

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <GlobalProvider>
        <MemoryRouter initialEntries={[route]}>
        {ui}
        </MemoryRouter>
    </GlobalProvider>
  );
}

export * from "@testing-library/react";
export { renderWithRouter };