import React from "react";

const SearchBar = ({ searchValue, onButtonSubmit, setSearchValue }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}
    >
      <form onSubmit={onButtonSubmit}>
        <input
          placeholder="Search by Name..."
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button data-cy="search" onClick={onButtonSubmit}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
