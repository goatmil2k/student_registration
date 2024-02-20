const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const router = require("./src/routes/index");

require('dotenv').config();

app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", router);


module.exports = app;