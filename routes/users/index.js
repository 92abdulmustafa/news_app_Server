const userRoutes = {};
const User = require("../../models/user");

userRoutes.signUp = async (req, res) => {
  const { name, email, authenticationId } = req.body;

  if (!name) {
    throw new Error("Name must be required!");
  }

  if (!email) {
    throw new Error("Email must be required!");
  }

  if (!authenticationId) {
    throw new Error("Something went wrong. Please try again!");
  }

  const newUser = new User({
    name,
    email,
    authenticationId,
  });

  await newUser.save();

  res.json({
    status: 200,
    success: true,
    data: {
      user: newUser,
    },
  });
};

userRoutes.login = async (req, res) => {
  const { authenticationId } = req.body;
  const findedUser = await User.findOne({ authenticationId }).lean();

  res.json({
    status: 200,
    success: true,
    data: {
      user: findedUser,
    },
  });
};

userRoutes.editProfile = async (req, res) => {
  const { name, address, paymentDetails, picture, mongodbId } = req.body;

  const findedUser = await User.findOne({ _id: mongodbId }).lean();

  if (!findedUser) {
    throw new Error("Something went wrong. Please try again!");
  }

  const updatedUser = await User.findByIdAndUpdate(
    mongodbId,
    {
      name,
      address,
      picture,
      paymentDetails,
    },
    { new: true }
  );

  res.json({
    status: 200,
    success: true,
    data: {
      user: updatedUser,
    },
  });
};

userRoutes.userFavourite = async (req, res) => {
  const { favouriteId, mongodbId } = req.body;

  const findedUser = await User.findOne({ _id: mongodbId }).lean();

  if (!findedUser) {
    throw new Error("Something went wrong. Please try again!");
  }

  let updatedUser = {};

  if (findedUser?.favourites?.includes?.(favouriteId)) {
    updatedUser = await User.findByIdAndUpdate(
      mongodbId,
      { $pull: { favourites: favouriteId } },
      { new: true }
    );
  } else {
    updatedUser = await User.findByIdAndUpdate(
      mongodbId,
      { $push: { favourites: favouriteId } },
      { new: true }
    );
  }

  res.json({
    status: 200,
    success: true,
    data: {
      user: updatedUser,
    },
  });
};

module.exports = userRoutes;
