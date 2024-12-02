require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();

// middle ware
app.use(express.json());

// routes
const tasksRouter = require("./routes/tasks-router");
const authRouter = require("./routes/auth-router");
const authMW = require("./middleware/auth");
app.use("/api/v1/tasks", authMW, tasksRouter);
app.use("/api/v1/auth", authRouter);

// error handler
const errorHandler = require("./errors/error-handler");
app.use(errorHandler);

const client = require("./db/connectDB");
const start = async () => {
    try {
        const port = process.env.PORT;
        await client.connect();
        console.log("connected to db...");
        app.listen(port, () =>
            console.log(`server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};
start();
