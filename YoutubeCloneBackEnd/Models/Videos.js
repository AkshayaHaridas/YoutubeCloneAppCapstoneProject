import mongoose from "mongoose";
const videoSchema = mongoose.Schema({
  videoId: {
    required: true,
    unique: true,
    type: "string",
  },
  title: {
    required: true,
    type: "string",
  },
  thumbnailUrl: {
    required: true,
    type: "string",
  },
  description: {
    required: true,
    type: "string",
  },
  channelId: {
    required: true,
    type: "string",
  },
  uploader: {
    required: true,
    type: "string",
  },
  views: {
    required: true,
    type: "string",
  },
  likes: {
    required: true,
    default: "0",
    type: "string",
  },
  dislikes: {
    required: true,
    default: "0",
    type: "string",
  },
  uploadDate: {
    required: true,
    type: "string",
  },
  comments: {
    type: "array",
  },
  category: {
    type: "string",
  },
});
export const videoModel = mongoose.model("videos", videoSchema);
