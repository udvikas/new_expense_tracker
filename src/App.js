import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navigation/Navbar";
import Signup from "./Signup/Signup";
import { Route, Routes } from "react-router-dom";
import {useContext} from 'react'
import { AuthContext } from "./store/auth-context";
import Home from "./Home/Home";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <Navbar />
      <Routes>
        {!authCtx.isLoggedIn && <Route path="/" element=<Signup /> />}
        <Route path="/home" element=<Home/>/>
      </Routes>
    </div>
  );
}

export default App;
