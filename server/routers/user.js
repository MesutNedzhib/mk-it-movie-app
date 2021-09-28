const express = require("express");
const { getAllUsers, getSingleUser } = require("../controllers/user");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);

module.exports = router;
