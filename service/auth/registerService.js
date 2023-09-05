import CryptoJS from "crypto-js";
import User from "../../models/User.js";

async function register (req, res, next) {  
  
    const NEW_USER = new User({
        username: req.username,
        email: req.email,
        password: CryptoJS.AES.encrypt(
            req.password,
            process.env.PASSWORD_SECRET_ENCODING
        ).toString(),
        isAdmin: false,
        isActive: true,
    })

    try {

      const SAVED_NEW_USER = await NEW_USER.save();
      return SAVED_NEW_USER

    } catch (err) {

        next(err)

    }

}

export default register