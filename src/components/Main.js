import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header.js";
import "./Main.css";
import Track from "./Track.js";
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

  return (
    <>
      <Header />
      <div className="vertical-wrapping-flex">
        <div className="wrapping-flex">
          <div className="track-links-flex">
            {tracks.length
              ? tracks.map((track) => {
                  return <Track track={track} />;
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
