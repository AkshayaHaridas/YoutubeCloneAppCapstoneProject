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

export const getCommentById = async (req, res) => {
  try {
    const comment = await commentsModel.findOne({ commentId: req.params.id });
    if (!comment) {
      return res.status(404).send("not found");
    }
    return res.status(200).send(comment);
  } catch (error) {
    return res.status(500).send(error);
  }
};
