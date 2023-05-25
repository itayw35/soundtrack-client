import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Track.css";

function Track(props) {
  function toBase64(arr) {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }
  const [isAvailable, setIsAvailable] = useState(true);

  return isAvailable ? (
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
