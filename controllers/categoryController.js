const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const catchAsyncErrors = require("./../utils/catchAsyncError");

//Create New category
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const categoryName = req.body.categoryName;

    // Check if the categoryName already exists in the database (case-insensitive)
    const existingCategory = await Category.findOne({
      categoryName: { $regex: new RegExp(`^${categoryName}$`, "i") },
    });

    // console.log(existingCategory);

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category type already exists",
      });
    }

    // Create a new category type
    const categoryT = await Category.create({
      categoryName,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      categoryT,
    });
  } catch (error) {
    next(error);
  }
});

//get all  category types
exports.allCategoryTypes = catchAsyncErrors(async (req, res, next) => {
  const categoryT = await Category.find();
  res.status(200).json({
    success: true,
    categoryT,
  });
});

//update category  type
exports.updateCategoryType = async (req, res, next) => {
  try {
    const categoryT = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      categoryT,
    });
  } catch (error) {
    next(error);
  }
};

//delete category type
exports.deleteCategoryType = async (req, res, next) => {
  try {
    const categoryT = await Category.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      categoryT,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCatsAndSubcats = catchAsyncErrors(async (req, res, next) => {
  const AllCategory = await Category.find();
  const AllSubcategory = await SubCategory.find();
  const result = AllCategory.map((category) => {
    const subcategoriesForCategory = AllSubcategory.filter(
      (subcategory) => subcategory.category == category.id
    ).map((subcategory) => ({
      id: subcategory._id,
      name: subcategory.subCategoryName,
      imageUrl: subcategory.imageUrl,
    }));

    return {
      id: category._id,
      name: category.categoryName,
      subcategories: subcategoriesForCategory,
    };
  });

  res.status(200).json({
    success: true,
    result: result,
  });
});
