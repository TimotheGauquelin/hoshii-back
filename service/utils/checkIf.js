import User from "../../models/User.js";

async function checkIfUserNameAlreadyExists(req, res, next) {
    try {
  
      const FOUND_USER = await User
      .findOne(
        { username: req.body.username },
      )
      
      if (!FOUND_USER) {
        return null;
      } else {
        return FOUND_USER;
      }
    
    } catch (err) {
      next(err);
    }
}
  
async function checkIfEmailAlreadyExists(req, res, next) {
    try {
  
      const FOUND_USER  = await User
      .findOne(
        { email: req.body.email },
      )
         
      if (!FOUND_USER) {
        return null;
      } else {
        return FOUND_USER;
      }
  
    } catch (err) {
      next(err);
    }
}

async function checkIfListAlreadyExists(req, res, next) {
    try {

      const USER_LIST = req.body;
  
      const CHECK_IF_LIST_NAME_ALREADY_EXISTS = await User
      .findOne(
        { _id: req.user.id },
        { lists: { $elemMatch: { label: USER_LIST.label } } }
      )
      .orFail()
  
      if (CHECK_IF_LIST_NAME_ALREADY_EXISTS[0].lists.length > 0) {

        return true;

      } else {

        return false;

      }

    } catch (error) {

      next(error);

    }
};
  

export {
    checkIfUserNameAlreadyExists, 
    checkIfEmailAlreadyExists, 
    checkIfListAlreadyExists
}