import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.scss";
import { Link, useHistory } from "react-router-dom";
import { searchByMovieTitle } from "../../actions/tvmazeApiActions";
import { signOut } from "../../actions/authActions";

function Navbar() {
  const searchInput = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuth } = useSelector((state) => state.isAuth);

  const handleSearchTitle = (e) => {
    e.preventDefault();
    if (searchInput.current.value) {
      dispatch(searchByMovieTitle(searchInput.current.value));
      history.push("/search");
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <div className="navbar-container">
      <nav className="navbar justify-content-between ">
        <Link to="/" className="navbar-brand" style={{ color: "white" }}>
          My Movie Collection
        </Link>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search by movie title"
            aria-label="Search"
            ref={searchInput}
          />
          <button
            onClick={(e) => handleSearchTitle(e)}
            className="btn btn-success"
            type="submit"
          >
            Search
          </button>
        </form>
        <>
          {isAuth ? (
            <div>
              <button
                className="btn btn-danger bg-transparent text-danger"
                style={{ marginRight: "10px" }}
              >
                {isAuth?.data?.name}
              </button>
              <button
                onClick={() => handleSignOut()}
                className="btn btn-primary bg-transparent text-primary"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => history.push("/auth")}
              className="btn btn-primary bg-transparent text-primary"
            >
              Sign In
            </button>
          )}
        </>
      </nav>
    </div>
  );
}

export default Navbar;
