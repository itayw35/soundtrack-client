import React, { useEffect, useState } from "react";
import "./Header.css";
import { IoIosArrowDropdown } from "react-icons/io";

export default function Header(props) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [count, setCount] = useState(0);
  const handleLogout = () => {
    props.setIsLoggedIn(localStorage.clear());
    setIsOpenDropdown(false);
  };
  useEffect(() => {
    setCount(count + 1);
  }, [props.isLoggedIn]);
  return (
    <header>
      <div className="user-name-flex">
        <div className="user-name-container">
          <span>
            Hello {localStorage.userName}
            <IoIosArrowDropdown
              onClick={() => {
                setIsOpenDropdown(!isOpenDropdown);
              }}
            />
          </span>
          {isOpenDropdown && props.isLoggedIn ? (
            <div className="dropdown-flex">
              <button className="dropdown-button" onClick={handleLogout}>
                Disconnect
              </button>
            </div>
          ) : isOpenDropdown ? (
            <div className="dropdown-flex">
              <button
                className="dropdown-button"
                onClick={() => {
                  props.setIsPopup(true);
                  props.setIsLogin(true);
                }}
              >
                Log-In
              </button>
              <button
                className="dropdown-button"
                onClick={() => {
                  props.setIsPopup(true);
                  props.setIsLogin(false);
                }}
              >
                Sign-Up
              </button>
            </div>
          ) : null}
        </div>
        <div className="logo-container">
          <i>
            <b>SoundTrack</b>
          </i>
        </div>
      </div>
    </header>
  );
}
