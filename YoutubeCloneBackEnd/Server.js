import express from "express";
import { routes } from "./Routes/routes.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import userModel from "./Models/UserRegistration.js";
import cors from "cors";

const app = express();
app.listen("2288", () => {
  console.log("server created successfully");
});
// to permit other api that I use (here frontend api) to connect to this api
app.use(cors());
//json parse middleware
app.use(express.json());

// create a mongoose instance to connect to
mongoose
  .connect(
    "mongodb+srv://internshala:internshala12345@youtubeclonecluster.4oq06ed.mongodb.net/YoutubeConeDb"
  )
  .then(() => console.log("connected to database"))
  .catch((err) => console.log("something went wrong", err));

// user registration Validation middleware
const userValidate = async (req, res, next) => {
  try {
    if (req.body) {
      const user = new userModel(req.body);
      await user.validate();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("somthing went wrong");
  }
  next();
};
//verify token
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, "thisissecretkey", (error, payload) => {
    if (error) {
      return res.status(403).send("invalid jwt token");
    }
    req.payload = payload;
    next();
  });
};
routes(app, userValidate, verifyToken);
