import mongoose from "mongoose";
import playlistSchema from "../schemata/playlist-schema.js";

const playlistModel = mongoose.model("playlists", playlistSchema);
export default playlistModel;