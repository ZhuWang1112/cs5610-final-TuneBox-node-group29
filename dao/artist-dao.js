import userModel from "./models/user-model.js";
import artistModel from "./models/artist-model.js";
import followsModel from "./models/follows-model.js";
import mongoose from "mongoose";

// paginate query
// export const findUsersPagination = (page, limit) => {
//     const skipIndex = (page - 1) * limit;
//     // console.log(page);
//     // console.log(limit);
//     return userModel.find().skip(skipIndex).limit(limit);
// }
// export const findLatestUsers = async (limit) => {
//     return userModel.find().sort({ createTime: -1 }).limit(limit);
// }
// export const findUserByPartialName = (userName) =>
//     userModel.find({ userName: { $regex: userName, $options: "i" } });

// export const findUserByName = (userName) =>
//     userModel.findOne({ userName: userName });
export const findArtistByName = async ({search}) => {
    const artist = await artistModel.findOne({name: search});
    return artist;
}



// export const findUserById = (id) => userModel.findOne({ _id: id });
// export const findUserByIds = (ids) => userModel.find({ _id: { $in: ids } });
// export const findUserByUsername = async (userName) => {
//     const user = await userModel.findOne({ userName:userName });
//     return user;
// };

// export const findUserByCredentials = async ({userName, password}) => {
//     const user = await userModel.findOne({ userName:userName, password:password });
//     return user;
// };
// export const findAllUsers = () => userModel.find();
// export const createUser = async (user) => {
//     const newUser = await userModel.create(user);
//     console.log("creating new user --- user-dao")
//     return newUser;
// };
// export const deleteUser = (userId) => userModel.deleteOne({ _id: userId });
// export const countUsers = () => userModel.countDocuments({isDeleted: false});
// export const updateUser = async (userId, user) => {
//     await userModel.updateOne({ _id: userId }, { $set: user });
//     return userModel.findOne({_id: userId});
// };

// show on home page
// export const findTopUsers = async (uid) => {
//     if (uid === null) {
//         return userModel.find({isDeleted: false}).limit(5);
//     }
//     // console.log(typeof uid);
//     const followedUserIds = await followsModel
//         .findOne({ user: uid })
//         .select("followeeList -_id")
//         .lean()
//         .exec()
//         .then((doc) => doc.followeeList);
//
//     return await userModel
//         .aggregate([
//             {
//                 $match: {
//                     $and: [
//                         { _id: { $nin: followedUserIds } },
//                         { _id: { $ne: new mongoose.Types.ObjectId(uid) } },
//                         { isDeleted: false },
//                     ],
//                 },
//             },
//             {
//                 $lookup: {
//                     from: "playlists",
//                     localField: "_id",
//                     foreignField: "user",
//                     as: "playlists",
//                 },
//             },
//             {
//                 $addFields: {
//                     numPlaylists: {$size: "$playlists"},
//                 },
//             },
//             {
//                 $sort: {
//                     numPlaylists: -1,
//                 },
//             },
//             {
//                 $limit: 5,
//             },
//         ])
//         .exec();
// }
