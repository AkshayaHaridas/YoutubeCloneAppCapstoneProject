import { registerUser, login } from "../Controllers/UsersController.js";
import {
  getChannel,
  getChannels,
  createChannel,
} from "../Controllers/ChannelsController.js";
import {
  addComment,
  getCommentById,
} from "../Controllers/CommentsController.js";
import {
  createVideos,
  getVideoById,
  getVideos,
  updateVideo,
} from "../Controllers/VideosController.js";
import { getUser } from "../Controllers/UserInfoController.js";

export const routes = (app, userVal, tokenVerify) => {
  //video links
  app.get("/getVideos", getVideos);
  app.post("/createVideo", createVideos);
  app.put("/updatevideo/:id", tokenVerify, updateVideo);
  app.get("/getSingleVideo/:id", getVideoById);
  //channel links
  app.get("/getChannels", getChannels);
  app.get("/getChannel/:id", getChannel);
  app.post("/createChannel", tokenVerify, createChannel);
  //user registration links
  app.post("/registerUser", userVal, registerUser);
  app.post("/login", login);
  //comments links
  app.post("/addComment", addComment);
  app.get("/getCommentById/:id", getCommentById);
  //userInfo links
  app.get("/user/:username/:password", tokenVerify, getUser);
};
