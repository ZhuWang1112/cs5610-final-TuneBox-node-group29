import mongoose from "mongoose";
const songSchema = new mongoose.Schema({
    apiSongId: { type: String, required: true },
    songName: { type: String, required: true },
    artist: { type: String, required: true },
    img: { type: String, required: true },
    duration: {type: String, required:true},
},{collection: "songs"});
export default songSchema;