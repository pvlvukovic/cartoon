// Test for search component
import * as React from "react";
import { render, screen } from "@testing-library/react";
import Search from "./Search";

test("render search component", () => {
  render(<Search onSearch={() => null} value="" />);

  // input element
  const input = screen.getByPlaceholderText("Search");

  expect(input).toBeInTheDocument();
});

test("onSearch is called when user stops typing", () => {
  let value = "";

  const onSearch = jest.fn();
  render(<Search onSearch={onSearch} value={value} />);

  // user types something every 200ms
  const interval = setInterval(() => {
    value += "a";
  }, 200);

  // user stops typing
  setTimeout(() => {
    clearInterval(interval);
    expect(value).toBe("aaaa");
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(value);
  }, 1000);
});
