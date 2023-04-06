import mongoose from "mongoose";
import likedSongsSchema from "../schemata/likedSongs-schema";

const likedSongsModel = mongoose.model("likedSongsModel", likedSongsSchema);
export default likedSongsModel;