import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getFavoriteMovies } from "../../actions/favoriteMovieActions";
import CardImage from "../../components/CardImage/CardImage";
import LoadingBar from "../../components/LoadingBar/LoadingBar";
import SearchIcon from "@mui/icons-material/Search";
import "./HomePage.scss";
import MessageBox from "../../components/MessageBox/MessageBox";

function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.isAuth);

  const { loading, favoriteMovies } = useSelector(
    (state) => state.favoriteMovies
  );

  useEffect(() => {
    if (isAuth) {
      dispatch(getFavoriteMovies(isAuth?.access_token));
    }
  }, [dispatch]);

  return (
    <div className="homePage">
      {loading ? <LoadingBar /> : <></>}
      <div className="homePage-container">
        <div className="hero-section">
          <div className="hero-info">
            <h1>My Movie Collection</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              eius nisi, culpa beatae obcaecati ipsa sunt placeat nulla ea
              veniam dolor aliquid odio at eveniet numquam enim dolorum natus
              adipisci.
            </p>
            <button
              onClick={() => history.push("/search")}
              className="btn btn-danger "
            >
              Search <SearchIcon />
            </button>
          </div>
        </div>
        <div className="favorites-section">
          <h2>Your Favorites</h2>
          <div className="favorites-list">
            {favoriteMovies?.length !== 0 ? (
              favoriteMovies?.map((movie, index) => (
                <CardImage key={index} movie={movie} />
              ))
            ) : (
              <MessageBox message={"Empty"} variant={"info"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
