import React from "react";
import { useState } from "react";

function Postform(props) {
  const [isIMG, setIsIMG] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [isPost, setIsPost] = useState(false);
  const [about, setAbout] = useState(true);

  // Changing image into base64

  async function uploadImage(event) {
    const file = event.target.files[0];
    const base64 = await convertIntoBase64(file);
    setImgSrc(base64);
    setIsIMG(true);
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

  function handleImage() {
    setIsIMG(true);
    const input = document.querySelector(".choosed-img");
    setImgSrc("image/" + input.files[0].name);
  }

  function postUpload() {
    const input = document.querySelector(".choosed-img");
    const postContent = document.querySelector(".post-content-input").value;

    // console.log(postContent);

    fetch("/postUpload", {
      method: "POST",
      body: JSON.stringify({
        postContent: postContent,
        postImgSrc: imgSrc,
        // postImgSrc: input.files[0].name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        props.setPosts(data);
        setAbout(true);
        setIsPost(false);
        setImgSrc("");
        setIsIMG(false);
      });
  }

  function hitPost() {
    setIsPost(true);
    setAbout(false);
  }

  return (
    <div className="post-form">
      <h1>Post Your Creativity</h1>
      {isPost && (
        <div className="post-form-container">
          <form
            action="/postUpload"
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <p className="post-form-info">Post Content</p>
            <textarea
              cols="50"
              rows="12"
              className="post-content-input"
              placeholder="Your post content...."
              name="postContent"
            ></textarea>
            <p className="post-form-info">Choose Photo</p>
            {isIMG && (
              <div className="preViewImg">
                <img src={imgSrc} alt="Posting Img" />
              </div>
            )}
            <input
              type="file"
              name="choosedImg"
              className="choosed-img"
              // onChange={handleImage}
              onChange={(event) => {
                uploadImage(event);
              }}
            />
            <button type="submit" className="post-btn" onClick={postUpload}>
              Upload
            </button>
          </form>
        </div>
      )}
      {about && (
        <div>
          <img
            className="founder-image"
            src="image/logo2.png"
            alt="Founder's image"
          />
          <h2>Gagan Saini</h2>
          <p className="founder-info">Founder & CEO</p>
          <p className="about-content">
            Impact is a socail media website where you can connect to other
            people and post your activities to create impact in your industry.
          </p>
          <button className="make-post-btn" onClick={hitPost}>
            MAKE POST
          </button>
        </div>
      )}
    </div>
  );
}

export default Postform;
