import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./css/Login.css";
import * as Constants from './../common/Constants'
import request from './../common/APIManager'
import { getUser, setUser } from "../common/PersistanceManager";

const LogIn = () => {
  const navigate = useNavigate();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPassworValid] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogIn = (event)=>{
    event.preventDefault();
    if (username.trim() === "") {
      setIsEmailValid(false);
      return;
    } else {
      setIsEmailValid(true);
    }if (password.trim() === "") {
      setIsPassworValid(false);
      return;
    } else {
      setIsPassworValid(true);
    }

    login()
  }

  const login = () => {
    const url = "user/login";
    const body = JSON.stringify({
      username: username,
      password: password,
    });
    request(url, Constants.POST, body)
      .then((response) => {
        toast.success("Login successful")
        const user = getUser();
        if(!user)
          setUser(response);
        navigate('/')
      })
      .catch((error) => {
        toast.error("Login Failed");
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  return (
    <div>
      <div className="login-container">
        {/* <img src={logoName} alt="Profile" className="logo_name" /> */}

        <h2 className="welcome">WELCOME BACK</h2>
        <div className="logo">
          {/* <img src={logo} alt="Profile" className="profile_logo" /> */}
        </div>
        <Form className="m-3" onSubmit={handleLogIn}>
          <FloatingLabel
            controlId="username"
            label="Username"
            className="mb-3 txtInput"
          >
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleEmailChange}
            />
            {!isEmailValid && (
              <p className="invalidText">Username cann't be empty</p>
            )}
          </FloatingLabel>
          <FloatingLabel
            controlId="password"
            label="Password"
            className="mb-3 txtInput"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {!isPasswordValid && (
              <p className="invalidText">Password cann't be empty</p>
            )}
          </FloatingLabel>

         <div className="btn-wrapper">
         <Button type="submit" className="mt-3 login-button">
            LOG IN
          </Button>

         </div>
          <p className="registerLink">
            Didn't have an account?
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              {" "}
              Register
            </Link>
          </p>
          <p className="registerLink">
            Forgot Password?
            {/* <Link to={"/reset-password"} style={{ textDecoration: "none" }}>
              {" "}
              Reset
            </Link> */}
          </p>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LogIn;
