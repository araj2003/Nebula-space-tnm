const AppError = require("../utils/appError");
const catchAsyncErrors = require("../utils/catchAsyncError");
const User = require("../models/userModel");
const factory = require("./handleFactory");
const Address = require("../models/address");
//Get User Details

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

//update User Profile
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsyncErrors(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email", "address");
  if (req.file) filteredBody.photo = req.file.filename;
  // console.log(filteredBody.address);
  if (filteredBody.address) {
    if (req.user.address) {
      const updatedAddress = await Address.findByIdAndUpdate(
        req.user.address,
        filteredBody.address,
        {
          new: true,
          runValidators: true,
        }
      );
      filteredBody.address = updatedAddress._id;
    } else {
      const newAddress = await Address.create(filteredBody.address);
      filteredBody.address = newAddress._id;
    }
  }
  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// Delete me
exports.deleteMe = catchAsyncErrors(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};
//Get all Users (admin)

exports.getAllUsers = factory.getAll(User);

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("address")
    .select("name email address role animals");
  res.status(200).json({
    status: "success",
    data: {
      User: user,
    },
  });
};
// exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

// exports.getAllCartItems = catchAsyncErrors(async (req, res, next) => {});

// exports.getCartItem = catchAsyncErrors(async (req, res, next) => {});

// exports.addCartItem = catchAsyncErrors(async (req, res, next) => {});

// exports.updateCartItem = catchAsyncErrors(async (req, res, next) => {});

// exports.deleteCartItem = catchAsyncErrors(async (req, res, next) => {});
