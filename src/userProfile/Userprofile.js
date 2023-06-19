import React from 'react'
import { Link } from 'react-router-dom'
const Userprofile = () => {
  return (
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
  )
}

export default Userprofile

