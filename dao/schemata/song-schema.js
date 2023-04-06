const songSchema = new mongoose.Schema({
    songName: { type: String, required: true },
    artist: { type: String, required: true },
    img: { type: String, required: true },
},{collection: "songs"});
export default songSchema;