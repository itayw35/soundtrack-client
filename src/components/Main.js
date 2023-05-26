import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header.js";
import "./Main.css";
import Track from "./Track.js";
import MyPopup from "./MyPopup.js";
export default function Main() {
  const [tracks, setTracks] = useState([]);
  const [userTracks, setUserTracks] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("https://soundtrack.herokuapp.com/tracks/get-tracks")
      .then((res) => {
        setTracks(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
    if (isLoggedIn) {
      axios
        .get(`https://soundtrack.herokuapp.com/users/get-user-tracks`, {
          headers: { authorization: "bearer " + localStorage.token },
        })
        .then((res) => {
          setUserTracks(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <Header
        setIsPopup={setIsPopup}
        setIsLogin={setIsLogin}
        isLoggedIn={isLoggedIn}
      />
      {isPopup ? (
        <div className="popup-container">
          <MyPopup
            isLogin={isLogin}
            setIsPopup={setIsPopup}
            setIsLoggedIn={setIsLoggedIn}
          />
        </div>
      ) : null}
      <div className="vertical-wrapping-flex">
        <div className="wrapping-flex">
          <div className="track-links-flex">
            {tracks.length
              ? tracks.map((track) => {
                  return (
                    <Track
                      track={track}
                      userTracks={userTracks}
                      isLoggedIn={isLoggedIn}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
