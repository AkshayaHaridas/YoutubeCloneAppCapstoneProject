import { commentsModel } from "../Models/Comments.js";
import { videoModel } from "../Models/Videos.js";
export const addComment = async (req, res) => {
  try {
    const comments = new commentsModel(req.body);
    await comments.save();
    const video = await videoModel.findOne({ videoId: req.body.videoId });
    if (!video) {
      return res.status(404).send("video not found");
    }
    video.comments.push(req.body.commentId);
    video.save();
    return res.status(201).send("created");
  } catch (error) {
    return res.status(500).send("something went wrong");
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await commentsModel.find({});
    if (!comments) {
      return res.status(404).send("not found");
    }
    return res.status(200).send(comments);
  } catch (error) {
    return res.status(500).send(error);
  }
};
