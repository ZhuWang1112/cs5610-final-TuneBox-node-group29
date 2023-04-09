import mongoose from "mongoose";

const followsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    followeeList: { type: Array, default: [] },
  },
  { collection: "follows" }
);
export default followsSchema;