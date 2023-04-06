import {Mongoose} from "mongoose";
import userSchema from "./user-schema";
import jwt from "jsonwebtoken";

const commentSchema = new Mongoose.Schema({
    playlist: { type: Mongoose.Schema.Types.ObjectId, ref: "playlist", required: true },
    user: { type: Mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    content: { type: String, required: true },
},{collection: "comments"});

userSchema.method.generateAuthToken = function () {
    // return token
    return jwt.sign(
        {_id: this._id, name: this.name, isAdmin: this.isAdmin},
        process.env.JWTPRIVATEKEY,
        {expiresIn: "7d"});
}
 export default commentSchema;