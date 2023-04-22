import React, { useState } from "react";
import Genre from "./genre/Genre";
import MoviesTable from "./movies-table/MoviesTable";
import "./favourite.css";
import { movies } from "../../../src/getMovies";
function Favourite() {
  const [currGenre, setCurrGen] = useState("All genre");
  const [genre, setGenre] = useState([]);
  let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const updateGenreArr = () => {
    let favourites = JSON.parse(localStorage.getItem("movies") || "[]");
    let arr = [];
    for (let i = 0; i < favourites.length; i++) {
      if (!arr.includes(genreids[favourites[i].genre_ids[0]])) {
        arr.push(genreids[favourites[i].genre_ids[0]]);
      }
    }
    arr.unshift("All genre");
    setGenre([...arr]);
  };

  return (
    <div className="favourites">
      <Genre
        genreids={genreids}
        currGenre={currGenre}
        setCurrGen={setCurrGen}
        genre={genre}
        setGenre={setGenre}
      />
      <MoviesTable
        genreids={genreids}
        currGenre={currGenre}
        setCurrGen={setCurrGen}
        updateGenreArr={updateGenreArr}
      />
    </div>
  );
}

export default Favourite;
