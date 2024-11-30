require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();

// middle ware
app.use(express.json());

const connectDB = require("./db/connectDB");
const start = async () => {
    try {
        const port = process.env.PORT;
        connectDB();
        console.log("connected to db...");
        app.listen(port, () =>
            console.log(`server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};
start();
