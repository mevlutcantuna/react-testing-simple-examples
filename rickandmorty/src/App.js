import { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./component/homepage";
import DetailPage from "./component/detailpage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const getAllCharacters = async () => {
    setLoading(true);
    fetch("https://rickandmortyapi.com/api/character?page=1")
      .then((res) => res.json())
      .then((res) => setCharacters(res.results))
      .catch((err) => console.error(err));
    setLoading(false);
  };

  const onButtonSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character?name=${searchValue}`)
      .then((res) => res.json())
      .then((res) => setCharacters(res.results))
      .catch((err) => console.error(err));
    setLoading(false);
  };

  useEffect(() => {
    getAllCharacters();
  }, []);

  const searchBarProps = {
    searchValue,
    setSearchValue,
    onButtonSubmit,
  };

  const homePageProps = {
    loading,
    characters,
  };

  return (
    <div className="app">
      <h1>Rick and Morty</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage {...homePageProps} searchBarProps={searchBarProps} />
            }
          />
          <Route path="/character/:id" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
