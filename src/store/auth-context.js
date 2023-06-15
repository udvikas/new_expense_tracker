import React,{useState} from "react";

export const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    Login: (token) => {},
    Logout: () => {},
})

export const AuthContextProvider = ({children}) => {
    const intitialToken = localStorage.getItem("tokenID");
    const [ token, setToken ] = useState(intitialToken);
    const userIsLoggedIn = !!token;

    const LoginHandler = (token) => {
        setToken(token)
        localStorage.setItem("tokenID", token);
    }

    const LogoutHandler = () => {
        setToken(null);
        localStorage.removeItem("tokenID");
    }

    const contextValue = {
        token: token,
        isLoggedIn:userIsLoggedIn,
        Login:LoginHandler,
        Logout:LogoutHandler,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
