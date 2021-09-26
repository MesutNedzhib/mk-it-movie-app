const express = require("express");
const { setRating, getRating, changeRating } = require("../controllers/rating");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router();

router.post("/setRating", getAccessToRoute, setRating);
router.post("/getRating", getAccessToRoute, getRating);
router.post("/changeRating", getAccessToRoute, changeRating);

module.exports = router;
