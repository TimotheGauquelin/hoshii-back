import User from "../models/User.ts";
import * as userService from "../service/userService.js";
import * as checkIf from "../service/utils/checkIf.js";
import { ObjectId } from 'mongodb'

async function getAllUsers(req, res, next) {
  try {
    const response = await userService.getAllUsers(req, res, next);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

async function getAllUsersButMeAndMyFriends(req, res, next) {
  try {
    const response = await userService.getAllUsersButMeAndMyFriends(req, res, next);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

async function getAllUsersButMySearchAndMeAndMyFriends(req, res, next) {
  try {
    const response = await userService.getAllUsersButMySearchAndMeAndMyFriends(req, res, next);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

async function getMyProfil(req, res, next) {
  try {
    const response = await userService.getMyProfil(req, res, next);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const response = await userService.getById(req, res, next);
    return res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

async function addAList(req, res, next) {
  try {
    console.log(req.user.id)
    const user = await User.findOne({ _id: req.user.id }).orFail();

    !user && new Error();

    const checkIfListNameAlreadyExists =
      await checkIf.checkIfListAlreadyExists(req, res, next);

    if (checkIfListNameAlreadyExists) {
      throw new Error("Ce nom de liste existe déjà chez cet utilisateur");
    } else {
      const response = await userService.addAList(user, req, res, next);
      res.status(201).json(response);
    }
  } catch (err) {
    next(err);
  }
}

async function addAPresent(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user.id }).orFail();

    !user && new Error();

    const response = await userService.addAPresent(user, req, res, next);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}

async function deleteAList(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user.id }).orFail();

    !user && new Error();

    await userService.deleteAList(req, res, next);
    res.status(200).json("List is deleted");
  } catch (err) {
    next(err);
  }
}

async function deleteAPresent(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user.id }).orFail();

    !user && new Error();

    await userService.deleteAPresent(req, res, next);
    res.status(200).json("Present is deleted");
  } catch (err) {
    next(err);
  }
}

async function updateAList(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user.id }).orFail();

    !user && new Error();

    const checkIfListNameAlreadyExists =
      await checkIf.checkIfListAlreadyExists(req, res, next);

    if (checkIfListNameAlreadyExists) {
      throw new Error("Ce nom de liste existe déjà chez cet utilisateur");
    } else {
      const response = await userService.updateAList(req, res, next);
      res.status(200).json(response);
    }
  } catch (err) {
    next(err);
  }
}

async function updateAPresent(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.user.id }).orFail();

    !user && new Error();

    const response = await userService.updateAPresent(req, res, next);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

async function takeAPresent(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.params.friendId }).orFail();

    !user && new Error();

    const response = await userService.takeAPresent(req, res, next);
    res.status(200).json(response);
    
  } catch (err) {
    next(err);
  }
}

async function putAPresentBackInTheList(req, res, next) {
  try {
    
    const friend = await User.aggregate([
      {
        "$unwind": "$lists"
      },
      {
        "$match": {
          "_id": new ObjectId(req.params.friendId),
          "lists._id": new ObjectId(req.params.friendListId),
          "lists.presents": {
            "$elemMatch": {
              "_id": new ObjectId(req.params.friendPresentId),
              "giver.giverId": req.user.id
            }
          }
        }
      },
     
    ]) 

    !friend && new Error();

    // //Si nom du giver = rfriend.id alors
    if(friend.length > 0) {
      const response = await userService.putAPresentBackInTheList(req, res, next);
      res.status(200).json(response);
    } else {
      res.status(403).json("Vous n'avez pas l'autorisation")
    }
  
  } catch (err) {
    next(err);
  }
}

async function requestToAddAFriend(req, res, next) {
  try {

    const myAccount = await User
    .findOne(
      { _id: req.user.id },
      { username: 1 }
    )
    .orFail();

    const friendAccount = await User
    .findOne(
        { _id: req.params.friendId},
        { username: 1 }
    )
    .orFail();

    async function checkIfAFriendHasMeInsideHisFriendList() {
      try {
        const user = await User
          .findOne({ _id: req.params.friendId})
          .orFail()
        
        if (user) {
          const friend = user.friends.find(friend => friend._id === req.user.id);

          if (friend) {
            return true; // Username exists in the user's friend list
          } else {
            return false; // Username does not exist in the user's friend list
          }
        }

      } catch (error) {

        console.error("Error while searching for the user:", error);
        return false; // Handle the error case

      }
    
    }

    !friendAccount & !myAccount && new Error();

    const checkIfImIn = await checkIfAFriendHasMeInsideHisFriendList()

    if(checkIfImIn == true) {
      res.status(404).json("Votre demande est déjà en cours de traitement");
    } else {
      const response = await userService.requestToAddAFriend(req, res, next, myAccount, friendAccount);
      res.status(200).json(response);
    }
    
  } catch (err) {
    next(err);
  }
}

async function responsedFriendListRequest(req,res, next) {
  try {
    const myAccount = await User
      .findOne(
        { username: req.user.username, "friends.username": req.params.friendUsername, "friends.status": "pending" },
      )
      .orFail();

    async function checkIfUserExists() {
      try {
        const user = await User
          .findOne(
            { username: req.params.friendUsername }
          )
          .orFail();

        if(user) {
          return true
        } else {
          return false
        }
      } catch (err) {
        console.log(err)
      }
    }

    !myAccount || !checkIfUserExists && new Error();

    const response = await userService.responsedFriendListRequest(req, res, next);
    res.status(200).json(response);
  
  } catch (err) {
    next(err);
  }
}

async function removeFriendFromMyList(req,res, next) {
  try {
    const myAccount = await User
      .findOne(
        { username: req.user.username, "friends.username": req.params.friendUsername, "friends.status": "friend" },
      )
      .orFail();

    async function checkIfUserExists() {
      try {
        const user = await User
          .findOne(
            { username: req.params.friendUsername }
          )
          .orFail();

        if(user) {
          return true
        } else {
          return false
        }
      } catch (err) {
        console.log(err)
      }
    }

    !myAccount || !checkIfUserExists && new Error();

    const response = await userService.removeFriendFromMyList(req, res, next);
    res.status(200).json(response);
  
  } catch (err) {
    next(err);
  }
}



export {
  getAllUsers,
  getAllUsersButMeAndMyFriends,
  getAllUsersButMySearchAndMeAndMyFriends,
  getMyProfil,
  getById,
  addAList,
  addAPresent,
  deleteAList,
  deleteAPresent,
  updateAList,
  updateAPresent,
  takeAPresent,
  putAPresentBackInTheList,
  requestToAddAFriend,
  responsedFriendListRequest,
  removeFriendFromMyList
};
