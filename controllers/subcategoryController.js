const SubCategory = require("./../models/subCategoryModel");
const catchAsyncErrors = require("./../utils/catchAsyncError");
const Category = require("../models/categoryModel");

//Create New subcategory
exports.createSubCategory = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body);
  try {
    const subCategoryName = req.body.subCategoryName;
    const imageUrl = req.body.imageUrl;
    const categoryName = req.body.categoryName;

    const category = await Category.findOne({
      categoryName: categoryName,
    }).populate("categoryName", "_id");
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }
    // console.log(category);

    // Check if the subcategoryName already exists in the database (case-insensitive)
    const existingSubCategory = await SubCategory.findOne({
      subCategoryName: { $regex: new RegExp(`^${subCategoryName}$`, "i") },
    });

    if (existingSubCategory) {
      return res.status(400).json({
        success: false,
        message: "Sub Category type already exists",
      });
    }

    // Create a new sub category type
    const categoryT = await SubCategory.create({
      subCategoryName,
      imageUrl,
      category: category._id,
    });
    categoryT.category = category;

    res.status(201).json({
      success: true,
      categoryT,
    });
  } catch (error) {
    next(error);
  }
});

//get all sub category types
exports.allSubCategoryTypes = catchAsyncErrors(async (req, res, next) => {
  // const Category = await Category.find({ categoryName: req.query.category });
  const subCategoryT = await SubCategory.find({
    category: req.params.categoryid,
  });

  // console.log(req.params);

  // console.log(req.query.categoryid);
  res.status(200).json({
    success: true,
    subCategoryT,
  });
});
exports.allSubCategory = catchAsyncErrors(async (req, res, next) => {
  // const Category = await Category.find({ categoryName: req.query.category });
  const subCategoryT = await SubCategory.find().populate("category");
  res.status(200).json({
    success: true,
    subCategoryT,
  });
});

//update Subcategory  type
exports.updateSubCategoryType = async (req, res, next) => {
  // console.log(req.body);
  try {
    const categoryName = req.body.categoryName;

    const category = await Category.findOne({
      categoryName: categoryName,
    }).populate("categoryName", "_id");
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }

    const categoryT = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { ...req.body, category: category._id },
      { new: true }
    ).populate("category");
    res.status(200).json({
      success: true,
      categoryT,
    });
  } catch (error) {
    next(error);
  }
};

//delete sub  category type
exports.deleteSubCategoryType = async (req, res, next) => {
  try {
    const SubCategoryT = await SubCategory.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      SubCategoryT,
    });
  } catch (error) {
    next(error);
  }
};
