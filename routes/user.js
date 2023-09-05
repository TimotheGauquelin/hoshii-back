import express from "express";

import * as userControler from "../controler/userControler.js";
import * as jwtUtils from "../security/jwtUtils.js"

const router = express.Router();

//GET ALL USERS

router.get("/", userControler.getAllUsers);

//GET ALL USERS BUT ME AND MY FRIENDS

router.get("/allUsersButMeAndMyFriends", jwtUtils.authenticateJWT, userControler.getAllUsersButMeAndMyFriends);

//GET ALL USERS BUT ME AND MY FRIENDS AND RESEARCH

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

// USER1 MAKES A REQUEST TO GET A NEW FRIEND (USER2)

router.put(
  "/requestToAddAFriend/:friendId",
  jwtUtils.authenticateJWT, 
  userControler.requestToAddAFriend
);

// USER2 ANSWERS TO FRIEND REQUEST FROM USER 1

router.put(
  "/responseFriendRequest/:friendUsername/:response",
  jwtUtils.authenticateJWT, 
  userControler.responsedFriendListRequest
);

// USER1 REMOVE USER2 FROM HIS FRIEND LIST

router.put(
  "/removeFriendFromList/:friendUsername",
  jwtUtils.authenticateJWT, 
  userControler.removeFriendFromMyList
);



export default router;
