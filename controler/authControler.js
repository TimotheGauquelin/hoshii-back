import { comparedPassword } from "../security/passwordUtils.js";
import { loginService, registerService } from "../service/authService.js";
import db from "../db.js"
import CustomError from "../error/CustomError.js";
import { WRONG_PASSWORD, USER_NOT_FOUND } from "../error/errorCodes.js"

const registerControler = async (req, res, next) => {

    try {

      const RESPONSE = await registerService(req, res, next);
      return RESPONSE

    } catch(error) {
  
      next(error);
      
    }
}

const loginControler = async (req, res, next) => {

  const { name, password } = req.body;

  try {

    const {
      rows: [user],
    } = await db.query("SELECT * FROM users_group WHERE name = $1", [name]);
    
    if (!user) {
      throw new CustomError(USER_NOT_FOUND);
    } 

    const IS_PASSWORD_CORRECT = await comparedPassword(password, user.password);

    if (!IS_PASSWORD_CORRECT) {
      throw new CustomError(WRONG_PASSWORD);
    }
      
    const RESPONSE = await loginService(user, req, res, next);
    return RESPONSE

  } catch(error) {
  
    next(error);
      
  }
}

export { loginControler, registerControler }