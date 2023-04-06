import mongoose from "mongoose";
import songSchema from "../schemata/song-schema";

const songModel = mongoose.model("songModel", songSchema);
export default songModel;