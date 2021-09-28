const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");

const getSingleUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  return res.status(200).json({
    success: true,
    data: user,
  });
});
const getAllUsers = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find({}).populate("favorites");

  return res.status(200).json({
    success: true,
    data: users,
  });
});

module.exports = {
  getSingleUser,
  getAllUsers,
};
