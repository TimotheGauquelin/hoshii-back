import mongoose, { Schema } from "mongoose";
import IUser from "../interface/IUser"

const USER_SCHEMA = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    picture: { type: String }, 
    friends: [
      {
        _id: { type: String, required: true },
        username: { type: String, required: true },
        status: { type: String, required: true }
      },
    ],
    lists: [
      {
        label: { type: String, required: false },
        presents: [
          {
            label: { type: String, required: true },
            desc: { type: String },
            image: { type: String },
            price: { type: Number },
            giver: { 
              giverId: { type: String },
              giverUsername: { type: String },
              giverPicture: { type: String }
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", USER_SCHEMA);
