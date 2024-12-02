const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMW = async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        res.status(401).json({ msg: "not authorized." });
    }

    const token = header.split(" ")[1];

    if (!token) {
        res.status(401).json({ msg: "not authorized." });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    next();
};

module.exports = authMW;
