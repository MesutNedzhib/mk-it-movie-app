import React from "react";
import "./Movie.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Movie({ movie }) {
  const history = useHistory();

  const { isAuth } = useSelector((state) => state.isAuth);

  const handleAddToFavorites = () => {
    if (!isAuth) {
      history.push("/auth");
    }
  };

  return (
    <div className="movie">
      <div className="movie-image">
        <img
          onClick={() => history.push("/movies/movie-title")}
          src={
            movie?.image?.medium ? movie?.image?.medium : movie?.image?.original
          }
          alt=""
        />
      </div>
      <div className="movie-info">
        <h2 onClick={() => history.push("/movies/movie-title")}>
          {movie?.name}
        </h2>
        <small>
          {movie?.genres.join(", ")} | {movie?.weight}m
        </small>
        <p>{movie?.summary?.replace(/<[^>]+>/g, "")}</p>
        <a href={movie?.url ? movie?.url : ""} target="_blank">
          Visit official site
        </a>
        <button
          onClick={() => handleAddToFavorites()}
          className="btn btn-outline-success"
        >
          Add To Favorites
        </button>
      </div>
    </div>
  );
}

export default Movie;
