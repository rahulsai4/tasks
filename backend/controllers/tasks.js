const client = require("../db/connectDB");

const getAllTasks = async (req, res) => {
    let result = await client.query("select * from tasks");
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
