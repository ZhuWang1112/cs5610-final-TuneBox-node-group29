import userModel from "./models/user-model.js";

// paginate query
export const findUsersPagination = (page, limit) => {
    const skipIndex = (page - 1) * limit;
    // console.log(page);
    // console.log(limit);
    return userModel.find().skip(skipIndex).limit(limit);
}
export const findLastPageUsers = async (limit) => {
    const totalUsers = await userModel.count();
    const lastPage = Math.ceil(totalUsers / limit);
    return findUsersPagination(lastPage, limit);
}
export const findUserByPartialName = (userName) =>
    userModel.find({ userName: { $regex: userName, $options: "i" } });
export const findUserByName = (userName) =>
  userModel.findOne({ userName: userName });
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
export const countUsers = () => userModel.countDocuments({isDeleted: false});
export const updateUser = async (userId, user) => {
    await userModel.updateOne({ _id: userId }, { $set: user });
    const updatedUser = await userModel.findOne({ _id: userId });
    return updatedUser;
};

// show on home page
export const findTopUsers = () => userModel.find().limit(5);
export const countVipUsers = () => userModel.countDocuments({ isVip: true, isDeleted: false });
export const countFemaleUsers = () => userModel.countDocuments({ gender: "female", isDeleted: false });
export const countMaleUsers = () => userModel.countDocuments({gender: "male", isDeleted: false });
