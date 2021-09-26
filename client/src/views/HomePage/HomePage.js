import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getFavoriteMovies } from "../../actions/favoriteMovieActions";
import CardImage from "../../components/CardImage/CardImage";
import "./HomePage.scss";

function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.isAuth);

  const { favoriteMovies } = useSelector((state) => state.favoriteMovies);

  useEffect(() => {
    if (isAuth) {
      dispatch(getFavoriteMovies(isAuth?.access_token));
    }
  }, [dispatch]);

  return (
    <div className="homePage">
      <div className="homePage-container">
        <div className="hero-section">
          <div className="hero-info">
            <h1>Heading</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              eius nisi, culpa beatae obcaecati ipsa sunt placeat nulla ea
              veniam dolor aliquid odio at eveniet numquam enim dolorum natus
              adipisci.
            </p>
            <button
              onClick={() => history.push("/search")}
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
        </div>
        <div className="favorites-section">
          <h1>{isAuth ? isAuth?.data?.name : "Your"} Favorites</h1>
          <div className="favorites-list">
            {favoriteMovies?.map((movie, index) => (
              <CardImage key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
