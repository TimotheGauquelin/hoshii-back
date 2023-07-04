import express from "express";

import Present from "../models/Present.js";
import User from "../models/User.js";

import * as userControler from "../controler/userControler.js";

const router = express.Router();

//GET ALL USERS

router.get("/", userControler.getAllUsers);

//GET ONE USER

router.get("/:userId", userControler.getById);

//CREATE A LIST OF PRESENTS

router.post("/:userId/newList", userControler.addAList);

//CREATE A PRESENT INSIDE LIST

router.post("/:userId/list/:listId/newPresent", userControler.addAPresent);

//DELETE A LIST OF PRESENTS

router.delete("/:userId/list/:listId/deletedlist", userControler.deleteAList);

//  DELETE A PRESENT FROM A LIST

router.delete(
  "/:userId/list/:listId/present/:presentId/deletedPresent",
  userControler.deleteAPresent
);

// UPDATE A LIST

router.put("/:userId/list/:listId/updatedList", userControler.updateAList);

// UPDATE A PRESENT

router.put(
  "/:userId/list/:listId/present/:presentId/updatedPresent",
  userControler.updateAPresent
);

export default router;
