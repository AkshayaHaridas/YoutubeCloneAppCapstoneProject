import userModel from "../Models/UserRegistration.js";
import { createUser } from "../Controllers/UserInfoController.js";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    await createUser(req.body);
    res.status(201).send("user created");
  } catch (err) {
    res.status(500).send("something went wrong");
  }
};

export const login = async (req, res) => {
  try {
    if (req.body) {
      const user = await userModel.findOne({
        userName: req.body.userName,
        password: req.body.password,
      });
      if (!user) {
        return res.status(404).send("not found");
      }
      const token = jwt.sign({ userName: user.userName }, "thisissecretkey", {
        expiresIn: "24h",
      });
      res.send({ token: token });
    } else {
      res.status(401).send("bad request");
    }
  } catch (error) {
    return res.status(500).send("something went wrong");
  }
};
