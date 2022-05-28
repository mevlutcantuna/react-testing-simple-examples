import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailPage = () => {
  const [character, setCharacter] = useState(null);
  const { id } = useParams();

  const getDetails = async () => {
    await fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((res) => setCharacter(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <Link to="/">Back</Link>
      <h3>{character?.name}</h3>
      <img src={character?.image} alt="detail-img" />
    </div>
  );
};

export default DetailPage;
