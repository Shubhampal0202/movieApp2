import React, { useEffect, useState } from "react";
import "./movies-table.css";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
function MoviesTable({ genreids, currGenre, setCurrGen, updateGenreArr }) {
  const [favMovies, setFavMovies] = useState([]);
  const [pageLimit, setPageLimit] = useState(5);

  const [currFavpage, setCurrFavPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let favourites = JSON.parse(localStorage.getItem("movies") || "[]");
    setFavMovies(() => favourites);
    setCurrFavPage(1);
  }, [currGenre]);


  let filteredArr = [];
  const pagesArr = [];
  if (favMovies.length > 0) {
    filteredArr = favMovies;

    if (searchText !== "") {
      filteredArr = favMovies.filter((movieObj) => {
        let title = movieObj.original_title.toLowerCase();
        return title.includes(searchText.toLowerCase());
      });
    }

    if (currGenre !== "All genre") {
      filteredArr = filteredArr.filter((movie) => {
        return genreids[movie.genre_ids[0]] === currGenre;
      });  
    }

    const numOfPage = Math.ceil(filteredArr.length / pageLimit);

    for (let i = 1; i <= numOfPage; i++) {
      pagesArr.push(i);
    }
    let fi = (currFavpage - 1) * pageLimit;
    let li = fi + pageLimit;
    filteredArr = filteredArr.slice(fi, li);
  }
  const handleDelete = (id) => {
    filteredArr = favMovies.filter((movie) => {
      return movie.id !== id;
    });
    localStorage.setItem("movies", JSON.stringify(filteredArr));
    setFavMovies(() => filteredArr);
    updateGenreArr();
  };

  const handleClick = (value) => {
    setCurrFavPage(value);
  };

  const sortPopularityDecs = () => {
    let temp = favMovies;
    temp.sort(function (objA, objB) {
      return objB.popularity-objA.popularity
    })
    setFavMovies([...temp])
  }

  const sortPopularityAcs = () => {
     let temp = favMovies;
     temp.sort(function (objA, objB) {
       return objA.popularity - objB.popularity;
     });
     setFavMovies([...temp]);
  }

  const sortRatingDecs = () => {
      let temp = favMovies;
      temp.sort(function (objA, objB) {
        return objB.vote_average - objA.vote_average;
      });
      setFavMovies([...temp]);
  }

  const sortRatingAcs = () => {
      let temp = favMovies;
      temp.sort(function (objA, objB) {
        return objA.vote_average - objB.vote_average;
      });
      setFavMovies([...temp]);
  }

  return (
    <div className="movies-table">
      <input
        type="text"
        placeholder="Search"
        className="text-input"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <input
        type="number"
        className="number-input"
        value={pageLimit}
        onChange={(e) => setPageLimit(Number(e.target.value))}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>
              <FaSortUp onClick={sortPopularityDecs} className="icons" />
              Popularity
              <FaSortDown onClick={sortPopularityAcs} className="icons" />
            </th>
            <th>
              <FaSortUp onClick={sortRatingDecs} className="icons" />
              Rating
              <FaSortDown onClick={sortRatingAcs} className="icons" />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredArr.length > 0 &&
            filteredArr.map((movieObj) => (
              <tr>
                <td>
                  {movieObj.backdrop_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                      alt=""
                    />
                  ) : (
                    <img
                      src="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                      alt=""
                    />
                  )}
                  <span>{[movieObj.original_title]}</span>
                </td>
                <td>{genreids[movieObj.genre_ids[0]]}</td>
                <td>{movieObj.popularity}</td>
                <td>{movieObj.vote_average}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDelete(movieObj.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="fav-pagination">
        {pagesArr.map((value) =>
          currFavpage === value ? (
            <button id="selected">{value}</button>
          ) : (
            <button onClick={() => handleClick(value)}>{value}</button>
          )
        )}
      </div>
    </div>
  );
}

export default MoviesTable;
