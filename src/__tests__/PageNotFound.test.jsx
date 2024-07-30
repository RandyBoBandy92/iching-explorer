import React from "react";
import { renderWithMockRouterAndContext } from "../test_utils/renderWithRouter";
import PageNotFound from "../pages/404/PageNotFound";
import { screen } from "@testing-library/react";

test("Navigating to a non-existent page displays the 404 page", () => {
  renderWithMockRouterAndContext(<PageNotFound />, "/404adas");
  expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
  expect(
    screen.getByText("The page you are looking for does not exist.")
  ).toBeInTheDocument();
});
