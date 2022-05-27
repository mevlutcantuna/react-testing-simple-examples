import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DetailPage from "./";

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
