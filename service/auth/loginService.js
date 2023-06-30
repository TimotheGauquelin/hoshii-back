import CustomError from "../../error/custom_error/CustomError.js";
import errorCodes from "../../error/errorCodes.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

import User from "../../models/User.js";

async function login (req, res, next) {
    try {

        const USER = await User.findOne({ username: req.body.username });

        if(!USER) {
            throw new CustomError(errorCodes.USER_NOT_FOUND)
        }

        const HASHED_PASSWORD = CryptoJS.AES.decrypt(
            USER.password,
            process.env.PASSWORD_SECRET_ENCODING
        );

        const ORIGINAL_PASSWORD = HASHED_PASSWORD.toString(CryptoJS.enc.Utf8);

        if(ORIGINAL_PASSWORD !== req.body.password) {
            throw new CustomError(errorCodes.WRONG_LOG)
        }

        const ACCESS_TOKEN = jwt.sign(
            {
                id: USER._id,
                isAdmin: USER.isAdmin,
            },
            process.env.JWT_SECRET_CODE,
            { expiresIn: "3d" }
        );

        return { accessToken: ACCESS_TOKEN }

    } catch (error) {

        res.status(error.error.statusCode).json(error.error.message);

    }
    
}

export default login