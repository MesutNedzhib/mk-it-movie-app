import React, { useEffect, useState } from "react";
import "./Movie.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SIGN_OUT } from "../../constants/authConstants";

function Movie({ movie }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.isAuth);
  const { favoriteMovies } = useSelector((state) => state.favoriteMovies);

  const [isExist, setIsExits] = useState(false);

  // Check movies from favorites is exist in TVMaze API
  useEffect(() => {
    if (favoriteMovies?.length > 0) {
      let index = favoriteMovies?.findIndex(
        (x) => parseInt(x?.movieId) === parseInt(movie?.id)
      );
      if (index !== -1) {
        setIsExits(true);
      }
    }
  }, [favoriteMovies?.length, favoriteMovies, movie?.id]);

  const handleAddMovieToFavorites = async () => {
    if (!isAuth) {
      history.push("/auth");
    }

    const movieData = {
      movieId: movie?.id,
      image: movie?.image,
      name: movie?.name,
      genres: movie?.genres,
      weight: movie?.weight,
      summary: movie?.summary,
      url: movie?.url,
    };

    await axios
      .post("/api/favorites/", movieData, {
        headers: {
          Authorization: `Bearer: ${isAuth?.access_token}`,
        },
      })
      .then((res) => {
        setIsExits(!isExist);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("isAuth");
          dispatch({
            type: SIGN_OUT,
          });
        }
      });
  };

  const handleRemoveMovieFromFavorites = async () => {
    if (!isAuth) {
      history.push("/auth");
    }

    await axios
      .get(`/api/favorites/${movie?.id}/remove`, {
        headers: {
          Authorization: `Bearer: ${isAuth?.access_token}`,
        },
      })
      .then((res) => {
        setIsExits(!isExist);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("isAuth");
          dispatch({
            type: SIGN_OUT,
          });
        }
      });
  };

  const truncate = (str, len) => {
    return str?.slice(0, len) + "...";
  };

  return (
    <div className="movie">
      <div className="movie-image">
        <img
          onClick={() => history.push(`/movies/${movie?.name}`)}
          src={
            movie?.image?.medium ? movie?.image?.medium : movie?.image?.original
          }
          alt=""
        />
      </div>
      <div className="movie-info">
        <h2 onClick={() => history.push(`/movies/${movie?.name}`)}>
          {movie?.name}
        </h2>
        <small>
          {movie?.genres?.join(", ")} | {movie?.weight}m
        </small>
        <p>{truncate(movie?.summary?.replace(/<[^>]+>/g, ""), 300)}</p>
        <a href={movie?.url ? movie?.url : ""} target="_blank" rel="noreferrer">
          Visit official site
        </a>
        {isExist ? (
          <button
            onClick={() => handleRemoveMovieFromFavorites()}
            className="btn btn-outline-danger"
          >
            Remove From Favorites
          </button>
        ) : (
          <button
            onClick={() => handleAddMovieToFavorites()}
            className="btn btn-outline-success"
          >
            Add To Favorites
          </button>
        )}
      </div>
    </div>
  );
}

export default Movie;
