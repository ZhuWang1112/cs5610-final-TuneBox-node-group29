import mongoose from "mongoose";
const songPlaylistSchema = new mongoose.Schema(
  {
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    playlistId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { collection: "songPlaylist" }
);
export default songPlaylistSchema;
