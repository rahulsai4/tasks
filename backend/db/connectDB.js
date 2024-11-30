const pg = require("pg");
const { Client } = pg;

const connectDB = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB,
    });

    await client.connect();
};

module.exports = connectDB;