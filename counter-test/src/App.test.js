import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("counter initial value is equal to zero", () => {
  render(<App />);
  const counter = screen.getByText(0);
  expect(counter).toBeInTheDocument();
});

test("increment button works correctly", () => {
  render(<App />);
  const inc = screen.getByText(/increment/i);
  const counter = screen.getByText(0);
  expect(counter).toBeInTheDocument();
  userEvent.click(inc);
  expect(counter).toHaveTextContent(1);
});

test("decrement button works correctly", () => {
  render(<App />);
  const dec = screen.getByText(/decrement/i);
  const counter = screen.getByText(0);
  userEvent.click(dec);
  expect(counter).toHaveTextContent(-1);
});
