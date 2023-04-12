import followsModel from "./models/follows-model.js";

export const findFollows = (userId) => {
  return followsModel.find({ user_id: userId });
};

export const updateFollow = (uid, followList) =>
  followsModel.updateOne({ user_id: uid }, { $set: followList });

export const createFolloweeList = (followObject) => followsModel.create(followObject);