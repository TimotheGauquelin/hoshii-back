import express from "express";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();

//REGISTER

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET_ENCODING
    ).toString(),
    isAdmin: req.body.isAdmin,
    isActive: req.body.isActive,
  });

  console.log(newUser);

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req);
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Mauvais identifiants");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_ENCODING
    );

    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Mauvais identifiants !");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_CODE,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
