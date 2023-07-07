import React, { useState ,useRef} from "react";
import { useDispatch } from "react-redux";
import { Col, Button, Row,  Card, Form } from "react-bootstrap";
import { authActions } from "../ReduxTookit/authSlice";
// import { AuthContext } from "../store/auth-context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  // const authContext = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


  const submitHandler = (e) => {
    e.preventDefault();

    let url;
    if (isLogin) {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCM6g16Qv7IXnELyRQ7cS54ndvlSMyo8Y0";

      axios
        .post(url, {
          email: enteredEmail,
          password: enteredPassword,
          // confirmPassword: enteredConfirmPassword,
          returnSecureToken: true,
        })
        .then((res) => {
          if (res.status === 200) {
            return res.data;
          } else{
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          }
        })
        .then((data) => {
          dispatch(authActions.login({ tokenID: data.idToken, email: enteredEmail}));
          navigate("/userProfile");
          console.log("successfully signedin!");
        })
        .catch((err) => console.log("err", err.message));
    } else {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCM6g16Qv7IXnELyRQ7cS54ndvlSMyo8Y0";
      axios
        .post(url, {
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword,
          returnSecureToken: true,
        })
        .then((res) => {
          if (res.status === 200) {
            return res.data;
          } else{
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          }
        })
        .then((data) => {
          dispatch(authActions.login({ tokenID: data.idToken, email: enteredEmail}));
          console.log(data);
          console.log("successfully Signedup!");
          navigate("/userProfile");
        })
        .catch((err) => console.log("err", err.message));
    }
  };

  return (
      <div style={{marginTop:"-2rem"}}>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-1 mt-md-4">
                  <h2 className="fw-bold mb-1 text-center text-uppercase ">
                    {isLogin ? "Login" : "Sign Up"}
                  </h2>
                  <div className="mb-1">
                    {!isLogin ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-1" controlId="formBasicEmail">
                          <label className="text-center">
                            Email address
                          </label>
                          <Form.Control
                            type="email"
                            ref={emailInputRef}
                          />

                        </Form.Group>

                        <Form.Group
                          className="mb-1"
                          controlId="formBasicPassword1"
                        >
                          <label>Password</label>
                          <Form.Control
                            type="password"
                            ref={passwordInputRef}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-1"
                          controlId="formBasicPassword2"
                        >
                          <label>Confirm Password</label>
                          <Form.Control
                            type="password"
                            ref={confirmPasswordInputRef}
                          />
                        </Form.Group>

                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            {isLogin ? "Login" : "Create Account"}
                          </Button>
                        </div>
                        <br />
                      </Form>
                    ) : (
                      <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <label className="text-center">
                            Email address
                          </label>
                          <Form.Control
                            type="email"
                            ref={emailInputRef}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword1"
                        >
                          <label>Password</label>
                          <Form.Control
                            type="password"
                            ref={passwordInputRef}
                          />
                        </Form.Group>
                        <Link style={{ textDecoration: "none" }} to="/forgot"><p style={{color:"#0d6efd", textAlign:"center"}}><strong>Forgot Password</strong></p></Link>
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            {isLogin ? "Login" : "Create Account"}
                          </Button>
                        </div>
                        <br />
                      </Form>
                    )}
                    <div className="mt-3">
                      {isLogin ? (
                        <h6 className="mb-0  text-center">
                          Don't have an account?? <hr />
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={switchAuthModeHandler}
                          >
                            Signup
                          </Button>
                        </h6>
                      ) : (
                        <h6 className="mb-0  text-center">
                          Already have an account?? <hr />
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={switchAuthModeHandler}
                          >
                            {/* { isLogin ? "Signup" : "Login With Existing Account"} */}
                            Login
                          </Button>
                        </h6>
                      )}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
  );
}
