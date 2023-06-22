import React, { useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "../store/auth-context";
import { Link } from "react-router-dom";
const Navbar = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <nav className="navigation">
        <Link to="/home" className="brand-name">
          <strong>Expense Tracker</strong>
        </Link>

        <div className="navigation-menu">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            {!authCtx.isLoggedIn ? (
              <li>
                <Link to="/login">Login</Link>
              </li>
            ) : (
              <></>
            )}
            {authCtx.isLoggedIn ? (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            ) : (
              <></>
            )}
            {authCtx.isLoggedIn ? (
              <li>
                <Link to="/expense">Expense</Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
        {authCtx.isLoggedIn ? (
          <div style={{ marginRight: "1.5rem" }}>
            <button onClick={authCtx.Logout}>Sign out</button>
          </div>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
};

export default Navbar;
