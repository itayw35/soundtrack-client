import React, { useRef, useState } from "react";
import "./Popup.css";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
export default function Popup(props) {
  function toBase64(arr) {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const handleAudio = () => {
    !isPlaying ? audioRef.current.play() : audioRef.current.pause();
    setIsPlaying(!isPlaying);
  };
  return (
    <>
      <div className="player">
        <div className="close-popup">
          <AiOutlineClose onTouchStart={() => props.setIsPopup(false)} />
        </div>
        {!isPlaying ? (
          <AiOutlinePlayCircle onTouchStart={() => handleAudio()} />
        ) : (
          <AiOutlinePauseCircle onTouchStart={() => handleAudio()} />
        )}
      </div>
      <audio
        ref={audioRef}
        src={`data:audio/mp4;base64,${toBase64(
          props.markers[props.markerNum].audio.data.data
        )}`}
      ></audio>
    </>
  );
}
