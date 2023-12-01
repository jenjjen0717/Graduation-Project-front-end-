import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

const SignUpComponent = (props) => {
  const navigate = useNavigate();

  let { currentUser, setCurrentUser } = props;
  let [isActive, setIsActive] = useState(false);
  let [lMessage, setLMessage] = useState("");
  let [rMessage, setRMessage] = useState("");
  let [loginEmail, setLoginEmail] = useState("");
  let [loginPw, setLoginPw] = useState("");
  let [registerUsername, setRegisterUsername] = useState("");
  let [registerEmail, setRegisterEmail] = useState("");
  let [registerPw, setRegisterPw] = useState("");

  const back = () => {
    navigate("/");
  };

  const handleChangeLEmail = (e) => {
    setLoginEmail(e.target.value);
  };
  const handleChangeLPassword = (e) => {
    setLoginPw(e.target.value);
  };

  const handleLogin = () => {
    AuthService.login(loginEmail, loginPw)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        setCurrentUser(AuthService.getCurrentUser());
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.response);
        setLMessage(error.response.data);
      });
  };

  const handleChangeRUsername = (e) => {
    setRegisterUsername(e.target.value);
  };
  const handleChangeREmail = (e) => {
    setRegisterEmail(e.target.value);
  };
  const handleChangeRPassword = (e) => {
    setRegisterPw(e.target.value);
  };

  const handleRegister = () => {
    AuthService.register(registerUsername, registerEmail, registerPw)
      .then(() => {
        window.alert("success");
        navigate("/signUp");
      })
      .catch((error) => {
        setRMessage(error.response.data);
      });
  };

  const handleSwitchLogin = () => {
    setIsActive(false);
  };

  const handleSwitchRegister = () => {
    setIsActive(true);
  };

  return (
    <div>
      <div className="loginPage">
        <div className="login-bg" alt=""></div>
        <section className="login-register">
          <div className={`box ${isActive ? "switch-page" : ""}`}>
            <a onClick={back} className="backBtn">
              <i className="bx bx-arrow-back"></i>
            </a>
            <div className="form login">
              <h2>Login</h2>
              <div className="formBox">
                {lMessage && <h5 className="errorMsg">{lMessage}</h5>}
                <div className="input-box">
                  <input
                    onChange={handleChangeLEmail}
                    className="loginEmail"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    onChange={handleChangeLPassword}
                    className="loginPW"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <button className="submitBtn" onClick={handleLogin}>
                  Submit
                </button>
                <div className="switch">
                  <p>Don't have an account?</p>
                  <Link
                    className="switch-to-register"
                    onClick={handleSwitchRegister}
                    to="#"
                  >
                    Register Now.
                  </Link>
                </div>
              </div>
            </div>

            <div className="form register">
              <h2>Register</h2>
              <div className="formBox">
                {rMessage && <h5 className="errorMsg">{rMessage}</h5>}
                <div className="input-box">
                  <input
                    onChange={handleChangeRUsername}
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    onChange={handleChangeREmail}
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    onChange={handleChangeRPassword}
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                  />
                </div>
                <button className="submitBtn" onClick={handleRegister}>
                  Register
                </button>
                <div className="switch">
                  <p>Already have an account?</p>
                  <Link
                    className="switch-to-login"
                    onClick={handleSwitchLogin}
                    to="#"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUpComponent;
