import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
    {
        apiSongId: {type: String, required: true},
        songName: {type: String, required: true},
        artistName: {type: String, required: true},
        img: {type: String, required: true},
        duration: {type: String, required: true},
        apiArtistId: {type: String, required: true},
        mp3Url: {type: String},
    },
    {collection: "songs"}
);
export default songSchema;