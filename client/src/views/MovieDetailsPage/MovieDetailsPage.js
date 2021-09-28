import React, { useEffect, useState } from "react";
import "./MovieDetailsPage.scss";
import Movie from "../../components/Movie/Movie";
import StarRatings from "react-star-ratings";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies } from "../../actions/favoriteMovieActions";
import { SIGN_OUT } from "../../constants/authConstants";
import CircularProgress from "@mui/material/CircularProgress";

function MovieDetailsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  let url_title = location.pathname.split("/").slice(2);

  const { isAuth } = useSelector((state) => state.isAuth);

  const [movie, setMovie] = useState(true);

  // States
  const [rating, setRating] = useState();
  const [note, setNote] = useState();

  // Loadings
  const [ratingLoading, setRatingLoading] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);

  console.log(noteLoading);

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
      setRatingLoading(true);
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
        .then((res) => {
          setRating(res.data.data);
          setRatingLoading(false);
        })
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
      setNoteLoading(true);
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
        .then((res) => {
          setNote(res.data.data);
          setNoteLoading(false);
        })
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

    setRatingLoading(true);

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
      .then((res) => {
        setRating(res.data.data);
        setRatingLoading(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          localStorage.removeItem("isAuth");
          dispatch({
            type: SIGN_OUT,
          });
        }
      });
  };

  const handleSubmitNote = async (e) => {
    e.preventDefault();
    setNoteLoading(true);
    if (!isAuth) {
      history.push("/auth");
    }

    if (note?.lenght !== 0) {
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
        .then((res) => {
          setNote(res.data.data);
          setNoteLoading(false);
        })
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

  const handleRemoveNote = async (e) => {
    e.preventDefault();
    setNoteLoading(true);
    if (!isAuth) {
      history.push("/auth");
    }
    await axios
      .get(`/api/note/${note?._id}/remove`, {
        headers: {
          Authorization: `Bearer: ${isAuth?.access_token}`,
        },
      })
      .then((res) => {
        setNote(undefined);
        setNoteLoading(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          localStorage.removeItem("isAuth");
          dispatch({
            type: SIGN_OUT,
          });
        }
      });
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
            rating={rating?.rating}
            starRatedColor="yellow"
            starHoverColor="yellow"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
          />
          {ratingLoading ? (
            <CircularProgress size={15} color={"error"} />
          ) : (
            <></>
          )}
        </div>
        <form className="form-group w-50 ">
          {noteLoading ? (
            <CircularProgress id="note-circular" size={15} color={"error"} />
          ) : (
            <></>
          )}

          <textarea
            style={{ resize: "none" }}
            className="form-control"
            rows="5"
            placeholder="Your private notes and comments about the movie..."
            onChange={(e) => setNote(e.target.value)}
            value={
              note !== undefined ? note?.note : note ? note?.note : "" ? "" : ""
            }
          />
          <div className="text-buttons d-flex justify-content-end">
            {note?.note !== undefined ? (
              <button
                onClick={(e) => handleRemoveNote(e)}
                className="btn btn-outline-danger mt-2"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                REMOVE
              </button>
            ) : (
              <></>
            )}
            <button
              onClick={(e) => handleSubmitNote(e)}
              className="btn btn-outline-success mt-2"
              type="submit"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
