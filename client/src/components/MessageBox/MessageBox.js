import React from "react";
import "./MessageBox.scss";

function MessageBox({ message, variant }) {
  return (
    <div className="messageBox">
      <div className={`messageBox-container variant-${variant}`}>
        <h5>{message}</h5>
      </div>
    </div>
  );
}

export default MessageBox;
