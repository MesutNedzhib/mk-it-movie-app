import React from "react";
import "./MovieDetailsPage.scss";
import Movie from "../../components/Movie/Movie";

function MovieDetailsPage() {
  return (
    <div className="movieDetailsPage">
      <div className="movie-details-section">
        <Movie />
      </div>
          <div className="your-review-section">
              
      </div>
    </div>
  );
}

export default MovieDetailsPage;
