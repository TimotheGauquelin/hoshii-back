import List from "../models/List.js";
import express from "express";
import Present from "../models/Present.js";

const router = express.Router();

//GET ALL BY ID USER

router.get("/findByUser/:userId", async (req, res) => {
  try {
    const lists = await List.aggregate([
      {
        $match: {
          userId: req.user.id,
        },
      },
      {
        $lookup: {
          from: "presents",
          localField: "presents.presentId",
          foreignField: "id",
          as: "presents",
        },
      },
    ]);

    console.log(lists);

    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST A LIST

router.post("/", async (req, res) => {
  const newList = new List(req.body);
  try {
    const savedList = await newList.save();
    res.status(200).json(savedList);
  } catch (err) {
    res.status(500).json("Erreur 500, problème venant du POST");
  }
});

//UPDATE A LIST

router.put("/update/:listId", async (req, res) => {
  try {
    const newPresent = new Present(req.body);
    console.log(newPresent);
    const savedList = await List.findOneAndUpdate(
      { _id: req.params.listId },
      { $push: { presents: newPresent } },
      { new: true }
    );
    res.status(200).json(savedList);
  } catch (err) {
    res.status(500).json("Erreur 500, problème venant du PUT");
  }
});

export default router;
