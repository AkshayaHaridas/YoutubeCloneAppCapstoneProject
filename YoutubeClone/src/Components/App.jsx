import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useState, useEffect, createContext } from "react";

export const stateContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUser() {
      try {
        const result = await fetch("http://localhost:2288/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `jwt ${localStorage.getItem("token")}`,
          },
        });
        if (result.ok) {
          const jsonResult = await result.json();
          setUser(jsonResult);
        } else {
          console.error("failed to fetch user");
        }
      } catch (err) {
        console.log("something went wrong", err);
      }
    }
    getUser();
  }, [token]);

  // to set the sidebar boolean state accessible to both header and home.
  const [click, setClick] = useState(false);
  return (
    <stateContext.Provider value={{ click, setClick, user }}>
      <div className="body">
        <Header />
        <Outlet />
      </div>
    </stateContext.Provider>
  );
}

export default App;
