import { render, screen } from "@testing-library/react";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom";
import DetailPage from "./";

const characterUrl = "https://rickandmortyapi.com/api/character/6";

const characterResponse = rest.get(characterUrl, (req, res, ctx) => {
  return res(
    ctx.json({
      id: 6,
      name: "Abadango Cluster Princess",
      image: "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
    })
  );
});

const server = new setupServer(characterResponse);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 6,
  }),
}));

const MockDetailPage = () => {
  return (
    <BrowserRouter>
      <DetailPage />
    </BrowserRouter>
  );
};

test("detail page renders correctly", async () => {
  render(<MockDetailPage />);

  expect(await screen.findByText(/abadango/i)).toBeInTheDocument();
});
