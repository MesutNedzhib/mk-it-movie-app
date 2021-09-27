import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteMovies } from "../../actions/favoriteMovieActions";
import { getMovies, searchByMovieTitle } from "../../actions/tvmazeApiActions";
import LoadingBar from "../../components/LoadingBar/LoadingBar";
import Movie from "../../components/Movie/Movie";
import "./SearchPage.scss";

function SearchPage() {
  const searchInput = useRef();
  const { loading, movies } = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.isAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(getFavoriteMovies(isAuth?.access_token));
    }
    dispatch(getMovies());
  }, [dispatch, isAuth]);

  const handleSearchTitle = (e) => {
    e.preventDefault();
    if (searchInput.current.value) {
      dispatch(searchByMovieTitle(searchInput.current.value));
    }
  };

  return (
    <div className="searchPage">
      {loading ? <LoadingBar /> : <></>}
      <div className="searchPage-container">
        <div className="search-section">
          <h3>Search</h3>
          <form className="form-inline d-flex justify-content-center">
            <input
              ref={searchInput}
              type="text"
              className="form-control w-25"
              placeholder="Search by movie title"
              aria-label="Search"
            />
            <button
              onClick={(e) => handleSearchTitle(e)}
              className="btn btn-success"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        <div className="movie-section">
          {movies?.length !== 0
            ? movies?.map((movie, index) => <Movie key={index} movie={movie} />)
            : ""}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
