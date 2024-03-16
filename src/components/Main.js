import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header.js";
import "./Main.css";
import Track from "./Track.js";
import MyPopup from "./MyPopup.js";
export default function Main() {
  const [tracks, setTracks] = useState([]);
  const [userTracks, setUserTracks] = useState([]);
  const [displayedTracks, setDisplayedTracks] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.token);
  const [isStore, setIsStore] = useState(false);
  const handleStore = () => {
    setIsStore(!isStore);
    if (isStore) {
      setDisplayedTracks(
        tracks.filter((track) => userTracks.includes(track._id))
      );
    } else {
      setDisplayedTracks(tracks);
    }
  };
  useEffect(() => {
    axios
      .get("https://soundtrack.herokuapp.com/tracks/get-tracks")
      .then((res) => {
        setTracks(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`https://soundtrack.herokuapp.com/users/get-user-tracks`, {
          headers: { authorization: "bearer " + localStorage.token },
        })
        .then((res) => {
          setUserTracks(res.data);
          if (!isStore) {
            setDisplayedTracks(
              tracks.filter((track) => res.data.includes(track._id))
            );
          }
        })
        .catch((err) => console.log(err));
    } else {
      setUserTracks([]);
      if (!isStore) {
        setDisplayedTracks([]);
      }
    }
  }, [tracks, isLoggedIn, isStore]);

  return (
    <>
      <Header
        setIsPopup={setIsPopup}
        setIsLogin={setIsLogin}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
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
          <h2>{!isStore ? "My Tracks" : "TrackStore"}</h2>
          <button className="store-toggle-button" onClick={handleStore}>
            {!isStore ? <b>Go To TrackStore</b> : <b>Go To My Tracks</b>}
          </button>
          <div className="track-links-flex">
            {displayedTracks.length
              ? displayedTracks.map((track) => {
                  return (
                    <Track
                      track={track}
                      userTracks={userTracks}
                      isLoggedIn={isLoggedIn}
                    />
                  );
                })
              :null}
          </div>
        </div>
      </div>
    </>
  );
}
