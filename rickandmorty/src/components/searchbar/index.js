import React from "react";

const SearchBar = ({ searchValue, onButtonSubmit, setSearchValue }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}
    >
      <form onSubmit={onButtonSubmit}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={onButtonSubmit}>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
