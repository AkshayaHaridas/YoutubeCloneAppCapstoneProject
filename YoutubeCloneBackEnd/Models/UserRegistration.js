import mongoose from "mongoose";
const userSchema = mongoose.Schema({
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
});

const userModel = mongoose.model("userRegistration", userSchema);
export default userModel;
