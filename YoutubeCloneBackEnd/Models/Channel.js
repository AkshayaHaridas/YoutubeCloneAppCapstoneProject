import mongoose from "mongoose";
const channelSchema = mongoose.Schema({
  channelId: {
    type: "string",
    required: true,
    unique: true,
  },
  channelName: {
    required: true,
    type: "string",
  },
  owner: {
    required: true,
    type: "string",
  },
  description: {
    required: true,
    type: "string",
  },
  channelBanner: {
    required: true,
    type: "string",
  },
  subscribers: {
    required: true,
    type: "string",
  },
  videos: {
    required: true,
    type: "array",
  },
});

export const channelModel = mongoose.model("channels", channelSchema);
