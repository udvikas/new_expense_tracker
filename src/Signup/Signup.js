import React, { useContext, useRef, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { AuthContext } from "../store/auth-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // const enteredEmail = emailInputRef.current.value;
    // const enteredPassword = passwordInputRef.current.value;
    // const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    let url;
    if (isLogin) {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAN6DmGKUsukndPy4YuaPtcJOezDqk3XXk";

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
          authContext.Login(data.idToken);
          navigate("/userProfile");
          console.log("successfully signedin!");
          localStorage.getItem("tokenID");
        })
        .catch((err) => console.log("err", err.message));
    } else {
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAN6DmGKUsukndPy4YuaPtcJOezDqk3XXk";
      axios
        .post(url, {
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword,
          returnSecureToken: true,
        })
        .then((res) => {
          if (res.ok) {
            return res.data;
          } else{
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          }
        })
        .then((data) => {
          authContext.Login(data.idToken);
          localStorage.setItem("tokenID", data.idToken);
          console.log(data);
          console.log("successfully Signedup!");
          navigate("/userProfile");
        })
        .catch((err) => console.log("err", err.message));
    }
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    {isLogin ? "Login" : "Sign Up"}
                  </h2>
                  <div className="mb-3">
                    {!isLogin ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            Email address
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            ref={emailInputRef}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword1"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={passwordInputRef}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword2"
                        >
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
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
                          <Form.Label className="text-center">
                            Email address
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            ref={emailInputRef}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword1"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={passwordInputRef}
                          />
                        </Form.Group>
                       {/* <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword2"
                        >
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={confirmPasswordInputRef}
                          />
                        </Form.Group>  */}
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
                            {/* { isLogin ? "Signup" : "Login With Existing Account"} */}
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
      </Container>
    </div>
  );
}
