import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    label: { type: String, required: true },
    presents: [
      {
        label: { type: String, required: true },
        desc: { type: String },
        image: { type: String },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("List", ListSchema);
