import mongoose from "mongoose";
import userSchema from "../schemata/user-schema";

const userModel = mongoose.model('userModel', userSchema);
export default userModel;