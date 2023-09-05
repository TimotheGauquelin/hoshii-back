import User from "../models/User.js";

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

async function getAllUsersButMeAndMyFriends(req, res, next) {

  try {

    const myAccount = await User.findOne(
      { _id: req.user.id },
    )
    
    const friends = myAccount.friends.map(objet => objet.id)

    const usersFriends = await User.find(
      { _id: { $ne: req.user.id, $nin: friends } },   // Remove elements with ID = req.user.id & user friends ID
    )

    return usersFriends

  } catch (err) {
    next(err);
  }
  
}

async function getAllUsersButMySearchAndMeAndMyFriends(req, res, next) {

  try {

    const myAccount = await User.findOne(
      { _id: req.user.id },   // Remove elements with ID = req.user.id & user friends ID
    )
    
    const friends = myAccount.friends.map(objet => objet.id)

    const usernameRegex = new RegExp(`^${req.params.username}`, 'i');
    
    const usersFriends = await User.find({
      $and: [
        { _id: { $ne: req.user.id, $nin: friends } },   // Remove elements with ID = req.user.id & user friends ID
        { username: usernameRegex },                    // Remove elements are beginning with req.params.username
      ]
    })

    //Enlever aussi mes amis qui sont en requested

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

async function requestToAddAFriend(req, res, next, myAccount, friendAccount) {
  try {

    const myProfilIsPendingInsideFriendList = {
      ...myAccount._doc,
      status: "pending"
    }

    const myFriendAccountIsPendingInsideMyFriendList = {
      ...friendAccount._doc,
      status: "requested"
    }

    //Add inside requested friend my profil with a 'pending' status
    const updatedFriendAccount = await User
    .updateOne(
      { _id: req.params.friendId }, 
      {$push: { friends: myProfilIsPendingInsideFriendList }}
    )

    //Add inside my list the friend I requested with a 'requested'' status
    const updatedMyAccount = await User
    .updateOne(
      { _id: req.user.id }, 
      {$push: { friends: myFriendAccountIsPendingInsideMyFriendList }}
    )

    return {updatedFriendAccount, updatedMyAccount}

  } catch (err) {
    next(err);
  }
}

async function responsedFriendListRequest(req, res, next) {
  try {

    //Note: Je modifie en ciblant username et non _id car en ciblant l'ID, l'ami modifié etait tjrs le premier 
    //objet du tableau d'ami et non celui avec l'ID correspondant..

    //Add inside my list the friend I requested with a 'requested' status
    const updatedMyAccount = await User
    .findOneAndUpdate(
      { 
        username: req.user.username, 
        "friends.username": req.params.friendUsername, 
        "friends.status": "pending" 
      },
      { $set: 
        { 
          "friends.$.status": req.params.response === "true" ? "friend" : "refused"
        } 
      },
      { 
        new: true, // Renvoie le document mis à jour
      }
    )
    .orFail()

    // //Add inside requested friend my profil with a 'pending' status
 
   const friendAccount = await User
      .findOneAndUpdate(
        { username: req.params.friendUsername, "friends.username": req.user.username, "friends.status": "requested" },
        { $set: { "friends.$.status": req.params.response === "true" ? "friend" : "refused" } },
        { 
          new: true, // Renvoie le document mis à jour
        }
      )
      .orFail()

    console.log("b", friendAccount)

    return updatedMyAccount

  } catch (err) {
    next(err);
  }
}
async function removeFriendFromMyList(req, res, next) {
  try {

    //Note: Je modifie en ciblant username et non _id car en ciblant l'ID, l'ami modifié etait tjrs le premier 
    //objet du tableau d'ami et non celui avec l'ID correspondant..

    //Remove inside my list a friend with 'friend' status
    const updatedMyAccount = await User
    .findOneAndUpdate(
      { 
        username: req.user.username, 
        "friends.username": req.params.friendUsername, 
        "friends.status": "friend" 
      },
      { $pull: { friends: { username: req.params.friendUsername } } },
      { 
        new: true, // Renvoie le document mis à jour
      }
    )
    .orFail()

    //Remove inside a friend list me 
    const updatedFriendAccount = await User
    .findOneAndUpdate(
      { username: req.params.friendUsername, "friends.username": req.user.username, "friends.status": "friend" },
      { $pull: { friends: { username: req.user.username } } },
      { 
        new: true, // Renvoie le document mis à jour
      }
    )
    .orFail()

    return updatedMyAccount

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
  removeFriendFromMyList,
};
