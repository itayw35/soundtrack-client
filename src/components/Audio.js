import React from "react";
import "./Audio.css";
function Audio(props) {
  function toBase64(arr) {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }
  return (
    <div className="audio-popup">
      <span>{props.marker.markerName}</span>
      <audio
        src={
          props.marker.audio.contentType === "audio/mp4"
            ? `data:audio/mp4;base64,${toBase64(props.marker.audio.data.data)}`
            : `data:audio/aac;base64,${toBase64(props.marker.audio.data.data)}`
        }
        controls
      ></audio>
    </div>
  );
}

export default Audio;
