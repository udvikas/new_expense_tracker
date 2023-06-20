import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Forgot.css';
import axios from 'axios';
const Forgot = () => {
    const enteredEmail = useRef();
    const navigate = useNavigate();
    const passwordHandler = (e) => {
        e.preventDefault();
        let url =
          "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAN6DmGKUsukndPy4YuaPtcJOezDqk3XXk";
        axios
          .post(url, {
            requestType: "PASSWORD_RESET",
            email: enteredEmail.current.value,
          })
          .then((res) => {
            if (res.status === 200) {
              return res.data;
            } else {
              let errorMessage = "Authentication failed";
              throw new Error(errorMessage);
            }
          })
          .then(() => {
            console.log("Password is Successfully Changed");
            alert("Password is Successfully Changed")
            navigate("/login")
          })
          .catch((err) => console.log("err", err.message));
      };
  return (
    <div className='main'>
      <form className='submain'>
        <label>Enter the registered email.</label><br />
        <input ref={enteredEmail} type="email" placeholder='Email' /><br />
        <button onClick={passwordHandler}>Send Link</button>
        <hr />
        <p>Already a user? <Link style={{ textDecoration: "none" }} to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Forgot;