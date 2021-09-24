import React from "react";
import Movie from "../../components/Movie/Movie";
import "./SearchPage.scss";

function SearchPage() {
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
          <Movie />
          <Movie />
          <Movie />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
