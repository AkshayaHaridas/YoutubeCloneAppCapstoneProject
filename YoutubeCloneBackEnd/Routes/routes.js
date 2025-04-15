import { registerUser, login } from "../Controllers/UsersController.js";
export const routes = (app, userVal, tokenVerify) => {
  app.get("", () => {});
  app.post("/registerUser", userVal, registerUser);
  app.post("/login", login);
};
