import React, { useReducer } from "react";

function User(props) {
  return (
    <div className="user-container">
      <div className="user-img">
        <img src={props.src} alt="user image" />
      </div>
      <div className="user-info">
        <p className="username">{props.username}</p>
        <p className="useremail">{props.useremail}</p>
        <p className="userintro">{props.userintro}</p>
      </div>
    </div>
  );
}

export default User;
