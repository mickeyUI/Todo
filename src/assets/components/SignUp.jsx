import React from "react";
import { useState } from "react";
import handleOnClick from "../../App";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('button acctually works');
    const res = await fetch("http://127.0.0.1:8000/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, email, password }),
    });

    const data = await res.json();

    if (res.ok && data) {
      alert("Signup success. Please login to continue.");
      handleOnClick("signIn"); // Switch to sign-in form
    } else {
      alert(data.detail); // comes from FastAPI error
    } }
  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSignup}>
        <h1 className="text-orange-700">Create Account</h1>
        <span className="text-orange-700">or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Name"

        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
