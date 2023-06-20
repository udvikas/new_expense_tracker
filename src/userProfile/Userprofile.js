import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import "./Userprofile.css";
import axios from 'axios';

const Userprofile = () => {
  const [color, setColor] = useState('')
  const veryfyEmailHandler = () => {

    let url = "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAN6DmGKUsukndPy4YuaPtcJOezDqk3XXk";
    axios.post(url, {
      requestType: "VERIFY_EMAIL",
      idToken:localStorage.getItem("tokenID")
    }).then((res) => {
      if(res.status === 200) {
        return res.data
      } else{
        let errorMessage = "Authentication failed";
        throw new Error(errorMessage);
      }
    }).then((data) => {
      console.log("Login Email:",data.email)
      setColor(<button style={{background:"green", color:"white"}}>Verified</button>)
    }).catch(err => console.log(err.message))
  }
  return (
    <>
    <div className="mainProfile">
        <span className="welcome">
          Welcome to Expense Tracker...!!!
        </span>
        <span className="profile">
          <span>Your profile is incomplete.</span>
          <Link to="/profile">
            <b> Complete now</b>
          </Link>
        </span>
        
      </div>
      <div className="email1">
           {!color ? <button onClick={veryfyEmailHandler}>Verify Email</button> : <button style={{background:"green", color:"white"}}>Verified</button> }
        </div>
      </>
  )
}

export default Userprofile

