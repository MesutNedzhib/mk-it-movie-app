import React from "react";
import { useHistory } from "react-router";
import CardImage from "../../components/CardImage/CardImage";
import "./HomePage.scss";

function HomePage() {
  const history = useHistory();

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
          <h1>Your Favorites</h1>
          <div className="favorites-list">
            <CardImage />
            <CardImage />
            <CardImage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
