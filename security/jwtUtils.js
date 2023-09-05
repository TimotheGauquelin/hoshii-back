import jwt from 'jsonwebtoken'

const authenticateJWT = (req, res, next) => {
    const AUTHORIZATION_HEADER = req.headers.authorization;

    if (AUTHORIZATION_HEADER) {
        const token = AUTHORIZATION_HEADER.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_CODE, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
        
    } else {
        res.sendStatus(401);
    }
};

export { authenticateJWT }