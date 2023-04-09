import userModel from "./models/user-model.js";

// paginate query
export const findUsers = (page, limit) => {
    const skipIndex = (page - 1) * limit;
    return userModel.find().skip(skipIndex).limit(limit);
}
export const findUserbyName = (userName) =>
  userModel.findOne({ username: userName });
export const findUserById = (id) => userModel.findOne({ _id: id });
export const findUserByIds = (ids) => userModel.find({ _id: { $in: ids } });
export const findAllUsers = () => userModel.find();
export const createUser = (user) => userModel.create(user);
export const deleteUser = (userId) => userModel.deleteOne({ _id: userId });
export const updateUser = (userId, user) =>
  userModel.updateOne({ _id: userId }, { $set: user });