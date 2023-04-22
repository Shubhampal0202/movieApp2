import React, { useEffect } from "react";
import "./genre.css";
function Genre({ genreids, currGenre, setCurrGen, genre,setGenre }) {
  useEffect(() => {
    let favourites = JSON.parse(localStorage.getItem("movies") || "[]");
    let arr = [];
    for (let i = 0; i < favourites.length; i++) {
      if (!arr.includes(genreids[favourites[i].genre_ids[0]])) {
        arr.push(genreids[favourites[i].genre_ids[0]]);
      }
    }
    arr.unshift("All genre");
    setGenre([...arr]);
  }, []);

  const handleGenre = (genre) => {
    setCurrGen(() => genre);
  };

  return (
    <div className="genre">
      {genre &&
        genre.map((genre) =>
          currGenre == genre ? (
            <div id="selected-genre">{genre}</div>
          ) : (
            <div onClick={() => handleGenre(genre)}>{genre}</div>
          )
        )}
    </div>
  );
}

export default Genre;
