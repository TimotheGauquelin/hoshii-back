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
        isAdmin: req.isAdmin,
        isActive: req.isActive,
    })

    try {

        console.log("test")
      const savedUser = await NEW_USER.save();
      return savedUser

    } catch (err) {

        next(err)

    }

}

export default register