
import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
    {
        name: { type: String },
        img: { type: String, default: "/images/profile-avatar.jpeg" },
        api : { type: String },
        __v: { type: Number, default: 0 },
    },
    { collection: "artists" }
);



export default artistSchema;