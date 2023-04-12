import commentModel from "./models/comment-model.js";
import userModel from "./models/user-model.js";

export const findCommentsByUserId = (userId) =>
  commentModel.find({ user: userId });
export const deleteComment = (cid) => commentModel.deleteOne({ _id: cid });
export const createComment = (comment) => commentModel.create(comment);
export const findCommentsByPlaylist = (pid) => {
  return commentModel
    .find({ playlist: pid })
    .populate("user", ["img", "userName"], userModel);
};