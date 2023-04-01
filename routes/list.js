import List from "../models/List.js";
import express from "express";

const router = express.Router();

//GET ALL BY ID USER

router.get("/findByUser/:userId", async (req, res) => {
  try {
    const lists = await List.find({
      userId: {
        $in: req.params.userId,
      },
    });

    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL LISTS

router.get("/", async (req, res) => {
  console.log(req);
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let lists;
    if (qNew) {
      lists = await List.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      lists = await List.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      lists = await List.find();
    }
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

export default router;
