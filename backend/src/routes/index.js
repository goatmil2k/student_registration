const express = require("express");
const studentRoutes = require("./studentroutes");

const router = express.Router();

router.use('/students', studentRoutes);

module.exports = router;