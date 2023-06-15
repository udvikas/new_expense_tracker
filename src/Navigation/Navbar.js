import React, { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = () => {
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate();
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.Logout();
    console.log('successfully logged out!')

    navigate('/');
 }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <h5 style={{marginLeft:'1rem'}} className="navbar-brand">
        Expense Tracker
      </h5>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
         {!isLoggedIn && <li className="nav-item">
            <Link to="/" className="nav-link">
              Signin
            </Link>
          </li>}
        </ul>
      </div>
      {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
    </nav>
  );
};

export default Navbar;