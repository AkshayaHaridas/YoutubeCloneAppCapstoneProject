import { channelModel } from "../Models/Channel.js";
import userInfoModel from "../Models/UserInfo.js";
export const createChannel = async (req, res) => {
  try {
    const channelId = `Ch${Math.floor(Math.random() * 9999)}`;
    const channel = new channelModel({ ...req.body, channelId });
    const user = await userInfoModel.findOne({ userId: req.body.owner });
    if (!user) {
      return res.status(404).send("user not found");
    }
    await user.channels.push(channelId);
    await user.save();
    await channel.save();
    return res.status(201).json({ message: "channel cretaed successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getChannel = async (req, res) => {
  try {
    const _channelId = req.params.id;
    if (_channelId) {
      const channel = await channelModel.findOne({ channelId: _channelId });
      if (!channel) {
        return res.status(404).send("channel not found");
      }
      return res.status(200).send(channel);
    }
    return res.status(401).send("No parameters");
  } catch (error) {
    return res.status(500).send("something went wrong");
  }
};

export const getChannels = async (req, res) => {
  try {
    const channel = await channelModel.find();
    if (!channel) {
      return res.status(404).send("channel not found");
    }
    return res.status(200).send(channel);
  } catch (error) {
    return res.status(500).send("something went wrong");
  }
};
export const getChannelById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const channels = await channelModel.find({ owner: userId });
      if (!channels) {
        return res.status(404).send("channel not found");
      }
      return res.status(200).send(channels);
    }
    return res.status(401).send("No parameters");
  } catch (error) {
    return res.status(500).send("something went wrong");
  }
};
