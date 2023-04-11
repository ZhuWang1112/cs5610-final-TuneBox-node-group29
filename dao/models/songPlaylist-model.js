import mongoose from "mongoose";
import songPlaylistSchema from "../schemata/songPlaylist-schema.js";

const songPlayModel = mongoose.model("songPlaylist", songPlaylistSchema);
export default songPlayModel;
