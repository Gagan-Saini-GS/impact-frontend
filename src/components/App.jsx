import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Feed from "./Feed";
import Postform from "./Postform";
import Login from "./Login";
import User from "./User";
import Founduser from "./FoundUser";
import InviteCard from "./InviteCard";
import ReportBug from "./ReportBug";
import AdminPanel from "./AdminPanel";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Streak from "./Streak";
import Bottomnavbar from "./Bottomnavbar";
import "./App.css";

function App() {
  const [showFeed, setShowFeed] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const [foundUsers, setFoundUsers] = useState(false);
  const [checkConnections, setCheckConnections] = useState(false);
  const [checkInvitations, setCheckInvitations] = useState(false);
  const [checkPendingRequest, setCheckPendingRequest] = useState(false);
  const [currentUser, setCurrUser] = useState({});
  let [searchedUsers, setSearchedUsers] = useState([]);
  let [invitations, setInvitations] = useState([]);
  let [connections, setConnections] = useState([]);
  let [pendingRequests, setPendingRequests] = useState([]);
  const [showBugPage, setShowBugPage] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  let [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // console.log(checkAccessToken);

    if (accessToken === null) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  }, []);

  function handleDashboard() {
    setShowFeed(false);
    setFoundUsers(false);
    setCheckConnections(false);
    setCheckInvitations(false);
    setCheckPendingRequest(false);
    setShowBugPage(false);
    getUserDetails();
    // console.log("hello handing dashboard");
  }

  function goToHome() {
    setShowFeed(true);
  }

  function login() {
    setLogin(!isLogin);
  }

  const [user, setUser] = useState({});

  function getUserDetails() {
    // console.log(JSON.parse(localStorage.getItem("accessToken")).accessToken);
    // console.log(accessToken);
    fetch("https://impact-backend-0p9n.onrender.com/currentUser", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.ans);
        setUser(data.ans);
      });
  }

  useEffect(() => {
    if (isLogin) {
      getUserDetails();
    }
  }, []);

  function logout() {
    localStorage.removeItem("accessToken");
    setLogin(false);
  }

  function foundConnections(arr) {
    setFoundUsers(true);
    setShowFeed(false);
    setSearchedUsers(arr);
    if (arr.length !== 0) {
      setCurrUser(setSearchedUsers[0]);
    }
  }

  function showConnections(arr) {
    // console.log("Hello from function");
    setShowFeed(false);
    setFoundUsers(false);
    setCheckConnections(true);
    setCheckInvitations(false);
    setCheckPendingRequest(false);
    setShowBugPage(false);
    connections = arr;
    // console.log(connections);
    setConnections(arr);
  }

  function showInvitations(arr) {
    setShowFeed(false);
    setFoundUsers(false);
    setCheckConnections(false);
    setCheckInvitations(true);
    setShowBugPage(false);
    setCheckPendingRequest(false);
    invitations = arr;
    setInvitations(arr);
    // console.log(invitations);
  }

  function showPendingRequest(arr) {
    setShowFeed(false);
    setFoundUsers(false);
    setCheckConnections(false);
    setCheckInvitations(false);
    setShowBugPage(false);
    setCheckPendingRequest(true);
    pendingRequests = arr;
    setPendingRequests(arr);
  }

  function reportBug() {
    setShowFeed(false);
    setFoundUsers(false);
    setCheckConnections(false);
    setCheckInvitations(false);
    setCheckPendingRequest(false);
    setShowBugPage(true);
  }

  function passAccessToken(token) {
    setAccessToken(token);
    if (token !== null && token !== undefined) {
      setLogin(true);
    }
  }

  function setPosts(data) {
    allPosts = data;
    setAllPosts(data);
  }

  function showMakePost() {
    document.querySelector(".post-form").style.display = "block";
    document.querySelector(".bottom-navbar").style.display = "none";
  }

  return (
    <Router>
      <div>
        {!isLogin ? (
          <Login
            login={login}
            // account={account}
            passAccessToken={passAccessToken}
          />
        ) : (
          <div className="app-container">
            <Navbar
              handleDashboard={handleDashboard}
              goToHome={goToHome}
              logout={logout}
              foundConnections={foundConnections}
              showConnections={showConnections}
              showInvitations={showInvitations}
              showPendingRequest={showPendingRequest}
              reportBug={reportBug}
            />

            <Bottomnavbar showMakePost={showMakePost} />
            <Routes>
              <Route path="/" element={<Navigate to="/feed" />} />
              <Route
                path="/feed"
                element={[
                  <Feed allPosts={allPosts} setPosts={setPosts} />,
                  <Postform accessToken={accessToken} setPosts={setPosts} />,
                ]}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/find-users"
                element={
                  <div className="found-users-main-container">
                    <div className="found-users-container">
                      {searchedUsers.length !== 0 &&
                        searchedUsers.map((item, index) => {
                          return (
                            <div
                              onClick={() => {
                                const temp = {
                                  imgSrc: item.userProfileImage,
                                  name: item.userName,
                                  intro: item.userIntro,
                                  email: item.userEmail,
                                };
                                setCurrUser(temp);
                              }}
                              className="found-user"
                            >
                              <User
                                key={index}
                                src={item.userProfileImage}
                                username={item.userName}
                                userintro={item.userIntro}
                              />
                            </div>
                          );
                        })}
                    </div>
                    <div className="user-details-container">
                      {typeof currentUser !== "undefined" && (
                        <Founduser
                          userProfileImage={currentUser.imgSrc}
                          userName={currentUser.name}
                          userIntro={currentUser.intro}
                          userEmail={currentUser.email}
                        />
                      )}
                    </div>
                  </div>
                }
              />
              <Route
                path="/connections"
                element={
                  <div className="box">
                    {connections.length !== 0 ? (
                      connections.map((item, index) => {
                        return (
                          <InviteCard
                            key={index}
                            imgSrc={item.userProfileImage}
                            userName={item.userName}
                            userEmail={item.userEmail}
                            userIntro={item.userIntro}
                            type="connection"
                          />
                        );
                      })
                    ) : (
                      <h1>No Connections !</h1>
                    )}
                  </div>
                }
              />
              <Route
                path="/pending-requests"
                element={
                  <div className="box">
                    {pendingRequests.length !== 0 ? (
                      pendingRequests.map((item, index) => {
                        return (
                          <InviteCard
                            key={index}
                            imgSrc={item.userProfileImage}
                            userName={item.userName}
                            userEmail={item.userEmail}
                            userIntro={item.userIntro}
                            type="request"
                          />
                        );
                      })
                    ) : (
                      <h1>No Pending Request !</h1>
                    )}
                  </div>
                }
              />
              <Route
                path="/invitations"
                element={
                  <div className="box">
                    {invitations.length !== 0 ? (
                      invitations.map((item, index) => {
                        console.log(item);
                        return (
                          <InviteCard
                            key={index}
                            imgSrc={item.userProfileImage}
                            userName={item.userName}
                            userEmail={item.userEmail}
                            userIntro={item.userIntro}
                            type="invitation"
                          />
                        );
                      })
                    ) : (
                      <h1>No Invitations !</h1>
                    )}
                  </div>
                }
              />
              <Route
                path="/groups"
                element={
                  <div className="box">
                    <h1>No Groups feature yet! Sorry.</h1>
                  </div>
                }
              />

              <Route
                path="/notifications"
                element={
                  <div>
                    <h1>Notifications Page</h1>
                  </div>
                }
              />

              <Route path="/streak" element={<Streak />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/report-bug-page" element={<ReportBug />} />
            </Routes>

            {/* {showFeed ? (
                <Route
                  path="/feed"
                  element={[
                    <Feed allPosts={allPosts} setPosts={setPosts} />,
                    <Postform accessToken={accessToken} setPosts={setPosts} />,
                  ]}
                />
              ) : foundUsers ? (
                <div className="found-users-main-container">
                  <div className="found-users-container">
                    {searchedUsers.length !== 0 &&
                      searchedUsers.map((item, index) => {
                        // console.log(searchedUsers[0]);
                        // setCurrUser(searchedUsers[0]);
                        return (
                          <div
                            onClick={() => {
                              const temp = {
                                imgSrc: item.userProfileImage,
                                name: item.userName,
                                intro: item.userIntro,
                                email: item.userEmail,
                              };
                              setCurrUser(temp);
                            }}
                            className="found-user"
                          >
                            <User
                              key={index}
                              src={item.userProfileImage}
                              username={item.userName}
                              userintro={item.userIntro}
                            />
                          </div>
                        );
                      })}
                  </div>
                  <div className="user-details-container">
                    {typeof currentUser !== "undefined" && (
                      <Founduser
                        userProfileImage={currentUser.imgSrc}
                        userName={currentUser.name}
                        userIntro={currentUser.intro}
                        userEmail={currentUser.email}
                      />
                    )}
                  </div>
                </div>
              ) : checkInvitations ? (
                <div className="box">
                  {invitations.length !== 0 ? (
                    invitations.map((item, index) => {
                      console.log(item);
                      return (
                        <InviteCard
                          key={index}
                          imgSrc={item.userProfileImage}
                          userName={item.userName}
                          userEmail={item.userEmail}
                          userIntro={item.userIntro}
                          type="invitation"
                        />
                      );
                    })
                  ) : (
                    <h1>No Invitations !</h1>
                  )}
                </div>
              ) : checkPendingRequest ? (
                <div className="box">
                  {pendingRequests.length !== 0 ? (
                    pendingRequests.map((item, index) => {
                      return (
                        <InviteCard
                          key={index}
                          imgSrc={item.userProfileImage}
                          userName={item.userName}
                          userEmail={item.userEmail}
                          userIntro={item.userIntro}
                          type="request"
                        />
                      );
                    })
                  ) : (
                    <h1>No Pending Request !</h1>
                  )}
                </div>
              ) : checkConnections ? (
                <div className="box">
                  {connections.length !== 0 ? (
                    connections.map((item, index) => {
                      return (
                        <InviteCard
                          key={index}
                          imgSrc={item.userProfileImage}
                          userName={item.userName}
                          userEmail={item.userEmail}
                          userIntro={item.userIntro}
                          type="connection"
                        />
                      );
                    })
                  ) : (
                    <h1>No Connections !</h1>
                  )}
                </div>
              ) : showBugPage ? (
                <ReportBug />
              ) : (
                <Route
                  path="/dashboard"
                  element={<Dashboard userDetails={user} />}
                />
              )}
              {showFeed && (
                <Route
                  path="/feed"
                  element={
                    <Postform accessToken={accessToken} setPosts={setPosts} />
                  }
                />
              )} */}
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
