import React from "react";
import "./Card.css";

import { useNavigate } from "react-router-dom";

const Card = ({ character }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    return navigate(`/character/${character.id}`);
  };

  return (
    <div
      data-cy="card-item"
      data-testid="card-item"
      className="card"
      onClick={goToDetail}
    >
      <img
        style={{ width: "200px" }}
        src={character.image}
        alt="character-img"
      />
      <span>{character.name}</span>
    </div>
  );
};

export default Card;
