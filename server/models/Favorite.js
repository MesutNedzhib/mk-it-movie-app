const mongoose = require("mongoose");
const slugify = require("slugify");
const User = require("./User");

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

FavoriteShema.pre("save", async function (next) {
  try {
    const user = await User.findById(this.user);
    if (user.favorites.includes(this._id)) {
      next();
    } else {
      user.favorites.push(this._id);
      await user.save();
      next();
    }
  } catch (err) {
    return next(err);
  }
});

FavoriteShema.pre("remove", async function (next) {
  try {
    const user = await User.findOne({ _id: this.user });
    const index = user.favorites.indexOf(this._id);
    user.favorites.splice(index, 1);
    await user.save();
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Favorite", FavoriteShema);
