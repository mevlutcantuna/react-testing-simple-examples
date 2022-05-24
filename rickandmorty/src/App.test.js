import { render, screen } from "@testing-library/react";
import App from "./App";

test("title renders correctly", () => {
  render(<App />);
  const title = screen.getByRole('heading');
  expect(title).toHaveTextContent(/rick and morty/i);
});

