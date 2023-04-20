import mongoose from "mongoose";
import artistSchema from "../schemata/artist-schema.js";

const artistModel = mongoose.model('artists', artistSchema);
export default artistModel;