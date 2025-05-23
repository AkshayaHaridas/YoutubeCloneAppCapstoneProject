import { registerUser, login } from "../Controllers/UsersController.js";
import {
  getChannel,
  getChannels,
  getChannelById,
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
  //userInfo links
  app.get("/user", tokenVerify, getUser);
  //video links
  app.get("/getVideos", getVideos);
  app.post("/createVideo", createVideos);
  app.put("/updatevideo/:id", tokenVerify, updateVideo);
  app.get("/getSingleVideo/:id", getVideoById);
  //channel links
  app.get("/getChannels", getChannels);
  app.get("/getChannel/:id", getChannel);
  app.get("/getChannelById/:id", getChannelById);

  app.post("/createChannel", createChannel);
  //user registration links
  app.post("/registerUser", userVal, registerUser);
  app.post("/login", login);
  //comments links
  app.post("/addComment", addComment);
  app.get("/getCommentById/:id", getCommentById);
};
