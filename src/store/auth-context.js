import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  Login: (token) => {},
  Logout: () => {},
});

export const AuthContextProvider = (props) => {
  const intitialToken = localStorage.getItem("tokenID");
  const [token, setToken] = useState(intitialToken);
  const navigate = useNavigate();
  const userIsLoggedIn = !!token; //true

  const LoginHandler = (token) => {
    setToken(token);
    localStorage.setItem("tokenID", token);
    navigate("/");
  };

  const LogoutHandler = () => {
    localStorage.removeItem("tokenID");
    setToken(null);
    console.log("logout is done");
    navigate("/");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    Login: LoginHandler,
    Logout: LogoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
