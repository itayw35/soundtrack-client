import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./Popup.css";

export default function MyPopup(props) {
  const login = function (e) {
    // e.preventDefault();
    // const userName = e.target.userName.value;
    // const password = e.target.password.value;
    // const fname = e.target.firstName?.value;
    // const lname = e.target.lastName?.value;
    // const url = props.isLogin
    //   ? `${baseURL}/users/login`
    //   : `${baseURL}/users/register`;
    // axios
    //   .post(url, {
    //     fname: fname,
    //     lname: lname,
    //     email: userName,
    //     password: password,
    //   })
    //   .then((res) => {
    //     localStorage.token = res.data.token;
    //     localStorage.userName = res.data.userName;
    //     props.setIsLogged(true);
    //     setCurrentPlaylist();
    //   })
    //   .catch((err) => console.log(err));
  };
  return (
    <>
      <div id="login-box">
        <span className="close-popup" onClick={() => props.setIsPopup(false)}>
          <AiOutlineCloseCircle />
        </span>
        <form className="login-form" onSubmit={(e) => login(e)}>
          {!props.isLogin ? (
            <div className="register-form">
              <input
                name="firstName"
                className="user-details"
                placeholder="first name"
                type={"text"}
              ></input>
              <input
                name="lastName"
                className="user-details"
                placeholder="last name"
                type={"text"}
              ></input>
            </div>
          ) : null}
          <input
            name="userName"
            className="user-details"
            placeholder="email"
            type={"email"}
          ></input>

          <input
            name="password"
            className="user-details"
            placeholder="password"
            type={"password"}
          ></input>

          <input className="submit-btn" type={"submit"}></input>
        </form>
      </div>
    </>
  );
}
