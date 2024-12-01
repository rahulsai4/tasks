const client = require("../db/connectDB");

const getAllTasks = async (req, res) => {
    // pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    // filtering - status, priority
    const status = req.query.status;
    const priority = req.query.priority;

    let text = "select * from tasks";
    let values = [];

    if (status) {
        text += ` where status = $1`;
        values.push(status);
    }
    if (priority) {
        text += " order by priority";
        if (priority === "desc") text += " desc";
    }

    text += ` limit $${values.length + 1} offset $${values.length + 2};`;
    values.push(limit);
    values.push(skip);

    let result = await client.query(text, values);
    res.json({ nBHits: result.rowCount, data: result.rows });
};

const getTask = async (req, res) => {
    const id = req.params.id;
    const query = {
        text: "select * from tasks where id = $1",
        values: [id],
    };
    let result = await client.query(query);

    res.json(result.rows[0]);
};

const createTask = async (req, res) => {
    const { title, desc, status, priority } = req.body;
    const query = {
        text: "insert into tasks(title, description, status, priority) values($1, $2, $3, $4)",
        values: [title, desc, status, priority],
    };
    await client.query(query);

    res.send("task created.");
};

const updateTask = async (req, res) => {
    const { title, desc, status, priority } = req.body;
    const id = req.params.id;

    const query = {
        text: "update tasks set title = $1, description = $2, status = $3, priority = $4 where id = $5",
        values: [title, desc, status, priority, id],
    };
    const result = await client.query(query);

    res.json({ msg: "task updated." });
};

const deleteTask = async (req, res) => {
    const id = req.params.id;

    const query = {
        text: "delete from tasks where id = $1",
        values: [id],
    };
    await client.query(query);

    res.json({ msg: "task deleted." });
};

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};
