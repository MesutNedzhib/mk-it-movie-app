const express = require("express");
const {
  getFavoriteMovies,
  removeMovieFromFavorites,
  addMovieToFavorites,
} = require("../controllers/favorite");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

const router = express.Router();

router.post("/", getAccessToRoute, addMovieToFavorites);
router.get("/", getAccessToRoute, getFavoriteMovies);
router.get("/:id/remove", getAccessToRoute, removeMovieFromFavorites);
module.exports = router;
