import mongoose from "mongoose";
import userSchema from "../schemata/user-schema.js";

const userModel = mongoose.model('users', userSchema);
export default userModel;