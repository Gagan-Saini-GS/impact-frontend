import React from "react";
import { useState } from "react";
import User from "./User";

function Postuser(props) {
  let startingPostContent = props.postContent;
  const temp = props.postContent.slice(0, 200);
  const [slicedPostContent, setContent] = useState(temp);

  // console.log(slicedPostContent);
  const [isReadMore, setReadMore] = useState(false);

  function expendPostContent() {
    if (isReadMore === false) {
      setContent(startingPostContent);
    } else {
      setContent(temp);
    }
    setReadMore(!isReadMore);
  }

  return (
    <div>
      <User
        src={props.src}
        username={props.username}
        userintro={props.userintro}
      />
      <div className="post-content">
        {/* {props.postContent.slice(0, 200)} */}
        {/* {slicedPostContent} */}
        {props.postContent}
        {startingPostContent.length >= 200 && (
          <p className="read-more-link" onClick={expendPostContent}>
            {isReadMore ? "... read less" : "... read more"}
          </p>
        )}
      </div>
      <div className="post-img">
        <img src={props.postSrc} alt="Post" />
      </div>
    </div>
  );
}

export default Postuser;
