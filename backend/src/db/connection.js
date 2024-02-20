require('dotenv').config();

async function  connectToDatabase() {
    try {
        const { Client } = require('pg')
        const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
    });
    client.connect(() => {
        console.log("Connected to database");
    })
    } catch(err) {
        console.log("Error connecting to database");
        throw new Error(err);
    }
}

module.exports = connectToDatabase;