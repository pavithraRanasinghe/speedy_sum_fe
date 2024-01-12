import React from "react";
import { Link } from "react-router-dom";
import { FloatingLabel, Form, Button } from "react-bootstrap";

import "./css/Login.css";

const LogIn = () => {

  return (
    <div>
      <div className="login-container">
        {/* <img src={logoName} alt="Profile" className="logo_name" /> */}

        <h2 className="welcome">WELCOME BACK</h2>
        <div className="logo">
          {/* <img src={logo} alt="Profile" className="profile_logo" /> */}
        </div>
        <Form className="m-3">
          <FloatingLabel
            controlId="username"
            label="Username"
            className="mb-3 txtInput"
          >
            <Form.Control
              type="text"
              placeholder="Username"
            />
            {/* {!isUsernameValid && (
              <p className="invalidText">Username cann't be empty</p>
            )} */}
          </FloatingLabel>
          <FloatingLabel
            controlId="password"
            label="Password"
            className="mb-3 txtInput"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              // value={password}
              // onChange={handlePasswordChange}
            />
            {/* {!isPasswordValid && (
              <p className="invalidText">Password cann't be empty</p>
            )} */}
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
            <Link to={"/reset-password"} style={{ textDecoration: "none" }}>
              {" "}
              Reset
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default LogIn;
