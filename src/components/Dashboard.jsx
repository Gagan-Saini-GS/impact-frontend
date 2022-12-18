import React, { useState, useEffect } from "react";
import User from "./User";
import Post from "./Post";

function Dashboard() {
  const [allPosts, setAllPosts] = useState([]);
  const [allConnections, setConnections] = useState([]);
  // const [status, setStatus] = useState("");
  const [contentEdit, setContentEdit] = useState(false);
  const [about, setAbout] = useState(false);
  const [aboutContent, setAboutContent] = useState("");
  const [editSkill, setEditSkill] = useState(false);
  const [allSkills, setAllSkills] = useState([]);
  const [numberOfConnections, setNumberOfConnections] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  let [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
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
        currentUser = data.ans;
        setCurrentUser(data.ans);
        // console.log(currentUser);
      });
  }, []);

  useEffect(() => {
    fetch("https://impact-backend-0p9n.onrender.com/accessActivities", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllPosts(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://impact-backend-0p9n.onrender.com/accessConnections", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        accessToken: localStorage.getItem("accessToken"),
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setConnections(data.currentUserConnections);
      });
  }, []);

  useEffect(() => {
    fetch("https://impact-backend-0p9n.onrender.com/accessAboutContent", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        accessToken: localStorage.getItem("accessToken"),
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setAboutContent(data.userAboutContent);
      });
  }, []);

  useEffect(() => {
    fetch("https://impact-backend-0p9n.onrender.com/accessSkills", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        accessToken: localStorage.getItem("accessToken"),
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setAllSkills(data.currentUserSkills);
      });
  }, []);

  useEffect(() => {
    fetch("https://impact-backend-0p9n.onrender.com/accessNumOfConnections", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        accessToken: localStorage.getItem("accessToken"),
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNumberOfConnections(data.numConnections);
      });
  }, []);

  function updateAboutContent() {
    const aboutContent = document.querySelector(".about-input").value;

    fetch("https://impact-backend-0p9n.onrender.com/updateAboutContent", {
      method: "POST",
      body: JSON.stringify({
        userAboutContent: aboutContent,
      }),

      headers: {
        accessToken: localStorage.getItem("accessToken"),
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAboutContent(data.ans);
      })
      .catch((err) => {
        console.log(err);
      });

    // setAboutContent(aboutContent);
    setAbout(false);
  }

  function addSkill() {
    const skillInput = document.querySelector(".skill-input").value;
    fetch("https://impact-backend-0p9n.onrender.com/addSkill", {
      method: "POST",
      body: JSON.stringify({
        skill: skillInput,
      }),
      headers: {
        accessToken: localStorage.getItem("accessToken"),
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllSkills(data.skills);
      })
      .catch((err) => {
        console.log(err);
      });
    setEditSkill(false);
  }

  // Changing image into base64

  async function uploadImage(event) {
    const file = event.target.files[0];
    const base64 = await convertIntoBase64(file);
    setImgSrc(base64);
    // setIsIMG(true);
  }

  function convertIntoBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  }

  // End of changing image.

  return (
    <div className="dashboard-container">
      <div className="user-profile-container dashboard-item">
        <div className="user-profile-img">
          <img src={currentUser.userProfileImage} alt="user-profile-image" />
        </div>
        <div className="user-details">
          <h4>{currentUser.userName}</h4>
          <h4>{currentUser.userIntro}</h4>
          {/* <h4>{props.userDetails.userEmail}</h4> */}
        </div>
        <div className="followers">
          <h4>Connections</h4>
          <p>{numberOfConnections}</p>
        </div>
        <div
          className="edit-icon"
          onClick={() => {
            setContentEdit(true);
          }}
        >
          <i className="fas fa-pen"></i>
        </div>

        {contentEdit && (
          <div className="edit-section">
            <h1>Edit your profile</h1>
            <textarea
              name="userIntro"
              cols="90"
              rows="12"
              placeholder="User Intro"
              className="user-intro"
            ></textarea>
            <input
              type="file"
              name="userProfileImage"
              className="user-profile-image"
              onChange={(event) => {
                uploadImage(event);
              }}
            />
            <button
              className="save-btn"
              onClick={() => {
                const userIntro = document.querySelector(".user-intro").value;
                fetch(
                  "https://impact-backend-0p9n.onrender.com/updateInformation",
                  {
                    method: "POST",
                    body: JSON.stringify({
                      userIntro: userIntro,
                      userImg: imgSrc,
                    }),

                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                      accessToken: localStorage.getItem("accessToken"),
                    },
                  }
                )
                  .then((response) => response.json())
                  .then((data) => {
                    // setStatus(data.status);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                setContentEdit(false);
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <section className="dashboard-detail">
        <div className="connections-container dashboard-item">
          <h1>Connections</h1>
          {typeof allConnections !== "undefined" &&
            allConnections.map((item, index) => {
              return (
                <User
                  key={index}
                  src={item.userProfileImage}
                  username={item.userName}
                  userintro={item.userIntro}
                />
              );
            })}
        </div>
        <div className="activity-container dashboard-item">
          <h1>Activities</h1>
          {typeof allPosts.currentUserAllPosts !== "undefined" &&
            allPosts.currentUserAllPosts.map((post, postIndex) => {
              return (
                <Post
                  key={postIndex}
                  src={post.postImgSrc}
                  postContent={post.postContent}
                />
              );
            })}
        </div>
      </section>
      <section className="dashboard-detail">
        <div className="skill-container dashboard-item">
          <h1>Skills</h1>
          <div className="skill-section">
            {allSkills.map((skill, index) => {
              return (
                <p key={index} className="skill-item">
                  {skill}
                </p>
              );
            })}
          </div>
          <div className="add-skill-btn-section">
            {editSkill && (
              <div>
                <input
                  type="text"
                  placeholder="Skill"
                  className="skill-input"
                />
                <button onClick={addSkill}>Add Skill</button>
              </div>
            )}
            <button
              className="add-skill-btn-2"
              onClick={() => {
                setEditSkill(true);
              }}
            >
              +
            </button>
            {/* <button className="add-skill-btn">Add Skill</button> */}
          </div>
        </div>
        <div className="about-container dashboard-item">
          <h1>
            About
            <div
              className="edit-icon"
              onClick={() => {
                setAbout(true);
              }}
            >
              <i className="fas fa-pen"></i>
            </div>
          </h1>
          <div className="about-user">
            <div className="about-section">{aboutContent}</div>
          </div>
          {about && (
            <div className="about-edit-section">
              {/* <input type="text" className="about-input" /> */}
              <textarea
                cols="30"
                rows="10"
                className="about-input"
                placeholder="Your about section."
              ></textarea>
              <button onClick={updateAboutContent} className="about-save-btn">
                Save
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
