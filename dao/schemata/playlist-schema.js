import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    playListName: { type: String, required: true },
    description: { type: String },
    isDefault: { type: Boolean, required: true },
    songs: { type: Array, default: [] },
    img: { type: String, default: "/images/playlist-cover.jpeg" },
  },
  { collection: "playlists" }
);

export default playlistSchema;