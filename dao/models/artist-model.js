import mongoose from "mongoose";

import artistSchema from "../schemata/artists-scheme.js";

const artistModel = mongoose.model('artists', artistSchema);
export default artistModel;

