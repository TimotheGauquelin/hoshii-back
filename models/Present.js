import mongoose from "mongoose";

const PresentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    label: { type: String, required: true },
    desc: { type: String },
    image: { type: String },
    categories: { type: String, required: true },
    price: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Present", PresentSchema);
