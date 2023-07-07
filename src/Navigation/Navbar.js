import React from "react";
import "./Navbar.css";
// import { AuthContext } from "../store/auth-context";
import { authActions } from "../ReduxTookit/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  // const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    // localStorage.removeItem('tokenID');
    navigate("/")
  };
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

              {!isAuth && <li>
                <Link to="/login">Login</Link>
              </li>}

              {isAuth && <li>
                <Link to="/profile">Profile</Link>
              </li>}

              {isAuth && <li>
                <Link to="/expense">Expense</Link>
              </li>}
            </ul>
          </div>

          {isAuth && <div style={{ marginRight: "1.5rem" }}>
            <button onClick={logoutHandler}>Sign out</button>
          </div>}
        </nav>
    </>
  );
};

export default Navbar;
