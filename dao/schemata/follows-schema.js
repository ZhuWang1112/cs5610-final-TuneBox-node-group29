import mongoose from "mongoose";

const followsSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "_id", required: true },
    user_id: { type: String, required: true },
    followeeList: { type: Array, default: [] },
  },
  { collection: "follows" }
);
export default followsSchema;