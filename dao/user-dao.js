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
export const findUserbyName = (userName) =>
  userModel.findOne({ userName: userName });
export const findUserById = (id) => userModel.findOne({ _id: id });
export const findUserByIds = (ids) => userModel.find({ _id: { $in: ids } });
export const findAllUsers = () => userModel.find();
export const createUser = (user) => userModel.create(user);
export const deleteUser = (userId) => userModel.deleteOne({ _id: userId });
export const countUsers = () => userModel.countDocuments();
export const updateUser = async (userId, user) => {
    await userModel.updateOne({ _id: userId }, { $set: user });
    const updatedUser = await userModel.findOne({ _id: userId });
    return updatedUser;
};
export const countVipUsers = () => userModel.countDocuments({ isVip: true });
export const countFemaleUsers = () => userModel.countDocuments({ gender: "female" });
export const countMaleUsers = () => userModel.countDocuments({gender: "male"})
