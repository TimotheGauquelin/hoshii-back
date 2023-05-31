import mongoose from "mongoose";

const PresentSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    desc: { type: String },
    image: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Present", PresentSchema);
