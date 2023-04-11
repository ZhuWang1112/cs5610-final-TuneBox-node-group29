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
export const findUserByUsername = async (userName) => {
    const user = await userModel.findOne({ userName });
    return user;
};

export const findUserByCredentials = async ({username, password}) => {
    const user = await userModel.findOne({ username, password });
    return user;
};
export const findAllUsers = () => userModel.find();
export const createUser = async (user) => {
    const newUser = await userModel.create(user);
    console.log("creating new user --- user-dao")
    return newUser;
};
export const deleteUser = (userId) => userModel.deleteOne({ _id: userId });
export const updateUser = (userId, user) =>
  userModel.updateOne({ _id: userId }, { $set: user });