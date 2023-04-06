import mongoose from "mongoose";
import playlistSchema from "../schemata/playlist-schema";

const playlistModel = mongoose.model("playlistModel", playlistSchema);
export default playlistModel;