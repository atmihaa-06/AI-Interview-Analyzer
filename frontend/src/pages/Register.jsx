import { useState } from "react";
import axios from "axios";

function Register() {

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

    } catch {

      alert("Registration failed");

    }
  };

  return (
    <div className="auth-container">

      <h1>Register</h1>

      <input
        placeholder="Username"
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
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

      <button onClick={registerUser}>
        Register
      </button>

    </div>
  );
}

export default Register;