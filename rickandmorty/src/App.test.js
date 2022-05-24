import { render, screen } from "@testing-library/react";
import App from "./App";

test("title renders correctly", () => {
  render(<App />);
  const title = screen.getByRole("heading", { name: /rick and morty/i });
  expect(title).toBeInTheDocument();
});

test("loading shows correctly", () => {
  render(<App />);
  const loadingText = screen.getByRole("heading", { name: /Loading.../i });
  expect(loadingText).toBeInTheDocument();
});

test("initial characters shows correctly", () => {
  render(<App />);
});
