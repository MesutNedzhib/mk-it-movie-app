import React from "react";
import { useSelector } from "react-redux";
import Movie from "../../components/Movie/Movie";
import "./SearchPage.scss";

function SearchPage() {
  const { loading, error, movies } = useSelector((state) => state.movies);

  return (
    <div className="searchPage">
      <div className="searchPage-container">
        <div className="search-section">
          <h3>Search</h3>
          <form className="d-flex justify-content-center">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search by movie title"
            />
            <button className="btn btn-outline-success">Search</button>
          </form>
        </div>

        <div className="movie-section">
          {!movies?.length !== 0
            ? movies?.map((movie, index) => (
                <Movie key={index} movie={movie.show} />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
