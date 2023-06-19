import React, { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { Link } from "react-router-dom";
const Navbar = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
    <nav
      style={{ display: "flex", justifyContent: "space-between" }}
      className="navbar navbar-expand-lg navbar-dark bg-dark"
    >
      <h5 style={{ marginLeft: "1rem" }} className="navbar-brand">
        Expense Tracker
      </h5>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/home" className="nav-link active" aria-current="page">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page">About us</Link>
        </li>
      {!authCtx.isLoggedIn ?  <li className="nav-item">
          <Link to="/login" className="nav-link active" aria-current="page">Login</Link>
        </li> : <></>}
       {authCtx.isLoggedIn ? <li className="nav-item">
          <Link to="/profile" className="nav-link active" aria-current="page">Profile</Link>
        </li> : <></>}
          </ul>
      <div style={{ marginRight: "1.5rem"}}>
        {authCtx.isLoggedIn ? (
          <button onClick={authCtx.Logout}>Sign out</button>
        ) : (
          <></>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
