import React, { useState } from "react";

function InviteCard(props) {
  const [status, setStatus] = useState("");
  const user = {
    userProfileImage: props.imgSrc,
    userName: props.userName,
    userEmail: props.userEmail,
    userIntro: props.userIntro,
  };

  function acceptConnectionRequest() {
    console.log(user);
    fetch("/acceptConnectionRequest", {
      method: "POST",
      body: JSON.stringify({
        user: user,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function ignoreConnectionRequest() {
    console.log(user.userName + " connection request ignored !!");
    fetch("/ignoreConnectionRequest", {
      method: "POST",
      body: JSON.stringify({
        user: user,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="invite-card">
      <img className="IC-userimage" src={props.imgSrc} alt="user-image" />
      <h1 className="IC-username">{props.userName}</h1>
      <p className="IC-userdetail">{props.userEmail}</p>
      <p className="IC-userdetail">{props.userIntro}</p>
      {props.type === "invitation" && (
        <div className="IC-controls">
          <button className="IC-btn" onClick={acceptConnectionRequest}>
            Accept
          </button>
          <button className="IC-btn" onClick={ignoreConnectionRequest}>
            Ignore
          </button>
        </div>
      )}
      {props.type === "request" && <div className="IC-controls">Pending</div>}
      {
        props.type === "connection" && null
        // <div className="IC-controls">
        //   <button className="IC-btn">Message</button>
        // </div>
      }
    </div>
  );
}

export default InviteCard;
