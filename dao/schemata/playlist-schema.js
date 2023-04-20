import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    playListName: { type: String, default: "default-name" },
      // playListName: { type: String, required: true },
    description: { type: String },
    isDefault: { type: Boolean, default: true },
      // isDefault: { type: Boolean, required: true },
    songs: { type: Array, default: [] },
    img: { type: String, default: "/images/playlist-cover.jpeg" },
    rating: { type: Number, default: 0 },
    __v: { type: Number, default: 0 },
  },
  { collection: "playlists" }
);

export default playlistSchema;