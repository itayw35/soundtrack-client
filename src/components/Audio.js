import React, { useState, useRef } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { AiOutlinePauseCircle } from "react-icons/ai";
import "./Audio.css";
function Audio(props) {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudio = () => {
    console.log(audioRef.current);
    !isPlaying
      ? audioRef.current
          .play()
          .then(() => console.log("success"))
          .catch((err) => console.log(err))
      : audioRef.current.pause();
    setIsPlaying(!isPlaying);
  };
  function toBase64(arr) {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }
  return (
    <div className="audio-popup">
      <span>{props.marker.markerName}</span>
      {/* {!isPlaying ? (
        <AiOutlinePlayCircle onTouchStart={() => handleAudio()} />
      ) : (
        <AiOutlinePauseCircle onTouchStart={() => handleAudio()} />
      )} */}
      <audio
        ref={audioRef}
        src={
          props.marker.audio.contentType === "audio/mp4"
            ? `data:audio/mp4;base64,${toBase64(props.marker.audio.data.data)}`
            : `data:audio/aac;base64,${toBase64(props.marker.audio.data.data)}`
        }
        onEnded={() => setIsPlaying(false)}
        controls
      ></audio>
    </div>
  );
}

export default Audio;
