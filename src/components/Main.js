import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header.js";
import "./Main.css";
export default function Main() {
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    axios
      .get("https://soundtrack.herokuapp.com/tracks/get-tracks")
      .then((res) => {
        setTracks(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  function toBase64(arr) {
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }
  return (
    <>
      <Header />
      <div className="vertical-wrapping-flex">
        <div className="wrapping-flex">
          <div className="track-links-flex">
            {tracks.length
              ? tracks.map((track) => {
                  return (
                    <Link
                      className="track-link"
                      to={`/tracks/${track.trackName}`}
                    >
                      <div className="track-box">
                        <span>{track.trackName}</span>
                        <img
                          className="track-image"
                          src={`data:image/jpeg;base64,${toBase64(
                            track.img.data.data
                          )}`}
                        />
                      </div>
                    </Link>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
