import mongoose from "mongoose";

const wish = new mongoose.Schema({
  id: String,
  probability: Number,
  risk: String,
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  children: {
    type: mongoose.Schema.Types.Array,
    ref: "Wish",
  },
});

export const Wish = mongoose.model("Wish", wish);
