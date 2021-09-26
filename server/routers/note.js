const express = require("express");
const { note, getNote } = require("../controllers/note");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const router = express.Router();

router.post("/", getAccessToRoute, note);
router.post("/getNote", getAccessToRoute, getNote);

module.exports = router;
