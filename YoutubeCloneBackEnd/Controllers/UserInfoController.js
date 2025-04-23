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
    res.status(500).json({ message: "something went wrong" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userInfoModel.findOne({
      userName: req.params.username,
      password: req.params.password,
    });
    if (!user) {
      return res.status(404).send("user not found");
    }
    return res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};
