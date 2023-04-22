import React from "react";
import { movies } from "../../Components/../getMovies";
import "./banner.css";
function Banner() {
  const movie = movies.results[0];
  return (
    <div className="banner">
      <div className="bannerImgCont">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.original_title}
        />
      </div>
      <div className="banner-details">
        <h3>{movie.original_title}</h3>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

export default Banner;
