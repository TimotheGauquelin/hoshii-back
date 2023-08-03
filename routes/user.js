import express from "express";

import * as userControler from "../controler/userControler.js";
import * as jwtUtils from "../security/jwtUtils.js"

const router = express.Router();

//GET ALL USERS

router.get("/", userControler.getAllUsers);

//GET ALL USERS BUT ME AND MY FRIENDS

router.get("/allUsersButMySearchAndMeAndMyFriends/:username", jwtUtils.authenticateJWT, userControler.getAllUsersButMySearchAndMeAndMyFriends);

//GET OWN 

router.get("/myProfil", jwtUtils.authenticateJWT, userControler.getMyProfil);

//GET ONE USER

router.get("/:userId", userControler.getById);

//CREATE A LIST OF PRESENTS

router.post("/myProfil/newList", jwtUtils.authenticateJWT, userControler.addAList);

//CREATE A PRESENT INSIDE LIST

router.post("/myProfil/list/:listId/newPresent", jwtUtils.authenticateJWT, userControler.addAPresent);

//DELETE A LIST OF PRESENTS

router.delete("/myProfil/list/:listId/deletedlist", jwtUtils.authenticateJWT, userControler.deleteAList);

//  DELETE A PRESENT FROM A LIST

router.delete(
  "/myProfil/list/:listId/present/:presentId/deletedPresent",
  jwtUtils.authenticateJWT,
  userControler.deleteAPresent
);

// UPDATE A LIST

router.put("/myProfil/list/:listId/updatedList", jwtUtils.authenticateJWT, userControler.updateAList);

// UPDATE A PRESENT

router.put(
  "/myProfil/list/:listId/present/:presentId/updatedPresent",
  jwtUtils.authenticateJWT, 
  userControler.updateAPresent
);

// USER1 TAKES A PRESENT IN THE LIST OF USER2

router.put(
  "/:friendId/list/:friendListId/present/:friendPresentId/takeAPresent",
  jwtUtils.authenticateJWT, 
  userControler.takeAPresent
);

// USER1 PUTS HIS PRESENT BACK IN THE LIST OF USER2

router.put(
  "/:friendId/list/:friendListId/present/:friendPresentId/putAPresentBackInTheList",
  jwtUtils.authenticateJWT, 
  userControler.putAPresentBackInTheList
);



export default router;
