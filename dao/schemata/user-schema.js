import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isVip: { type: Boolean, default: false },
}, { collection: "users" });

export default userSchema;