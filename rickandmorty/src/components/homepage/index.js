import React from "react";
import SearchBar from "../searchbar";
import Card from "../card";

const HomePage = ({ searchBarProps, loading, characters }) => {
  return (
    <div>
      <SearchBar {...searchBarProps} />
      {!characters ? (
        <div>Not Found</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {loading ? (
            <h3 data-cy="loading">Loading...</h3>
          ) : (
            <>
              {characters &&
                characters.map((item) => (
                  <Card key={item.id} character={item} />
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
