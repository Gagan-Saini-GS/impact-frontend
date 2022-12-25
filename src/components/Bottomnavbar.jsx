import React from "react";
import "./Navbar.css";

function Bottomnavbar(props) {
  return (
    <div className="bottom-navbar">
      <button
        className="make-post-button"
        onClick={() => {
          props.showMakePost();
        }}
      >
        +
      </button>
    </div>
  );
}

export default Bottomnavbar;
