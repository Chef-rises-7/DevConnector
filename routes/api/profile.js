const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("profile set up"));

module.exports = router;
