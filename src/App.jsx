import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./style.css";
import SignInForm from "./assets/components/SignIn";
import SignUpForm from "./assets/components/SignUp";
import MainUI from "./pages/mainUI";

export default function App() {
  const navigate = useNavigate();
  const [type, setType] = useState("signIn");

  const handleLogin = () => {
    navigate("/main");
  };

  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  const authPanel = (
    <div className="App">
      <h2>Sign in/up Form</h2>
      <div className={containerClass} id="container">
        <SignUpForm onSuccess={handleLogin} />
        <SignInForm onSuccess={handleLogin} />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>login to access your tasks</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello user!</h1>
              <p>Register to start your journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={authPanel} />
      <Route path="/main" element={<MainUI />} />
    </Routes>
  );
}
