import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navigation/Navbar";
import Signup from "./Signup/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "./store/auth-context";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Userprofile from "./userProfile/Userprofile";
import Forgot from "./Forgot/Forgot";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import "./index.css";
import About from "./About/About";
import { useSelector } from "react-redux";
function App() {
  // const authCtx = useContext(AuthContext);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      <Navbar />
      <Routes>
        {isAuth && <Route path="/login" element=<Signup /> />}
        <Route path="/home" element=<Home /> />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/userProfile" element=<Userprofile /> />
        <Route path="/profile" element=<Profile /> />
        <Route path="/login" element=<Signup /> />
        <Route path="/forgot" element=<Forgot /> />
        <Route path="/expense" element=<ExpenseForm /> />
        <Route path="/about" element=<About/>/>
      </Routes>
    </div>
  );
}

export default App;
