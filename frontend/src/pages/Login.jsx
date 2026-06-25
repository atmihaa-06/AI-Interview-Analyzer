import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const response = await axios.post(
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

window.location.reload();

    } catch (error) {

      alert("Invalid credentials");

    }
  };

  return (
    <div className="auth-container">

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={loginUser}>
        Login
      </button>

    </div>
  );
}

export default Login;