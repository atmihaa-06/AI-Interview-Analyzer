import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8000/register",
        {
          username,
          email,
          password
        }
      );

      alert("Registration successful");

      navigate("/");

    } catch {

      alert("Registration failed");

    }

  };

  return (

    <div className="register-page">

      <div className="register-card">

        <h1 className="register-logo">
          Intellect<span>.AI</span>
        </h1>

        <p className="register-subtitle">
          Create Your Account
        </p>

        <input
          className="register-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="register-btn"
          onClick={registerUser}
        >
          Create Account
        </button>

        <button
          className="back-btn"
          onClick={() =>
            navigate("/")
          }
        >
          Back To Login
        </button>

      </div>

    </div>

  );

}

export default Register;