import User from "../models/User.js";
import * as userService from "../service/userService.js";
import * as listService from "../service/listService.js";

async function getAllUsers(req, res, next) {
  try {
    const response = await userService.getAllUsers(req, res, next);
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
    const user = await User.findOne({ _id: req.params.userId }).orFail();

    !user && new Error();

    const checkIfListNameAlreadyExists =
      await listService.checkListAlreadyExists(req, res, next);

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
    const user = await User.findOne({ _id: req.params.userId }).orFail();

    !user && new Error();

    const response = await userService.addAPresent(user, req, res, next);
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}

async function deleteAList(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.params.userId }).orFail();

    !user && new Error();

    await userService.deleteAList(req, res, next);
    res.status(200).json("List is deleted");
  } catch (err) {
    next(err);
  }
}

async function deleteAPresent(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.params.userId }).orFail();

    !user && new Error();

    await userService.deleteAPresent(req, res, next);
    res.status(200).json("Present is deleted");
  } catch (err) {
    next(err);
  }
}

async function updateAList(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.params.userId }).orFail();

    !user && new Error();

    const checkIfListNameAlreadyExists =
      await listService.checkListAlreadyExists(req, res, next);

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
    const user = await User.findOne({ _id: req.params.userId }).orFail();

    !user && new Error();

    const response = await userService.updateAPresent(req, res, next);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}

export {
  getAllUsers,
  getById,
  addAList,
  addAPresent,
  deleteAList,
  deleteAPresent,
  updateAList,
  updateAPresent,
};
