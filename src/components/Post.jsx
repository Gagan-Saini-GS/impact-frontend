import React, { useState } from "react";

function Post(props) {
  const startingPostContent = props.postContent;
  const temp = props.postContent.slice(0, 200);
  const [slicedPostContent, setContent] = useState(temp);

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
    <div className="post">
      <img src={props.src} alt="Post image" />
      <div className="post-info">
        <p className="post-description">
          {slicedPostContent}
          {startingPostContent.length >= 200 && (
            <p className="read-more-link" onClick={expendPostContent}>
              {isReadMore ? "... read less" : "... read more"}
            </p>
          )}
        </p>
      </div>
    </div>
  );
}

export default Post;
