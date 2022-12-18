import React, { useState } from "react";
import { useEffect } from "react";
import Postuser from "./Postuser";
import User from "./User";

function CreatePost(props) {
  const [isLiked, setLike] = useState(false);
  const [countLikes, setCountLikes] = useState(props.likes);
  const [showComments, setShowComments] = useState(false);
  const [addComment, setAddComments] = useState([]);
  let [likeMails, setLikeMails] = useState([]);
  let [userEmail, setUserEmail] = useState("");

  function postComment(commentValue) {
    fetch("https://impact-backend-0p9n.onrender.com/addComment", {
      method: "POST",
      body: JSON.stringify({
        postSrc: props.postSrc,
        valueOfComment: commentValue,
      }),

      headers: {
        accessToken: localStorage.getItem("accessToken"),
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.allComments);
        setAddComments(data.allComments);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetch("https://impact-backend-0p9n.onrender.com/getLikes", {
      method: "POST",
      body: JSON.stringify({
        postSrc: props.postSrc,
      }),
      headers: {
        accessToken: localStorage.getItem("accessToken"),
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        likeMails = data.ans.likeMails;
        userEmail = data.ans.userEmail;
        setLikeMails(data.ans.likeMails);
        setUserEmail(data.ans.userEmail);
        findEmail();
      });
  }, []);

  function findEmail() {
    for (let i = 0; i < likeMails.length; i++) {
      if (likeMails[i] === userEmail) {
        setLike(true);
        break;
      }
    }
  }
  // checkLiked();

  return (
    <div className="created-post">
      <Postuser
        src={props.src}
        username={props.username}
        userintro={props.userintro}
        postContent={props.postContent}
        postSrc={props.postSrc}
      />
      <div className="response-container">
        {isLiked ? (
          <div>
            <i
              onClick={(event) => {
                setLike(!isLiked);
                event.target.style.color = "#fffaff";

                fetch("https://impact-backend-0p9n.onrender.com/addLikes", {
                  // Adding method type
                  method: "POST",

                  // Adding body or contents to send
                  body: JSON.stringify({
                    postSrc: props.postSrc,
                    userEmail: userEmail,
                    isLike: true,
                  }),

                  // Adding headers to the request
                  headers: {
                    accessToken: localStorage.getItem("accessToken"),
                    "Content-type": "application/json; charset=UTF-8",
                  },
                })
                  .then((response) => response.json())
                  .then((data) => {
                    // console.log(data.ans);
                    setCountLikes(data.ans.totalLikes);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              className="fas fa-heart"
              style={{ color: "red" }}
            ></i>
            <span className="like-count">
              {countLikes > 0 ? countLikes : null}
            </span>
          </div>
        ) : (
          <div>
            <i
              onClick={(event) => {
                setLike(!isLiked);
                event.target.style.color = "red";

                fetch("https://impact-backend-0p9n.onrender.com/addLikes", {
                  // Adding method type
                  method: "POST",

                  // Adding body or contents to send
                  body: JSON.stringify({
                    postSrc: props.postSrc,
                    userEmail: userEmail,
                    isLike: false,
                  }),

                  // Adding headers to the request
                  headers: {
                    accessToken: localStorage.getItem("accessToken"),
                    "Content-type": "application/json; charset=UTF-8",
                  },
                })
                  .then((response) => response.json())
                  .then((data) => {
                    // console.log(data.ans);
                    setCountLikes(data.ans.totalLikes);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              className="far fa-heart"
              // style={{ color: "white" }}
            ></i>
            <span className="like-count">
              {countLikes > 0 ? countLikes : null}
            </span>
          </div>
        )}

        <div className="comment-section">
          <input type="text" placeholder="Comment" className="comment-input" />
          <button
            type="submit"
            onClick={() => {
              // console.log(props.id);
              const commentValue =
                document.querySelectorAll(".comment-input")[props.id - 1].value;
              postComment(commentValue);
              document.querySelectorAll(".comment-input")[props.id - 1].value =
                "";
            }}
            className="post-comment-btn"
          >
            Post
          </button>
          <p
            onClick={() => {
              // console.log(showComments);
              fetch("https://impact-backend-0p9n.onrender.com/getAllComments", {
                method: "POST",
                body: JSON.stringify({
                  postSrc: props.postSrc,
                }),

                headers: {
                  accessToken: localStorage.getItem("accessToken"),
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  // console.log(data.allComments);
                  // addComment = data.allComments;
                  setAddComments(data.allComments);
                  // console.log(addComment);
                  // console.log(addComment[0]);
                })
                .catch((err) => {
                  console.log(err);
                });
              setShowComments(!showComments);
            }}
            className="comments-logo"
          >
            C
          </p>
        </div>
      </div>
      <div className="show-comment-section">
        {showComments &&
          addComment.map((item, index) => {
            // console.log(item);
            return (
              <div className="posted-comment" key={index}>
                <div className="user-details-box">
                  <User
                    src={item.postingUser.userProfileImage}
                    username={item.postingUser.userName}
                    userintro={item.postingUser.userIntro}
                  />
                  {/* <h3>{item.postingUser.userName}</h3>
                  <h6>{item.postingUser.userIntro}</h6> */}
                </div>
                <div className="comment">{item.commentValue}</div>
              </div>
            );
          })}
      </div>
      <p className="border-line"></p>
    </div>
  );
}

export default CreatePost;
