import React from "react";
import "./CardImage.scss";
import { useHistory } from "react-router-dom";

function CardImage({ movie }) {
  const history = useHistory();
  return (
    <div className="cardImage">
      <div className="cardImage-container">
        <img
          onClick={() => history.push(`/movies/${movie.name}`)}
          src={
            movie?.image
              ? movie?.image?.medium
              : movie?.image?.original
              ? movie?.image?.original
              : ""
          }
          alt=""
        />
      </div>
    </div>
  );
}

export default CardImage;
