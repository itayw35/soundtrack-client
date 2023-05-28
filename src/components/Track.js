import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
import "./Track.css";
import axios from "axios";

function Track(props) {
  function toBase64(arr) {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }
  const [isTempAvailable, setIsTempAvailable] = useState(false);
  const loaderRef = useRef();
  const containerRef = useRef();
  const handleDownload = () => {
    loaderRef.current.classList.add("active");
    setTimeout(function () {
      containerRef.current.classList.add("active");
      loaderRef.current.classList.remove("active");
      setIsTempAvailable(true);
      if (props.isLoggedIn) {
        axios
          .put(
            "https://soundtrack.herokuapp.com/users/add-track",
            {
              id: props.track._id,
            },
            {
              headers: { authorization: "bearer " + localStorage.token },
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 10000);
  };

  return props.track.isAvailable &&
    (props.userTracks.includes(props.track._id) || isTempAvailable) ? (
    <Link className="track-link" to={`/tracks/${props.track.trackName}`}>
      <div className="track-box">
        <span>{props.track.trackName}</span>
        <img
          className="track-image"
          src={`data:image/jpeg;base64,${toBase64(props.track.img.data.data)}`}
          alt=""
        />
      </div>
    </Link>
  ) : props.track.isAvailable ? (
    <div>
      <div className="unavailable-track-link">
        <div className="track-box">
          <div className="inner-flex">
            <span>{props.track.trackName}</span>
            <div className="download-flex" onClick={handleDownload}>
              <span>
                <AiOutlineDownload />
              </span>
              <span>Download</span>
            </div>
            <div ref={containerRef} className="container">
              <span ref={loaderRef} className="download_loader"></span>
            </div>
          </div>
          <img
            className="unavailable-track-image"
            src={`data:image/jpeg;base64,${toBase64(
              props.track.img.data.data
            )}`}
            alt=""
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="unavailable-track-link">
      {" "}
      <div className="track-box">
        <span>{props.track.trackName}</span>
        <img
          className="unavailable-track-image"
          src={`data:image/jpeg;base64,${toBase64(props.track.img.data.data)}`}
          alt=""
        />
      </div>
    </div>
  );
}

export default Track;
