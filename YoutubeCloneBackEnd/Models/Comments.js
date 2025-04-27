import mongoose from "mongoose";
const commentsSchema = mongoose.Schema({
  commentId: {
    required: true,
    type: "string",
  },
  userId: {
    required: true,
    type: "string",
  },

  text: {
    required: true,
    type: "string",
  },
  timestamp: {
    required: true,
    type: "string",
  },
  videoId: {
    required: true,
    type: "string",
  },
});
export const commentsModel = mongoose.model("comments", commentsSchema);
