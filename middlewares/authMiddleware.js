const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.send("Access Denied");
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.send("Invalid Token");

    }

};

module.exports = verifyToken;