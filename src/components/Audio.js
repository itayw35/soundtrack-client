import React, { useState, useRef } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { AiOutlinePauseCircle } from "react-icons/ai";
import "./Audio.css";
function Audio(props) {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudio = () => {
    console.log(audioRef.current);
    !isPlaying ? audioRef.current.play() : audioRef.current.pause();
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
      {!isPlaying ? (
        <AiOutlinePlayCircle onClick={() => handleAudio()} />
      ) : (
        <AiOutlinePauseCircle onClick={() => handleAudio()} />
      )}
      <audio
        ref={audioRef}
        src={`data:audio/mp4;base64,${toBase64(props.marker.audio.data.data)}`}
        onEnded={() => setIsPlaying(false)}
      ></audio>
    </div>
  );
}

export default Audio;
