import mongoose from "mongoose";
import commentSchema from "../schemata/comment-schema";

const commentModel = mongoose.model("commentModel", commentSchema);
export default commentModel;