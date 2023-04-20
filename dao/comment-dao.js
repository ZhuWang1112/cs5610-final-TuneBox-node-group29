import commentModel from "./models/comment-model.js";
import userModel from "./models/user-model.js";

export const findCommentsByUserId = (userId) =>
  commentModel.find({ user: userId });
export const deleteComment = (obj) => commentModel.deleteMany(obj);
export const createComment = (comment) => commentModel.create(comment);
export const findCommentsByPlaylist = (pid) => {
  return commentModel
    .find({ playlist: pid })
    .populate("user", ["img", "userName", "isVip"], userModel);
};
export const findCommentNumberByPlaylist = (pid) =>
  commentModel.countDocuments({ playlist: pid });