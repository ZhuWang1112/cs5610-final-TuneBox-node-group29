import mongoose from "mongoose";
import followsSchema from "../schemata/follows-schema.js";

const followsModel = mongoose.model("followsModel", followsSchema);
export default followsModel;