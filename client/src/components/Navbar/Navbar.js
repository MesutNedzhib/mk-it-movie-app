import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar justify-content-between ">
        <Link to="" className="navbar-brand">
          My Movie Collection
        </Link>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search by movie title"
            aria-label="Search"
          />
          <button className="btn  btn-success" type="submit">
            Search
          </button>
        </form>
      </nav>
    </div>
  );
}

export default Navbar;
