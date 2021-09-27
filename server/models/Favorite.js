const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const FavoriteShema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  movieId: {
    type: String,
    required: true,
  },
  image: {
    type: Schema.Types.Mixed,
  },
  name: {
    type: String,
    required: true,
  },
  genres: [
    {
      type: String,
    },
  ],
  weight: {
    type: Number,
  },
  summary: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  slug: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

FavoriteShema.methods.makeSlug = function () {
  return slugify(this.name, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};

FavoriteShema.pre("save", function (next) {
  if (!this.isModified("title")) {
    next();
  }
  this.slug = this.makeSlug();
  next();
});

module.exports = mongoose.model("Favorite", FavoriteShema);
