/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => render(<App />));

describe("app tests", () => {
  it("renders title correctly", () => {
    const title = screen.getByText(/todoapp/i);
    expect(title).toBeInTheDocument();
  });

  // all todos load correctly
  it("all todos load correctly", async () => {
    expect(await screen.findByText(/todo 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/1 left/i)).toBeInTheDocument();
  });

  // add a new todo correctly
  it("add a new todo correctly", async () => {
    userEvent.type(
      screen.getByPlaceholderText(/add new todo/i),
      "Buy Something"
    );
    userEvent.click(screen.getByText(/add/i));
    expect(await screen.findAllByRole("listitem")).toHaveLength(2);
    expect(await screen.findByText(/buy something/i)).toBeInTheDocument();
    expect(await screen.findByText(/2 left/i)).toBeInTheDocument();
  });

  // delete a todo correctly
  it("delete a todo correctly", async () => {
    userEvent.click(await screen.findByRole("button", /delete/i));
    expect(await screen.findByText(/not found todos/i)).toBeInTheDocument();
    expect(await screen.findByText(/0 left/i)).toBeInTheDocument();
  });

  // check todo correctly
  it("check todo correctly", async () => {
    userEvent.click(await screen.findByRole("checkbox"));
    expect(await screen.findByText(/0 left/i)).toBeInTheDocument();
    expect(await screen.findByRole("checkbox")).toBeChecked();
  });

  // uncheck todo correctly
  it("uncheck todo correctly", async () => {
    // to check the todo
    userEvent.click(await screen.findByRole("checkbox"));
    // to uncheck the todo
    userEvent.click(await screen.findByRole("checkbox"));
    expect(await screen.findByRole("checkbox")).not.toBeChecked();
    expect(await screen.findByText(/1 left/i)).toBeInTheDocument();
  });
});
