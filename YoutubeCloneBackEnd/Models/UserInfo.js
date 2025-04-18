import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  userId: {
    type: "string",
    required: true,
  },
  userName: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  avatar: {
    type: "string",
  },
  channels: {
    type: "array",
  },
});

const userInfoModel = mongoose.model("userInfo", userSchema);
export default userInfoModel;
