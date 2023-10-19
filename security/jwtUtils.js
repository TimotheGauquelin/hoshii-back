import jwt from 'jsonwebtoken'

const createJWT = (payload) => {
  const TOKEN = jwt.sign(payload, process.env.JWT_SECRET_SENTENCE, {
    expiresIn: process.env.JWT_EXPIRATION_DATE,
  });
  return TOKEN;
};

const authenticateJWT = (req, res, next) => {
    const AUTHORIZATION_HEADER = req.headers.authorization;

    if (AUTHORIZATION_HEADER) {
        const TOKEN = AUTHORIZATION_HEADER.split(' ')[1];

        jwt.verify(TOKEN, process.env.JWT_SECRET_CODE, (err, user) => {
            if (err) {
                return res.status(403).json("Le token n'est pas valide !");
            }

            req.user = user;
            next();
        });
        
    } else {  
        return res
            .status(401)
            .json("Vous n'êtes pas authorisé à faire ça ! (Token)");
    }
};

export { createJWT, authenticateJWT }