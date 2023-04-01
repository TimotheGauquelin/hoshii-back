import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    label: { type: String, required: true },
    presents: [
      {
        presentId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("List", ListSchema);
