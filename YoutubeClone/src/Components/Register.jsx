import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [input, setInput] = useState({});
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  //fetch api to register user

  async function submitForm(e) {
    try {
      if (!input.email || !input.userName || !input.password) {
        setErr("All the fields are mandatory");
        return;
      }
      e.preventDefault();
      const response = await fetch("http://localhost:2288/registerUser", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
      });
      if (response.ok) {
        console.log(await response.json());
        navigate("/login");
      } else {
        throw new Error("error in response", response.status);
      }
    } catch (err) {
      console.log(err, "error while saving registered user");
    }
  }
  function onTextChange(e) {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <form className="login register">
      <label>Enter your email</label>
      <input
        type="text"
        name="email"
        value={input.email || ""}
        onChange={(e) => onTextChange(e)}
        required
      />
      <label>Enter a Username</label>
      <input
        type="text"
        name="userName"
        value={input.userName || ""}
        onChange={(e) => onTextChange(e)}
        required
      />
      <label>Enter a Password</label>
      <input
        type="password"
        name="password"
        value={input.password || ""}
        onChange={(e) => onTextChange(e)}
        required
      />
      <button onClick={(e) => submitForm(e)}>Submit</button>
      {err ? <div className="err">{err}</div> : ""}
    </form>
  );
};
