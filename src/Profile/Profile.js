import React, { useRef } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const fullNameInput = useRef();
  const URLInput = useRef();

  const updateHandler = (e) => {
    e.preventDefault();
    const enteredfullName = fullNameInput.current.value;
    const enteredURL = URLInput.current.value;

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAN6DmGKUsukndPy4YuaPtcJOezDqk3XXk";
    axios
      .post(url, {
        displayName: enteredfullName,
        photoUrl: enteredURL,
        idToken: localStorage.getItem("tokenID"),
        returnSecureToken: true,
      })
      .then((res) => {
        if (res.status !== 200) {
          let errorMessage = "Authentication failed";
          throw new Error(errorMessage);
        }
        return res.data;
      })
      .then(() => {
        localStorage.getItem("tokenID");
        console.log("successfully updated");
      })
      .catch((err) => console.log("err", err.message));
  };

  return (
    <>
      <div className="mainProfile">
        <span className="welcome">
          Winners never quit, Quitters never win...!!!
        </span>
        <span className="profile">
          <span>
            Your profile is <b>64%</b> completed. A complete profile has a
            higher chance of landing a job.<b> Complete now</b>
          </span>
        </span>
      </div>
      <p>dummy url: https://picsum.photos/200/300</p>
      <form className="container" onSubmit={updateHandler}>
        <h5>Contact Details</h5>
        <hr />
        <div className="box">
          <label htmlFor="fullName">
            <strong>Full Name:</strong>
          </label>
          <input type="text" ref={fullNameInput} id="fullName" />
          <label htmlFor="url">
            <strong>Profile Photo URL:</strong>
          </label>
          <input type="text" ref={URLInput} id="url" />
        </div>
        <br />
        <button>Update</button>
        <hr />
      </form>
    </>
  );
};

export default Profile;
