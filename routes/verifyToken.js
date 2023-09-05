import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const AUTHORIZATION_HEADER = req.headers.authorization;

  if (AUTHORIZATION_HEADER) {
    µ
    const ACCESS_TOKEN = AUTHORIZATION_HEADER.split(" ")[1];

    jwt.verify(ACCESS_TOKEN, process.env.JWT_SECRET_CODE, (err, user) => {

      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();

    });

  } else {

    return res
      .status(401)
      .json("You're not authorised to do that ! (Token)");

  }
};

export default verifyToken;
