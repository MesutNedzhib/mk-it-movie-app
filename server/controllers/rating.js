const expressAsyncHandler = require("express-async-handler");
const Rating = require("../models/Rating");
const CustomError = require("../helpers/error/CustomError");

const setRating = expressAsyncHandler(async (req, res, next) => {
  const { movie_title, rating } = req.body;
  console.log(req.body);

  const isExist = await Rating.findOne({ movie_title, user: req.user.id });

  if (!isExist) {
    const movieRating = await Rating.create({
      movie_title,
      rating,
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      data: movieRating,
    });
  }

  isExist.rating = rating;

  await isExist.save();

  res.status(200).json({
    success: true,
    data: isExist,
  });
});

const getRating = expressAsyncHandler(async (req, res, next) => {
  const { movie_title } = req.body;
  const rating = await Rating.findOne({ movie_title, user: req.user.id });

  res.status(200).json({
    success: true,
    data: rating,
  });
});

// remove
const changeRating = expressAsyncHandler(async (req, res, next) => {
  const { movie_title, rating } = req.body;
  console.log(req.body);
  const movieRating = await Rating.findOne({ movie_title, user: req.user.id });
  movieRating.rating = rating;

  await movieRating.save();

  res.status(200).json({
    success: true,
    data: movieRating,
  });
});

module.exports = {
  setRating,
  getRating,
  changeRating,
};
