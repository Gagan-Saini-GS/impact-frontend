import React from "react";
import "./ReportBug.css";

function ReportBug() {
  function reportBug() {
    console.log("submiting bug");
    const issue = document.querySelector(".issue-box").value;
    fetch("https://impact-backend-0p9n.onrender.com/reportBug", {
      method: "POST",
      body: JSON.stringify({
        issue: issue,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.status);
        document.querySelector(".issue-box").value = "";
      });
  }

  return (
    <div className="report-bug-box">
      <h1>
        Report Bug <i className="fas fa-bug"></i>
      </h1>
      <p>Write down issus that you face!</p>
      <textarea
        rows="10"
        cols="50"
        className="issue-box"
        placeholder="Your issue..."
      ></textarea>
      <button className="report-bug-save-btn" onClick={reportBug}>
        Submit
      </button>
    </div>
  );
}

export default ReportBug;
