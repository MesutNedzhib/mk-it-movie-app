import React, { useEffect, useState } from "react";
import "./MovieDetailsPage.scss";
import Movie from "../../components/Movie/Movie";
import StarRatings from "react-star-ratings";
import { useLocation } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies } from "../../actions/favoriteMovieActions";

function MovieDetailsPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.isAuth);
  const [rating, setRating] = useState();
  const [note, setNote] = useState();

  const [movie, setMovie] = useState();

  let url_title = location.pathname.split("/").slice(2);

  useEffect(() => {
    async function getSingleMovie() {
      await axios
        .get(`https://api.tvmaze.com/singlesearch/shows?q=${url_title}`)
        .then((res) => setMovie(res.data))
        .catch((err) => console.log(err.response));
    }
    dispatch(getFavoriteMovies(isAuth?.access_token));
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
        .catch((err) => console.log(err.response));
    }
    getRating();
  }, []);

  const changeRating = async (newRating) => {
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
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="movieDetailsPage">
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
      <div className="form-group">
        <textarea
          style={{ resize: "none" }}
          className="form-control w-50"
          rows="5"
          placeholder="Your private notes and comments about the movie..."
        ></textarea>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
