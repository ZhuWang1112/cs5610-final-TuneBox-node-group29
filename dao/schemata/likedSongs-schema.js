import mongoose from "mongoose";

const likedSongsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    likedSongs: { type: Array, default: [] },
  },
  { collection: "likedSongs" }
);
export default likedSongsSchema;