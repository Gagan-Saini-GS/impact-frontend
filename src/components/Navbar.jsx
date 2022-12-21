import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import SearchBox from "./Search";

function Navbar(props) {
  let [searchedUsers, setSearchedUsers] = useState([]);
  const [showInvitations, setShowInvitations] = useState([]);
  const [showPendingRequest, setPendingRequest] = useState([]);
  const [showConnections, setConnections] = useState([]);

  function findUsers() {
    const searchedUserName = document.querySelector(".searched-input").value;

    fetch("https://impact-backend-0p9n.onrender.com/findUser", {
      method: "POST",
      body: JSON.stringify({
        username: searchedUserName,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.users);
        searchedUsers = data.users;
        setSearchedUsers(data.users);
        // console.log(searchedUsers);
        props.foundConnections(searchedUsers);
      })
      .catch((err) => {
        console.log(err);
      });

    document.querySelector(".searched-input").value = "";
  }

  function getConnections() {
    // props.showConnections();
    fetch("https://impact-backend-0p9n.onrender.com/showConnections", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Hello from api");
        // console.log(data.x);
        setConnections(data.x);
        props.showConnections(showConnections);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getPendingRequests() {
    fetch("https://impact-backend-0p9n.onrender.com/showPendingRequest", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.x);
        setPendingRequest(data.x);
        props.showPendingRequest(showPendingRequest);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getInvitations() {
    fetch("https://impact-backend-0p9n.onrender.com/showInvitations", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.x.length);
        setShowInvitations(data.x);

        // console.log(showInvitations.length);
        props.showInvitations(showInvitations);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    // <div className="navbar-container">
    //   <Link to="/feed">
    //     <div onClick={props.goToHome} className="nav-item logo nav-logo">
    //       <i className="fas fa-bolt"></i>
    //       Impact
    //     </div>
    //   </Link>

    //   <Link to="/dashboard">
    //     <div onClick={props.handleDashboard} className="nav-item dashboard">
    //       <i className="fas fa-bars"></i>
    //       Dashboard
    //     </div>
    //   </Link>

    //   <Link to="/find-users">
    //     <div className="nav-item search-bar">
    //       <div className="search-bar-box">
    //         <input
    //           type="text"
    //           name="username"
    //           placeholder="Search..."
    //           className="searched-input"
    //         />
    //         <i className="fa fa-search" onClick={findUsers}></i>
    //       </div>
    //     </div>
    //   </Link>

    //   <div className="nav-item connections">
    //     <ul className="list connection-list">
    //       <Link to="/connections">
    //         <li onClick={getConnections}>
    //           <i className="fas fa-user"></i>Connections
    //         </li>
    //       </Link>

    //       <Link to="/pending-requests">
    //         <li onClick={getPendingRequests}>
    //           <i className="far fa-clock"></i>Pending Request
    //         </li>
    //       </Link>

    //       <Link to="/invitations">
    //         <li onClick={getInvitations}>
    //           <i className="fas fa-envelope"></i>Invitations
    //         </li>
    //       </Link>

    //       <Link to="/groups">
    //         <li>
    //           <i className="fas fa-users"></i>Groups
    //         </li>
    //       </Link>
    //     </ul>
    //   </div>

    //   <div className="nav-item streak">
    //     <ul className="list streak-list">
    //       <Link to="/notifications">
    //         <li>
    //           <i class="fas fa-bell"></i>Notifications
    //         </li>
    //       </Link>
    //       <Link to="/streak">
    //         <li>
    //           <i className="fas fa-fire"></i>Streak
    //         </li>
    //       </Link>
    //     </ul>
    //   </div>
    //   <div className="nav-item social-media">
    //     <ul className="list social-media-list">
    //       <li>
    //         <i className="fab fa-linkedin"></i>Linkedin
    //       </li>
    //       <li>
    //         <i className="fab fa-instagram"></i>Instagram
    //       </li>

    //       <Link to="/report-bug-page">
    //         <li
    //           onClick={() => {
    //             props.reportBug();
    //           }}
    //         >
    //           <i className="fas fa-bug"></i>Report Bug
    //         </li>
    //       </Link>

    //       <Link to="/login">
    //         <li
    //           onClick={() => {
    //             props.logout();
    //           }}
    //         >
    //           <i className="fas fa-arrow-left"></i>Logout
    //         </li>
    //       </Link>
    //     </ul>
    //   </div>
    // </div>

    <div className="nav-container">
      <div className="logo-container">
        <Link to="/feed">
          <div className="logo" onClick={props.goToHome}>
            <i className="fas fa-bolt"></i>
            <p className="company-name">Impact</p>
          </div>
        </Link>
        <div
          className="expandIcon"
          onClick={() => {
            const menupage = document.getElementById("menupage");
            menupage.classList.toggle("menubar");
            menupage.classList.toggle("shownav");
          }}
        >
          <i className="fas fa-bars"></i>
        </div>
      </div>

      <div id="menupage" className="shownav">
        <div className="menu-item">
          <ul>
            <Link to="/dashboard">
              <li className="menubar-list-item" onClick={props.handleDashboard}>
                <i className="fas fa-bars"></i>
                <p>Dashboard</p>
              </li>
            </Link>
            <Link to="/find-users">
              <li className="menubar-list-item">
                <i className="fas fa-search" onClick={findUsers}></i>
                {/* <p>Search User</p> */}
                <input
                  type="text"
                  name="username"
                  placeholder="Search users..."
                  className="searched-input"
                />
              </li>
            </Link>
          </ul>
        </div>

        <div className="line-break"></div>

        <div className="menu-item">
          <ul>
            <Link to="/connections">
              <li className="menubar-list-item" onClick={getConnections}>
                <i className="fas fa-user"></i>
                <p>Connections</p>
              </li>
            </Link>
            <Link to="/pending-requests">
              <li className="menubar-list-item" onClick={getPendingRequests}>
                <i className="far fa-clock"></i>
                <p>Pending Request</p>
              </li>
            </Link>
            <Link to="/invitations">
              <li className="menubar-list-item" onClick={getInvitations}>
                <i className="fas fa-envelope"></i>
                <p>Invitations</p>
              </li>
            </Link>
            <Link to="/groups">
              <li className="menubar-list-item">
                <i className="fas fa-users"></i>
                <p>Groups</p>
              </li>
            </Link>
          </ul>
        </div>

        <div className="menu-item">
          <ul>
            <Link to="/notifications">
              <li className="menubar-list-item">
                <i className="fas fa-bell"></i>
                <p>Notifications</p>
              </li>
            </Link>
            <Link to="/streak">
              <li className="menubar-list-item">
                <i className="fas fa-fire"></i>
                <p>Streak</p>
              </li>
            </Link>
          </ul>
        </div>

        <div className="menu-item">
          <ul>
            <li className="menubar-list-item">
              <i className="fab fa-linkedin"></i>
              <p>LinkedIn</p>
            </li>
            <li className="menubar-list-item">
              <i className="fab fa-instagram"></i>
              <p>Instagram</p>
            </li>
            <Link to="/report-bug-page">
              <li
                className="menubar-list-item"
                onClick={() => {
                  props.reportBug();
                }}
              >
                <i className="fas fa-bug"></i>
                <p>Report Bug</p>
              </li>
            </Link>

            <Link to="/login">
              <li
                className="menubar-list-item"
                onClick={() => {
                  props.logout();
                }}
              >
                <i className="fas fa-arrow-left"></i>
                <p>Logout</p>
              </li>
            </Link>
          </ul>
        </div>
        <div className="tag-line">Create your impact</div>
      </div>
    </div>
  );
}

export default Navbar;
