import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [input, setInput] = useState({});
  const navigate = useNavigate();
  //fetch api to register user

  async function submitForm(e) {
    try {
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
    <form>
      <label>Enter your email</label>
      <input
        type="text"
        name="email"
        value={input.email || ""}
        onChange={(e) => onTextChange(e)}
        required
      />
      <label>Username</label>
      <input
        type="text"
        name="userName"
        value={input.userName || ""}
        onChange={(e) => onTextChange(e)}
        required
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={input.password || ""}
        onChange={(e) => onTextChange(e)}
        required
      />
      <button onClick={(e) => submitForm(e)}>Submit</button>
    </form>
  );
};
