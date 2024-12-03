const client = require("../db/connectDB");

const taskOwnerMW = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.userId;

    const query = {
        text: "select * from tasks where id = $1 and userid = $2;",
        values: [id, userId],
    };
    let result = await client.query(query);

    let row = result.rows[0];
    if (row.rows.length == 0) {
        return res.status(401).json({ msg: "not authorized." });
    }

    next();
};

module.exports = taskOwnerMW;
