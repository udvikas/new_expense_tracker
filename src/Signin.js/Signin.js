import React, { useContext, useRef } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { AuthContext } from '../store/auth-context';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Signin() {
    const navigate = useNavigate();
    // const [ isLogin, setIsLogin ] = useState(true);
    const authContext = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    // const switchAuthModeHandler = () => {
    //     setIsLogin(prevState => !prevState);
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        // let url;
        // if(isLogin) {
        //     url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAN6DmGKUsukndPy4YuaPtcJOezDqk3XXk";
        // } else {
        //     url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAN6DmGKUsukndPy4YuaPtcJOezDqk3XXk";
        // }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAN6DmGKUsukndPy4YuaPtcJOezDqk3XXk";

       axios.post(url, {
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken: true,
        }).then((res) => {
            if (res.status !== 200) {
              let errorMessage = "Authentication failed";
              throw new Error(errorMessage);
            }
            return res.data;
          }).then((data) => {
            authContext.Login(data.idToken);
            navigate('/home');
            console.log(data);
            console.log('successfully signin!');
          }).catch(errors => {
            console.log('error', errors.message)
            alert("Wrong Email/Password");
          });
    }


  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
          <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Sign in</h2>
                  <div className="mb-3">
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailInputRef} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword1"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordInputRef} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login 
                        </Button>
                      </div><br/>
                      {/* <div className="d-grid">
                        <Button variant="primary" type="submit" onClick={switchAuthModeHandler}>
                          { isLogin ? "Create Account" : "Login With Existing Account"}
                        </Button>
                      </div> */}
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      Don't have an account??{" "}
                        <Link to="/" className="text-primary fw-bold">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
