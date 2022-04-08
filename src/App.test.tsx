import * as React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app title", () => {
  render(<App />);

  // Check if title is "Rick and Morty"
  // There can be multiple elements containing the string
  const elements = screen.getAllByText("Rick and Morty");

  // Expect elements to exist
  expect(elements.length).toBeGreaterThan(0);
});
