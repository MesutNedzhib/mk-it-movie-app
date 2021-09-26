const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  movie_title: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Rating", RatingSchema);
