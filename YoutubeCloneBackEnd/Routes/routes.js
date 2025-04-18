import { registerUser, login } from "../Controllers/UsersController.js";
import {
  getChannel,
  createChannel,
} from "../Controllers/ChannelsController.js";
import { addComment, getComments } from "../Controllers/CommentsController.js";
import {
  createVideos,
  getVideoById,
  getVideos,
  updateVideo,
} from "../Controllers/VideosController.js";

export const routes = (app, userVal, tokenVerify) => {
  //video links
  app.get("/getVideos", tokenVerify, getVideos);
  app.post("/createVideo", tokenVerify, createVideos);
  app.put("/updatevideo/:id", tokenVerify, updateVideo);
  app.get("getSingleVideo/:id", tokenVerify, getVideoById);
  //channel links
  app.get("/getChannel/:id", getChannel);
  app.post("/createChannel", tokenVerify, createChannel);
  //user registration links
  app.post("/registerUser", userVal, registerUser);
  app.post("/login", login);
  //comments links
  app.post("/addComment", tokenVerify, addComment);
  app.get("/getComments", tokenVerify, getComments);
};
