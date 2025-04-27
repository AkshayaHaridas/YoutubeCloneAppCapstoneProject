import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/Components/Home";
import { CreateChannel } from "./Components/CreateChannel.jsx";
import { Login } from "./Components/Login.jsx";
import { Register } from "./Components/Register.jsx";
import { ViewChannel } from "./Components/ViewChannel.jsx";
import { VideoDisplay } from "./Components/VideoDisplay.jsx";
import SignInPage from "./Components/SignInPage.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SignInPage />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/createChannel",
        element: <CreateChannel />,
      },
      {
        path: "/VideoDisplay/:id",
        element: <VideoDisplay />,
      },
      {
        path: "/ViewChannel",
        element: <ViewChannel />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
