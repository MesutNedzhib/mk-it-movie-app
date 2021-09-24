import React from "react";
import "./Movie.scss";
import { Link, useHistory } from "react-router-dom";

function Movie() {
  const history = useHistory();
  return (
    <div className="movie">
      <div className="movie-image">
        <img
          onClick={() => history.push("/movies/movie-title")}
          src="https://static.posters.cz/image/750/posters/avengers-infinity-war-one-sheet-i58560.jpg"
          alt=""
        />
      </div>
      <div className="movie-info">
        <h2 onClick={() => history.push("/movies/movie-title")}>Title</h2>
        <small>Drama, Thriller, Comedy | 90</small>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non magnam
          maiores culpa. Quas, ad error. Obcaecati mollitia magni porro suscipit
          debitis laudantium amet fugit. Sapiente accusamus iusto aperiam
          suscipit ipsum. Temporibus, in modi pariatur mollitia rem
          necessitatibus reiciendis ut eum, suscipit corrupti quibusdam amet
          alias enim debitis laboriosam magni nisi.
        </p>
        <Link to="">Visit official site</Link>
        <button className="btn btn-outline-success">Add To Favorites</button>
      </div>
    </div>
  );
}

export default Movie;
