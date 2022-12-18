import React, { useState } from "react";

function ReportBug() {
  return (
    <div className="report-bug-box">
      <h1>
        Report Bug <i className="fas fa-bug"></i>
      </h1>
      <p>Write down issus that you face!</p>
      <textarea rows="10" cols="50" placeholder="Your issue..."></textarea>
      <button className="report-bug-save-btn">Submit</button>
    </div>
  );
}

export default ReportBug;
