import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
      // validate
    gender: { type: String, required: true, enum: ['male', 'female', 'non-binary']},
    isAdmin: { type: Boolean, default: false },
    isVip: { type: Boolean, default: false },
    playlistsCount: { type: Number, default: 0 },
    createTime: { type: Date, default: Date.now },
  },
  { collection: "users" }
);

userSchema.method.generateAuthToken = function () {
    // return token
    return jwt.sign(
        {_id: this._id, name: this.name, isAdmin: this.isAdmin},
        process.env.JWTPRIVATEKEY,
        {expiresIn: "7d"});
}

export default userSchema;