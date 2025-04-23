import { commentsModel } from "../Models/Comments.js";
import { videoModel } from "../Models/Videos.js";
export const createVideos = async (req, res) => {
  try {
    const video = new videoModel(req.body);
    const result = await video.save();
    console.log("checking on the result after saving a video", result);
    return res.status(201).send("video added successfully");
  } catch (error) {
    return res.status(500).json({ message: `some thing went wrong ${error}` });
  }
};
export const getVideos = async (req, res) => {
  try {
    const videos = await videoModel.find();
    if (!videos) {
      return res.status(404).send("no videos found");
    }
    return res.status(200).send(videos);
  } catch (error) {
    return res.status(500).json({ message: `some thing went wrong ${error}` });
  }
};
export const getVideoById = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await videoModel.findOne({ videoId: id });
    if (!video) {
      return res.status(404).send("video not found");
    }
    return res.status(200).send(video);
  } catch (error) {
    return res.status(500).json({ message: `some thing went wrong ${error}` });
  }
};
export const updateVideo = async (req, res) => {
  try {
    const video = await videoModel.findOne({ videoId: req.params.id });
    if (!video) {
      return res.status(404).send("not found");
    }
    const arr = Object.keys(req.body);
    arr.forEach(async (x) => {
      if (x !== "comments") {
        video[x] = req.body[x];
      }
      if (x == "comments") {
        const comments = await commentsModel.find();
        if (!comments) {
          video[x] = [];
        }
        video[x] = comments;
      }
    });
    await video.save();
  } catch (error) {
    return res.status(500).json({ message: `some thing went wrong ${error}` });
  }
};
