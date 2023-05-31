import List from "../models/List.js";
import express from "express";
import User from "../models/User.js";
import verifyToken from "./verifyToken.js";

const router = express.Router();

//GET MY FRIENDS

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    console.log(user);
    !user && res.status(401).json("Pas d'utilisateur avec cet ID");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
