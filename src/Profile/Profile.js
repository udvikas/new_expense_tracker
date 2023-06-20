import React, { useRef,useEffect,useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [ profile, setProfile ] = useState({
    userName:"",
    userPhotoUrl: ""
  })
  const fullNameInput = useRef();
  const URLInput = useRef();
  const navigate = useNavigate();
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
        if (res.status === 200) {
          return res.data;
        } else {
          let errorMessage = "Authentication failed";
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        localStorage.getItem("tokenID");
        setProfile({
          userName:data.displayName,
          userPhotoUrl:data.photoUrl,
        })
        console.log("successfully updated");
        alert("profile details have been successfully updated")
        alert("You can edit again by clicking on Profile tab")
        navigate("/home")

      })
      .catch((err) => console.log("err", err.message));
  };

  useEffect(() => {

    const updateProfile = () =>{
      let url = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAN6DmGKUsukndPy4YuaPtcJOezDqk3XXk";
    axios.post(url, {
      idToken: localStorage.getItem("tokenID"),

    }).then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        let errorMessage = "Authentication failed";
        throw new Error(errorMessage);
      }
      
    })
    .then((data) => {
      localStorage.getItem("tokenID");
      setProfile({
        userName:data.users[0].displayName,
        userPhotoUrl:data.users[0].photoUrl,
      })
    })
    .catch((err) => console.log("err", err.message));
    }
    updateProfile();
    
  },[])
useEffect(() => {
  fullNameInput.current.value=profile.userName;
  URLInput.current.value=profile.userPhotoUrl;
})
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
