import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navigation/Navbar";
import Signup from "./Signup/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import {useContext} from 'react'
import { AuthContext } from "./store/auth-context";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Userprofile from "./userProfile/Userprofile";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <Navbar />
   
      <Routes>
        {!authCtx.isLoggedIn && <Route path="/login" element=<Signup /> />}
        <Route path="/home" element=<Home/>/>
        <Route path="/" element={<Navigate replace to="/home"/>}/>
        <Route path="/userProfile" element=<Userprofile/>/>
        <Route path="/profile" element=<Profile/>/>
        <Route path="/login" element=<Signup/>/>
      </Routes>
    </div>
  );
}

export default App;
