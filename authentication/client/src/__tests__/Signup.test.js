/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../components/SignupPage";

import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

const MockSignup = () => {
  const history = createBrowserHistory();

  return (
    <BrowserRouter history={history}>
      <Signup />
    </BrowserRouter>
  );
};

beforeEach(() => {
  render(<MockSignup />);
});

describe("Signup Page Tests", () => {
  it("Signup title renders correctly", () => {
    expect(screen.getByRole("heading", /signup/i)).toBeInTheDocument();
  });

  it("inputs are empty,returns error", () => {
    userEvent.click(screen.getByRole("button", /signup/i));
    expect(screen.getByText(/please provide all inputs/i)).toBeInTheDocument();
  });

  it("the account exists", async () => {
    userEvent.type(screen.getByPlaceholderText(/fullname/i), "mevlüt can tuna");
    userEvent.type(screen.getByPlaceholderText(/email/i), "mttuna90@gmail.com");
    userEvent.type(screen.getByPlaceholderText(/password/i), "123123");
    userEvent.click(screen.getByRole("button", /signup/i));

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/the account already exists.../i)
    ).toBeInTheDocument();
  });

  it("signup correctly", async () => {
    // not completed
    userEvent.type(screen.getByPlaceholderText(/fullname/i), "new user");
    userEvent.type(screen.getByPlaceholderText(/email/i), "newuser@gmail.com");
    userEvent.type(screen.getByPlaceholderText(/password/i), "123123");
    userEvent.click(screen.getByRole("button", /signup/i));
  });

  it("go to login link works correctly", async () => {
    // not completed
    userEvent.click(screen.getByText(/Go To Login/i));
    // expect(await screen.findByText(/cennet/i)).toBeInTheDocument();
  });
});
