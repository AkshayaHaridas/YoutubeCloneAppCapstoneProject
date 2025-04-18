import userInfoModel from "../Models/UserInfo.js";

export const createUser = async (user) => {
  try {
    console.log(user);
    const userId = `${user.userName.slice(0, 4)}${Math.floor(
      Math.random() * 9999
    )}`;
    const _user = new userInfoModel({ ...user, userId });
    console.log(user);
    console.log(_user);

    await _user.save();
    return "user created";
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (user, id) => {
  try {
    const _user = await userInfoModel.findOne({ userId: id });
    const arr = Object.keys(user);
    arr.forEach((x) => {
      _user[x] = user[x];
    });
    await _user.save();
  } catch (error) {
    return res.status(500).send("something went wrong");
  }
};
