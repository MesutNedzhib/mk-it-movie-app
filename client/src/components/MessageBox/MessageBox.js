import React from "react";
import "./MessageBox.scss";

function MessageBox({ message, variant }) {
  return (
    <div className="messageBox">
      <div className={`messageBox-container variant-${variant}`}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default MessageBox;
