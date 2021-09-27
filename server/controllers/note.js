const expressAsyncHandler = require("express-async-handler");
const Note = require("../models/Note");
const note = expressAsyncHandler(async (req, res, next) => {
  const { movie_title, note } = req.body;

  const isExist = await Note.findOne({ movie_title, user: req.user.id });

  if (!isExist) {
    const movieNote = await Note.create({
      movie_title,
      note,
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      data: movieNote,
    });
  }

  isExist.note = note;

  await isExist.save();

  res.status(200).json({
    success: true,
    data: isExist,
  });
});

const getNote = expressAsyncHandler(async (req, res, next) => {
  const { movie_title } = req.body;
  const movieNote = await Note.findOne({ movie_title, user: req.user.id });

  res.status(200).json({
    success: true,
    data: movieNote,
  });
});

const removeNote = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const movieNote = await Note.findByIdAndRemove(id);

  res.status(200).json({
    success: true,
    data: {
      note: "qj mi huq",
    },
  });
});

module.exports = {
  note,
  getNote,
  removeNote,
};
