import { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { useNavigate }
from "react-router-dom";


function Login({ onLogin }) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

const navigate = useNavigate();
  const login = async () => {

    try {

      const response =
        await axios.post(
          "http://127.0.0.1:8000/login",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      onLogin();

    } catch {

      alert("Invalid credentials");

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1>Intellect.AI</h1>

        <p>
          AI-Powered Interview Analyzer
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
        />

        <button
  className="login-btn"
  onClick={login}
>
  Login
</button>

<button
  className="register-btn"
  onClick={() => navigate("/register")}
>
  Create Account
</button>
      </div>

    </div>

  );

}

export default Login;