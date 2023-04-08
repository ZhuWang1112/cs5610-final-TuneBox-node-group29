import mongoose from "mongoose";
import likedSongsSchema from "../schemata/likedSongs-schema.js";

const likedSongsModel = mongoose.model("likedSongsModel", likedSongsSchema);
export default likedSongsModel;