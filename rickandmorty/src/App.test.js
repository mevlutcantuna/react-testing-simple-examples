import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

import { rest } from "msw";
import { setupServer } from "msw/node";

const charactersUrl = "https://rickandmortyapi.com/api/character?page=1";

const characterResponse = rest.get(charactersUrl, (req, res, ctx) => {
  return res(
    ctx.json({
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        },
      ],
    })
  );
});

const handlers = [characterResponse];
const server = new setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

test("initial characters shows correctly.", async () => {
  render(<App />);
  const character = await screen.findByText(/Rick Sanchez/i);
  expect(character).toBeInTheDocument();
});

test("searching characters works correctly", async () => {
  render(<App />);
  server.use(
    rest.get(
      "https://rickandmortyapi.com/api/character?name=rails",
      (req, res, ctx) => {
        return res(
          ctx.json({
            results: [
              {
                id: 1,
                name: "Alan Rails",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
              },
            ],
          })
        );
      }
    )
  );

  const inputEl = screen.getByPlaceholderText(/search by name/i);
  const btn = screen.getByRole("button", { name: /search/i });
  userEvent.type(inputEl, "rails");
  userEvent.click(btn);
  expect(await screen.findByText(/rails/i)).toBeInTheDocument();
});

test("if data is empty, renders data not found", async () => {
  render(<App />);
  server.use(
    rest.get(
      "https://rickandmortyapi.com/api/character?name=rails",
      (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({error: "There is nothing here"})
          );
      }
    )
  );
  const inputEl = screen.getByPlaceholderText(/search by name/i);
  const btn = screen.getByRole("button", { name: /search/i });

  userEvent.type(inputEl, "tttttttt");
  userEvent.click(btn);

  expect(await screen.findByText(/not found/i)).toBeVisible();
});
