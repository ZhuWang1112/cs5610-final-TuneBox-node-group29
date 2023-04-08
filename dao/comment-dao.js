import commentModel from "./models/comment-model.js";

export const findCommentsByUserId = (userId) => commentModel.find({user: userId});
export const deleteComment = (cid) => commentModel.deleteOne({_id: cid});
export const createComment = (comment) => commentModel.create(comment);