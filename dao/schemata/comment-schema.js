import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    playlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "playlist",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { collection: "comments" }
);

 export default commentSchema;