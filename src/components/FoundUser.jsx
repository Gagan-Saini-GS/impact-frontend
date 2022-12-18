import React from "react";
import { useState } from "react";

function Founduser(props) {
  const [currStatus, setCurrStatus] = useState("Connect");
  function connectionRequest() {
    const receiver = {
      userProfileImage: props.userProfileImage,
      userName: props.userName,
      userEmail: props.userEmail,
      userIntro: props.userIntro,
    };

    console.log(receiver);

    fetch("/makeConnection", {
      method: "POST",
      body: JSON.stringify({
        receiver: receiver,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrStatus(data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="found-user-container">
      <div className="background-img-box"></div>
      <img src={props.userProfileImage} alt="IMG" />
      <h2>{props.userName}</h2>
      <p>{props.userEmail}</p>
      <p>{props.userIntro}</p>
      <button className="connect-btn" onClick={connectionRequest}>
        {currStatus}
      </button>
    </div>
  );
}

export default Founduser;
