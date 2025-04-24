import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();
  async function handleLogin() {
    try {
      if (!username || !password) {
        setMessage(!message);
      }
      const result = await fetch("http://localhost:2288/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userName: username, password: password }),
      });
      const resultParsed = await result.json();
      if (resultParsed) {
        localStorage.setItem("token", resultParsed.token);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="login">
      <div className="loginTitle">
        <h1>Login</h1>
      </div>
      <div>
        <label>username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="btnDIv">
        {message ? (
          <div className="errMessage">enter your username and password</div>
        ) : null}
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className="registerDiv">
        <Link to="/register" className="linkReg">
          Register user instead
        </Link>
      </div>
    </div>
  );
};
