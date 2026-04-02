import React, { useState } from "react";

function SignInForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://127.0.0.1:8000/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      localStorage.setItem("token", data.token);
      if (res.ok) {
        alert("Login success");
        
        // 2. Trigger the success callback
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      } else {
        alert(data.detail || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Is the server running?");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSignin}>
        <h1 className="text-orange-400">Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
