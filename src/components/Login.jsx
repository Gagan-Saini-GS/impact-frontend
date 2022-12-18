import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const [createAccount, setCreateAccount] = useState(false);
  let [accessToken, setAccessToken] = useState("");
  // console.log(accessToken);

  function signIn() {
    const userName = document.querySelector(".userName").value;
    const userEmail = document.querySelector(".signin-userEmail").value;
    const password = document.querySelector(".signin-password").value;

    // console.log(userName, userEmail, password);
    fetch("/signIn", {
      method: "POST",
      body: JSON.stringify({
        userName: userName,
        userEmail: userEmail,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        accessToken = data;
        setAccessToken(data);
        // console.log(accessToken);
        if (accessToken !== "") {
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          props.passAccessToken(accessToken);
        }
      });
  }

  function login() {
    const userEmail = document.querySelector(".login-userEmail").value;
    const password = document.querySelector(".login-password").value;

    // console.log(userName, userEmail, password);
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        userEmail: userEmail,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        accessToken = data;
        setAccessToken(data);
        if (accessToken !== "") {
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
          props.passAccessToken(accessToken);
        }
      });
  }

  return (
    <div className="login-container">
      {!createAccount ? (
        <div className="login-section">
          <form
            className="login-form"
            action="/login"
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="login-form-item">
              <p>Email</p>
              <input
                type="email"
                name="userEmail"
                placeholder="Email"
                className="login-userEmail"
              />
            </div>
            <div className="login-form-item">
              <p>Password</p>
              <input
                type="password"
                name="password"
                id=""
                placeholder="Password"
                className="login-password"
              />
            </div>
            <Link to="/" className="login-button-link">
              <div className="login-form-item">
                <button
                  type="submit"
                  onClick={login}
                  // onSubmit={(event) => {
                  //   event.preventDefault();
                  //   // fetch("/login").then((data)=>{})
                  //   // props.account();
                  // }}
                  className="login-btn"
                >
                  Login
                </button>
              </div>
            </Link>
            <div
              className="account-switch"
              onClick={() => {
                setCreateAccount(!createAccount);
              }}
            >
              Create New Account
            </div>
          </form>
          <div className="login-side-image">
            <img src="image/logo2.png" alt="" />
          </div>
        </div>
      ) : (
        <div className="signin-section">
          <form
            className="signin-form"
            action="/signIn"
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="login-form-item">
              <p>Username</p>
              <input
                type="text"
                name="userName"
                placeholder="Username"
                className="userName"
              />
            </div>
            <div className="login-form-item">
              <p>Email</p>
              <input
                type="email"
                name="userEmail"
                placeholder="Email"
                className="signin-userEmail"
              />
            </div>
            <div className="login-form-item">
              <p>Password</p>
              <input
                type="password"
                name="password"
                id=""
                placeholder="Password"
                className="signin-password"
              />
            </div>
            <Link to="/" className="login-button-link">
              <div className="login-form-item">
                <button
                  type="submit"
                  className="login-btn"
                  onClick={signIn}
                  // accessToken = data.accessToken;
                  // console.log(accessToken);
                  // props.account();
                >
                  Sign-in
                </button>
              </div>
            </Link>
            <div
              className="account-switch"
              onClick={() => {
                setCreateAccount(!createAccount);
              }}
            >
              Already had account login
            </div>
          </form>
          <div className="login-side-image">
            <img src="image/logo2.png" alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
