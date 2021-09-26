const express = require("express");
const auth = require("./auth");
const user = require("./user");
const favorites = require("./favorites");
const rating = require("./rating");
const note = require("./note");

const router = express.Router();

router.use("/auth", auth);
router.use("/user", user);
router.use("/favorites", favorites);
router.use("/rating", rating);
router.use("/note", note);

module.exports = router;
