import mongoose from "mongoose";
// import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, default: "empty-email" },
    password: { type: String, required: true },
    gender: { type: String, default:"other" },
    isAdmin: { type: Boolean, default: false },
    isVip: { type: Boolean, default: false },
    playlistsCount: { type: Number, default: 0 },
  },
  { collection: "users" }
);

// userSchema.method.generateAuthToken = function () {
//     // return token
//     return jwt.sign(
//         {_id: this._id, name: this.name, isAdmin: this.isAdmin},
//         process.env.JWTPRIVATEKEY,
//         {expiresIn: "7d"});
// }

export default userSchema;