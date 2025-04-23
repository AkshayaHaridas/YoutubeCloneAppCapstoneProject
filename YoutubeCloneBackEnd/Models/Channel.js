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
    type: "string",
  },
  subscribers: {
    type: "string",
    default: "",
  },
  videos: {
    type: "array",
  },
});

export const channelModel = mongoose.model("channels", channelSchema);
