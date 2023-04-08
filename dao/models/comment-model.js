import mongoose from "mongoose";
import commentSchema from "../schemata/comment-schema.js";

const commentModel = mongoose.model("commentModel", commentSchema);
export default commentModel;