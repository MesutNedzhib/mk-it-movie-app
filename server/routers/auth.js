const express = require("express");
const { register, signIn, logout } = require("../controllers/auth");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router();

router.post("/register", register);
router.post("/sign-in", signIn);
router.get("/logout", getAccessToRoute, logout);

module.exports = router;
