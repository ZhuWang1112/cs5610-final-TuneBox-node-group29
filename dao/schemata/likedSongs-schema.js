import mongoose from "mongoose";

const likedSongsSchema = new mongoose.Schema(
  {
      user_id: { type: String, required: true },
      followeeList: { type: Array, default: [] },
  },
  { collection: "likedSongs" }
);
export default likedSongsSchema;