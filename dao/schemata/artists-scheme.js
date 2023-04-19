import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, default: "/images/profile-avatar.jpeg"},
  api: { type: String, required: true }, 
}, 
   { collection: "artists" }
);

export default artistSchema;
