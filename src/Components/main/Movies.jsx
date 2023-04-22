import React, { useEffect, useState } from "react";
import "./movies.css";
import axios from "axios";
import Pagination from "./Pagination";
function Movies() {

  const api_key = "f8aa3ed793704c1de3ef2341a7fe971f";

  const [hover, setHover] = useState("");
  const [movies, setMovies] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [pagination, setPagination] = useState([1]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      console.log("first");
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${currPage}`
      );
      
      setMovies(() => data.results);
      handleFavouriteState();
    }
    fetchMovies();
  }, [currPage]);

  const addToFavourites = (movieObj) => {
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    if (favourites.includes(movieObj.id)) {
      oldData = oldData.filter((m) => m.id !== movieObj.id);
    } else {
      oldData.push(movieObj);
    }
    localStorage.setItem("movies", JSON.stringify(oldData));
    handleFavouriteState();
  };

  const handleFavouriteState = () => {
    const oldData = JSON.parse(localStorage.getItem("movies") || "[]");
    const arr = oldData.map((m) => m.id);
    setFavourites([...arr]);
  };

  return (
    <div className="movies-container">
      <h2>Trending</h2>
      <div className="movies">
        {movies &&
          movies.map((movieObj) => (
            <div
              className="movie"
              onMouseEnter={() => setHover(movieObj.id)}
              onMouseLeave={() => setHover("")}
            >
              <div className="movieImgCont">
                {movieObj.backdrop_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    alt={movieObj.original_title}
                  />
                ) : (
                  <img
                    src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                    alt={movieObj.original_title}
                  />
                )}
              </div>
              <div className="movie-details">
                {movieObj.backdrop_path ? (
                  <h3>{movieObj.original_title}</h3>
                ) : (
                  <h3 id="forNoImage">{movieObj.original_title}</h3>
                )}
                {hover === movieObj.id && (
                  <div>
                    <button onClick={() => addToFavourites(movieObj)}>
                      {favourites.includes(movieObj.id)
                        ? "remove from favourite"
                        : "Add to favourite"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      <Pagination
        pagination={pagination}
        setPagination={setPagination}
        currPage={currPage}
        setCurrPage={setCurrPage}
      />
    </div>
  );
}

export default Movies;
