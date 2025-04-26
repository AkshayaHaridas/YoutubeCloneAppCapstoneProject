import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      if (!username || !password) {
        setErr("enter your username and password");
        return;
      } else {
        const result = await fetch("http://localhost:2288/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userName: username, password: password }),
        });
        if (result.ok) {
          const resultParsed = await result.json();
          if (resultParsed) {
            localStorage.setItem("token", resultParsed.token);

            navigate("/home");
          }
        } else {
          if (result.status === 404) {
            setErr("invalid username or password");
          }
          // throw new Error("error in response", result.statusText);
        }
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
        {err ? <div className="errMessage">{err}</div> : null}
      </div>

      <div className="btnDIv">
        <button onClick={handleLogin}>Login</button>
      </div>
      <div className="registerDiv">
        <Link to="/register" className="linkReg">
          Register a new user instead
        </Link>
      </div>
    </div>
  );
};
