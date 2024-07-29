/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/home/Home";
import { renderWithRouter } from "../test_utils/renderWithRouter";

test("renders the Home component", () => {
  renderWithRouter(<Home />, { route: "/" });
  // Add your assertions here
  // expect "Reading" to be in the document
  expect(screen.getByText(/Reading/i)).toBeInTheDocument();
});
