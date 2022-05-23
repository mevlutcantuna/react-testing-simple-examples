import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders title correctly", () => {
  render(<App />);
  const title = screen.getByText(/todoapp/i);
  expect(title).toBeInTheDocument();
});

test("input value initially doesnt have", () => {
  render(<App />);
  const input = screen.getByRole("textbox", { type: "text" });
  expect(input).toHaveDisplayValue("");
  userEvent.type(input, "example 1");
  expect(input).toHaveDisplayValue(/example 1/i);
});

test("input value changes correctly", () => {
  render(<App />);
  const input = screen.getByRole("textbox", { type: "text" });
  userEvent.type(input, "example 1");
  expect(input).toHaveDisplayValue(/example 1/i);
});

test("if todo is empty,it doesn't save", () => {
  render(<App />);
  window.alert = jest.fn();
  const btn = screen.getByRole("button", { name: /add/i });
  const listGroup = screen.getByRole("list");
  userEvent.click(btn);
  expect(listGroup).toBeEmptyDOMElement();
  window.alert.mockClear();
});

test("add a new todo correctly", () => {
  render(<App />);
  const input = screen.getByRole("textbox", { type: "text" });
  const btn = screen.getByRole("button", { name: /add/i });

  userEvent.type(input, "example todo 1");
  userEvent.click(btn);
  const listItem = screen.getByRole("listitem", { title: /example todo 1/i });
  expect(listItem).toBeInTheDocument();
});

test("add two new todo correctly", () => {
  render(<App />);
  const input = screen.getByRole("textbox", { type: "text" });
  const btn = screen.getByRole("button", { name: /add/i });

  userEvent.type(input, "example todo 1");
  userEvent.click(btn);
  userEvent.type(input, "example todo 2");
  userEvent.click(btn);
  const listItems = screen.getAllByRole("listitem");
  expect(listItems).toHaveLength(2);
});

test("delete a todo correctly", () => {
  render(<App />);
  const input = screen.getByRole("textbox", { type: "text" });
  const btn = screen.getByRole("button", { name: /add/i });

  userEvent.type(input, "example todo 1");
  userEvent.click(btn);
  const listItem = screen.getByRole("listitem");
  expect(listItem).toBeInTheDocument();

  const deleteBtn = screen.getByRole("button", { name: /Delete/i });
  userEvent.click(deleteBtn);
  expect(listItem).not.toBeInTheDocument();
});

test("check a todo correctly", () => {
  render(<App />);
  const input = screen.getByRole("textbox", { type: "text" });
  const btn = screen.getByRole("button", { name: /add/i });

  userEvent.type(input, "example todo 1");
  userEvent.click(btn);
  const listItem = screen.getByRole("listitem");
  expect(listItem).toBeInTheDocument();

  const checkBoxInput = screen.getByRole("checkbox");
  expect(checkBoxInput).not.toBeChecked();
  userEvent.click(checkBoxInput);
  expect(checkBoxInput).toBeChecked();
});
