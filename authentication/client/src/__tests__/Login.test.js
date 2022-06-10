/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/LoginPage";

const MockLogin = () => {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

beforeEach(() => render(<MockLogin />));

describe("Login Page Tests", () => {
  it("if inputs are empty,returns error", () => {
    userEvent.click(screen.getByRole("button", /login/i));
    expect(screen.getByText(/please provide all inputs/i)).toBeInTheDocument();
  });

  // not found user
  it("user don't find", async () => {
    userEvent.type(screen.getByPlaceholderText(/email/i), "noneuser@gmail.com");
    userEvent.type(screen.getByPlaceholderText(/password/i), "nononon");
    userEvent.click(screen.getByRole("button", /login/i));

    expect(await screen.findByText(/account not found/i)).toBeInTheDocument();
  });
  // password is wrong
});
