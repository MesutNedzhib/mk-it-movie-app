const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  user: {
    type: Schema.mongoose.ObjectId,
    required: true,
    ref: "User",
  },
  movie_title: {
    type: String,
    required: true,
    unique: true,
  },
  note: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
