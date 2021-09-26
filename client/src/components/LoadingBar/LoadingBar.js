import React from "react";
import "./LoadingBar.scss";
import { LinearProgress } from "@mui/material";

function LoadingBar() {
  return (
    <div className="loadingBar">
      <LinearProgress color="error" />
    </div>
  );
}

export default LoadingBar;
