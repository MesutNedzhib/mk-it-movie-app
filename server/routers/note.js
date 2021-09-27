const express = require("express");
const { note, getNote, removeNote } = require("../controllers/note");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const router = express.Router();

router.post("/", getAccessToRoute, note);
router.post("/getNote", getAccessToRoute, getNote);
router.get("/:id/remove", getAccessToRoute, removeNote);

module.exports = router;
