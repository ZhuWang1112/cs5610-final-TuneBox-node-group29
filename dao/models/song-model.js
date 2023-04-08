import mongoose from "mongoose";
import songSchema from "../schemata/song-schema.js";

const songModel = mongoose.model("songModel", songSchema);
export default songModel;