// Header test
// Check if links in header are working

import * as React from "react";
import { render, screen } from "@testing-library/react";
import Header, { pages } from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Mock router
const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />} />
    </Routes>
  </BrowserRouter>
);

test("renders header links", () => {
  render(<Router />);

  // Check if links are rendered
  const links = pages.map((page) =>
    screen.getByRole("link", { name: page.name })
  );

  // Expect links to exist
  expect(links.length).toBeGreaterThan(0);
});

test("check if links in header are working", () => {
  render(<Router />);

  // Check if links are rendered
  const links = pages.map((page) =>
    screen.getByRole("link", { name: page.name })
  );

  // Expect links to exist
  expect(links.length).toBeGreaterThan(0);

  // Check if links are working
  links.forEach((link) => {
    const href = link.getAttribute("href");
    expect(href).toBe(
      pages.find((page) => page.name === link.textContent)?.path
    );
  });
});
