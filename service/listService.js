import User from "../models/User.js";

const checkListAlreadyExists = async (req, res, next) => {
  try {
    const list = req.body;

    const checkIfListNameAlreadyExists = await User.find(
      { _id: req.params.userId },
      { lists: { $elemMatch: { label: list.label } } }
    );

    if (checkIfListNameAlreadyExists[0].lists.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    next(error);
  }
};

export { checkListAlreadyExists };
