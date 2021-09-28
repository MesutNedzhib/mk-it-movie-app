import React from "react";
import "./Error404.scss";
import { useHistory } from "react-router-dom";

function Error404() {
  const history = useHistory();
  return (
    <div className="error404">
      <h1>PAGE NOТ FOUND 404</h1>
      <span onClick={() => history.push("/")}>BACK TO HOME</span>
    </div>
  );
}

export default Error404;
