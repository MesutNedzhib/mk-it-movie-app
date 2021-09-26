import React, { useEffect, useState } from "react";
import "./MovieDetailsPage.scss";
import Movie from "../../components/Movie/Movie";
import StarRatings from "react-star-ratings";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies } from "../../actions/favoriteMovieActions";
import { SIGN_OUT } from "../../constants/authConstants";
import LoadingBar from "../../components/LoadingBar/LoadingBar";

function MovieDetailsPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuth } = useSelector((state) => state.isAuth);
  const [rating, setRating] = useState();
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(true);

  const [movie, setMovie] = useState(true);

  let url_title = location.pathname.split("/").slice(2);

  useEffect(() => {
    async function getSingleMovie() {
      await axios
        .get(`https://api.tvmaze.com/singlesearch/shows?q=${url_title}`)
        .then((res) => setMovie(res.data))
        .catch((err) => console.log(err.response));
    }
    if (isAuth) {
      dispatch(getFavoriteMovies(isAuth?.access_token));
    }

    getSingleMovie();
  }, []);

  useEffect(() => {
    async function getRating() {
      await axios
        .post(
          "/api/rating/getRating",
          { movie_title: url_title },
          {
            headers: {
              Authorization: `Bearer: ${isAuth?.access_token}`,
            },
          }
        )
        .then((res) => setRating(res.data.data.rating))
        .catch((err) => {
          if (err?.response?.status === 401) {
            localStorage.removeItem("isAuth");
            dispatch({
              type: SIGN_OUT,
            });
          }
        });
    }

    if (isAuth) {
      getRating();
    }
  }, []);

  useEffect(() => {
    async function getNote() {
      await axios
        .post(
          "/api/note/getNote",
          { movie_title: url_title },
          {
            headers: {
              Authorization: `Bearer: ${isAuth?.access_token}`,
            },
          }
        )
        .then((res) => setNote(res.data.data.note))
        .catch((err) => {
          if (err?.response?.status === 401) {
            localStorage.removeItem("isAuth");
            dispatch({
              type: SIGN_OUT,
            });
          }
        });
    }

    if (isAuth) {
      getNote();
    }
  }, []);

  const changeRating = async (newRating) => {
    if (!isAuth) {
      history.push("/auth");
    }
    const ratingData = {
      movie_title: movie?.name,
      rating: newRating,
    };
    await axios
      .post("/api/rating/setRating", ratingData, {
        headers: {
          Authorization: `Bearer: ${isAuth?.access_token}`,
        },
      })
      .then((res) => setRating(res.data.data.rating))
      .catch((err) => {
        if (err?.response?.status === 401) {
          localStorage.removeItem("isAuth");
          dispatch({
            type: SIGN_OUT,
          });
        }
      });
  };

  const handleNote = async (e) => {
    e.preventDefault();

    if (!isAuth) {
      history.push("/auth");
    }

    if (note.lenght !== 0) {
      const noteData = {
        movie_title: movie?.name,
        note: note,
      };
      await axios
        .post("/api/note/", noteData, {
          headers: {
            Authorization: `Bearer: ${isAuth?.access_token}`,
          },
        })
        .then((res) => setNote(res.data.data.note))
        .catch((err) => {
          if (err?.response?.status === 401) {
            localStorage.removeItem("isAuth");
            dispatch({
              type: SIGN_OUT,
            });
          }
        });
    }
  };

  return (
    <div className="movieDetailsPage">
      <div className="movieDetailsPage-container">
        <div className="movie-details-section">
          <Movie movie={movie} />
        </div>
        <div className="your-review-section">
          <h2>Your Review</h2>
          <StarRatings
            rating={rating}
            starRatedColor="yellow"
            starHoverColor="yellow"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
          />
        </div>
        <form className="form-group w-50">
          <textarea
            style={{ resize: "none" }}
            className="form-control"
            rows="5"
            placeholder="Your private notes and comments about the movie..."
            onChange={(e) => setNote(e.target.value)}
            defaultValue={note}
          />
          <button
            onClick={(e) => handleNote(e)}
            className="btn btn-outline-success mt-2"
            type="submit"
            style={{ display: "block", marginLeft: "auto" }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
