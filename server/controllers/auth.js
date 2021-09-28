const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const expressAsyncHandler = require("express-async-handler");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/input/inputHelpers");

const register = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const isExist = await User.findOne({ email });

  if (isExist) {
    return next(new CustomError("There already have a user with such email"));
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendJwtToClient(user, res);
});

const signIn = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your inputs", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Please check your credentials", 400));
  }

  sendJwtToClient(user, res);
});

const logout = expressAsyncHandler(async (req, res, next) => {
  const { NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      exipres: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfull",
    });
});

module.exports = {
  register,
  signIn,
  logout,
};
