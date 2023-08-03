import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
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
      default: false,
    },
    picture: { type: String }, 
    friends: [
      {
        friendId: { type: String, required: true },
        friendUsername: { type: String, required: true },
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

export default mongoose.model("User", UserSchema);
