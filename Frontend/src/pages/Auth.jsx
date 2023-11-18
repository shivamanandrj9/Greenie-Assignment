import React, { useState } from "react";
import "./Auth.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const LoginComponent = ({ mode, onSubmit }) => {
  const [currentMode, setCurrentMode] = useState(mode);

  const toggleMode = () => {
    const newMode = currentMode === "login" ? "signup" : "login";
    setCurrentMode(newMode);
  };

  return (
    <div>
      <div
        className={`form-block-wrapper form-block-wrapper--is-${currentMode}`}
      ></div>
      <section className={`form-block form-block--is-${currentMode}`}>
        <header className="form-block__header">
          <h1>{currentMode === "login" ? "Welcome back!" : "Sign up"}</h1>
          <div className="form-block__toggle-block">
            <span>
              {currentMode === "login" ? "Don't" : "Already"} have an account?
              Click here &#8594;
            </span>
            <input id="form-toggler" type="checkbox" onClick={toggleMode} />
            <label htmlFor="form-toggler"></label>
          </div>
        </header>
        <LoginForm
          mode={currentMode}
          onSubmit={onSubmit}
          setCurrentMode={setCurrentMode}
        />
      </section>
    </div>
  );
};

const LoginForm = ({ mode, onSubmit, setCurrentMode }) => {
  const [, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // const [isAdmin,setIsAdmin] = useState(false);
  const handleClickSubmit = async (e) => {
    e.preventDefault();
    console.log(mode);
    console.log(userEmail, userName, userPassword, confirmPassword);
    if (mode === "login") {
      try {
        const response = await axios.post("http://localhost:3001/auth/login", {
          userName: userName,
          userPassword: userPassword,
        });
        if (response.data.success === false) {
          toast.error(
            "Invalid Email-id or passsword. Please double-check your credentials."
          );
        }
        if (response.data.userID) {
          console.log(response.data);
          // setIsAdmin(response.data.isAdmin);
          toast.success("Login Successful");
          setCookies("access_token", response.data.token);
          window.localStorage.setItem("userID", response.data.userID);
          console.log("bvakjc", response.data.isAdmin, response.data.token);
          navigate("/dashboard", {
            state: {
              isAdmin: response.data.isAdmin,
              token: response.data.token,
            },
          });
          console.log("Logged in");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      if (confirmPassword === userPassword) {
        try {
          const response = await axios.post(
            "http://localhost:3001/auth/signup",
            {
              userName: userName,
              userPassword: userPassword,
              userEmail: userEmail,
            }
          );
          if (response.data.success === false) {
            toast.error(
              "Invalid Email-id or passsword. Please double-check your credentials."
            );
          }
          if (response.data.success === true) {
            toast.success("Register Successful");
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            setCurrentMode("login");
            // console.log("Registered in");
          }
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("Passwords are not same");
      }
    }
  };

  return (
    <form onSubmit={handleClickSubmit}>
      <div className="form-block__input-wrapper">
        <div className="form-group form-group--login">
          <input
            type="text"
            id="login-username"
            label="Username"
            className="form-group__input"
            disabled={mode === "signup"}
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
          />
          <input
            type="password"
            id="login-password"
            label="Password"
            className="form-group__input"
            disabled={mode === "signup"}
            placeholder="Password"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            value={userPassword}
          />
        </div>
        <div className="form-group form-group--signup">
          <input
            type="text"
            id="signup-username"
            label="Username"
            placeholder="Username"
            className="form-group__input"
            disabled={mode === "login"}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="form-group__input"
            label="Email"
            disabled={mode === "login"}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            value={userEmail}
          />
          <input
            type="password"
            id="signup-password"
            label="Password"
            placeholder="Password"
            className="form-group__input"
            disabled={mode === "login"}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            value={userPassword}
          />
          <input
            type="password"
            id="confirm-password"
            className="form-group__input"
            placeholder="Confirm Password"
            label="Confirm Password"
            disabled={mode === "login"}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword}
          />
        </div>
      </div>
      <button className="button button--primary full-width" type="submit">
        {mode === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
};

const Auth = ({ mode, onSubmit }) => {
  return (
    <div className={`app app--is-${mode}`}>
      <LoginComponent mode={mode} onSubmit={onSubmit} />
    </div>
  );
};

export default Auth;
