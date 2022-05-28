import { screen, render } from "@testing-library/react";
import Card from "./index";

import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockCharacter = {
  id: 1,
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

const MockCard = () => {
  return (
    <BrowserRouter>
      <Card character={mockCharacter} />
    </BrowserRouter>
  );
};

test("card renders correctly", () => {
  render(<MockCard />);
  expect(screen.getByTestId("card-item")).toBeInTheDocument();
});
