import User from "../models/User.js";
import { ObjectId } from 'mongodb'


async function getAllUsers(req, res, next) {
  try {
    return await User
      .find()
      .select(["-password", "-__v"])
      .orFail();
  } catch (err) {
    next(err);
  }
}

async function getAllUsersButMySearchAndMeAndMyFriends(req, res, next) {

  // const test = req.params.userName

  try {

    const friends = ["642ad55b80650294f716edde"]
    const usernameRegex = new RegExp(`^${req.params.username}`, 'i');
    
    const usersFriends = await User.find({
      $and: [
        { _id: { $ne: req.user.id, $nin: friends } },   // Remove elements with ID = req.user.id & user friends ID
        { username: usernameRegex }                     // Remove elements are beginning with req.params.username
      ]
      }
    )

    return usersFriends

  } catch (err) {
    next(err);
  }
  
}

async function getMyProfil(req, res, next) {

  try {
    return await User
      .findOne({ _id: req.user.id })
      .select(["-password", "-__v"])
      .orFail();
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    return await User
      .findOne({ _id: req.params.userId })
      .select(["-password", "-__v"])
      .orFail();
  } catch (err) {
    next(err);
  }
}

async function addAList(user, req, res, next) {
  try {
    const response = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { lists: req.body } },
      { returnDocument: "after" }
    );

    return response.lists.find((el) => el.label === req.body.label);
  } catch (err) {
    next(err);
  }
}

async function addAPresent(user, req, res, next) {

  try {
    return await User.updateOne(
      { _id: req.user.id, "lists._id": req.params.listId },
      { $push: { "lists.$.presents": req.body } }
    );
  } catch (err) {
    next(err);
  }
}

async function deleteAList(req, res, next) {
  try {
    return await User.updateOne(
      { _id: req.user.id },
      { $pull: { lists: { _id: req.params.listId } } }
    );
  } catch (err) {
    next(err);
  }
}

async function deleteAPresent(req, res, next) {
  try {
    return await User.updateOne(
      { _id: req.user.id, "lists._id": req.params.listId },
      { $pull: { "lists.$.presents": { _id: req.params.presentId } } }
    );
  } catch (err) {
    next(err);
  }
}

async function updateAList(req, res, next) {
  try {
    return await User.updateOne(
      { _id: req.user.id, "lists._id": req.params.listId },
      { $set: { "lists.$.label": req.body.label } }
    );
  } catch (err) {
    next(err);
  }
}

async function updateAPresent(req, res, next) {
  try {

    return await User.updateOne(
      { _id: req.user.id },
      { $set: { "lists.$[list].presents.$[present]": req.body } },
      {
        arrayFilters: [
          { "list._id": req.params.listId },
          { "present._id": req.params.presentId },
        ],
        new: true,
      }
    );
  } catch (err) {
    next(err);
  }
}

async function takeAPresent(req, res, next) {
  try {

    const response = await User.updateOne(
      { _id: req.params.friendId },
      { $set: { "lists.$[list].presents.$[present].giver": 
        {
          giverId: req.user.id,
          giverUsername: req.user.username,
          giverPicture: req.user.picture
        } 
      } },
      {
        arrayFilters: [
          { "list._id": req.params.friendListId },
          { "present._id": req.params.friendPresentId },
        ],
        new: true,
      })

    return response
  } catch (err) {
    next(err);
  }
}

async function putAPresentBackInTheList(req, res, next) {
    //To put back a present inside list, i need to remove giver object from choosen present
  try {

    return await User.updateOne(
      { _id: req.params.friendId},
      { $unset: {"lists.$[list].presents.$[present].giver": 1}},
      {
        arrayFilters: [
          { "list._id": req.params.friendListId },
          { "present._id": req.params.friendPresentId },
        ],
      },
      { returnDocument: "after" },
    );

  } catch (err) {
    next(err);
  }
}

async function checkIfUserNameAlreadyExists(req, res, next) {
  try {

    const user = await User.findOne(
      { username: req.body.username },
    )

    return user

  } catch (err) {
    next(err);
  }
}

async function checkIfEmailAlreadyExists(req, res, next) {
  try {

    const user = await User.findOne(
      { email: req.body.email },
    )

    return user

  } catch (err) {
    next(err);
  }
}

export {
  getAllUsers,
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

  checkIfUserNameAlreadyExists,
  checkIfEmailAlreadyExists,
};
