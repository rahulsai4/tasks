const client = require("../db/connectDB");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    const hashPw = await bcrypt.hash(pw, salt);
    return hashPw;
};

const generateToken = async (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    return token;
};

const login = async (req, res) => {
    let { username, password } = req.body;

    const query = {
        text: "select * from users where username = $1;",
        values: [username],
    };

    const result = await client.query(query);
    const user = result.rows[0];

    if (!user) {
        res.status(404).json({ msg: "user not found." });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const token = await generateToken(user.userid);
        res.status(200).json({ token });
    } else {
        res.status(400).json({ msg: "no match." });
    }
};

const register = async (req, res) => {
    let { username, email, password } = req.body;
    password = await hashPassword(password);

    const query = {
        text: "insert into users(username, email, password) values($1, $2, $3) returning userId;",
        values: [username, email, password],
    };

    const result = await client.query(query);
    const userId = result.rows[0].userid;

    const token = await generateToken(userId);
    res.status(200).json({ token });
};

module.exports = { login, register };
