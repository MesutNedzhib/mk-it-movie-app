import React, { useState } from "react";
import "./MovieDetailsPage.scss";
import Movie from "../../components/Movie/Movie";
import StarRatings from "react-star-ratings";
import { useHistory } from "react-router";

function MovieDetailsPage() {
  const [rating, setRating] = useState();
  console.log(rating);
  const history = useHistory();
 

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="movieDetailsPage">
      <div className="movie-details-section">
        <Movie />
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
