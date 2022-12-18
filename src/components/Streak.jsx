import React from "react";

function Streak() {
  return (
    <div className="streak-container">
      <div className="streak-box">
        <p className="streak-count">100</p>
        <p className="streak-info">Current Streak</p>
      </div>
      <div className="streak-box">
        <p className="streak-count">157</p>
        <p className="streak-info">Longest Streak</p>
      </div>
    </div>
  );
}

export default Streak;
