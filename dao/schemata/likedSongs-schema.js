import mongoose from "mongoose";

const likedSongsSchema = new mongoose.Schema(
  {
      user_id: { type: String, required: true },
      likedSongs: { type: Array, default: [] },
  },
  { collection: "likedSongs" }
);
export default likedSongsSchema;