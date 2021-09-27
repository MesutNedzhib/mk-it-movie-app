const expressAsyncHandler = require("express-async-handler");
const Favorite = require("../models/Favorite");
const CustomError = require("../helpers/error/CustomError");

const addMovieToFavorites = expressAsyncHandler(async (req, res, next) => {
  const favorite = await Favorite.create({
    user: req.user.id,
    ...req.body,
  });

  res.status(200).json({
    success: true,
    data: favorite,
  });
});

const getFavoriteMovies = expressAsyncHandler(async (req, res, next) => {
  const favorites = await Favorite.find({ user: req.user.id });

  favorites.sort((x, y) => {
    return new Date(y.createdAt) - new Date(x.createdAt);
  });

  res.status(200).json({
    success: true,
    data: favorites,
  });
});

const removeMovieFromFavorites = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const favorites = await Favorite.findOneAndRemove({ movieId: id });

  res.status(200).json({
    success: true,
    data: favorites,
  });
});

module.exports = {
  addMovieToFavorites,
  getFavoriteMovies,
  removeMovieFromFavorites,
};
