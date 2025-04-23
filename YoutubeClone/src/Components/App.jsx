import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useState, createContext } from "react";

export const stateContext = createContext();
function App() {
  // to set the sidebar boolean state accessible to both header and home.
  const [click, setClick] = useState(false);
  const [user, setUser] = useState("");
  return (
    <stateContext.Provider value={{ click, setClick, user, setUser }}>
      <div className="body">
        <Header />
        <Outlet />
      </div>
    </stateContext.Provider>
  );
}

export default App;
