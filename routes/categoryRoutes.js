const express = require("express");
const categoryController = require("./../controllers/categoryController");
const subCategoryController = require("./../controllers/subcategoryController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.get("/", categoryController.allCategoryTypes);
router.get("/all", categoryController.getCatsAndSubcats);
router.get("/:categoryid", subCategoryController.allSubCategoryTypes);

router.use(authController.protect);

router.use(authController.restrictTo("admin"));

router.post("/", categoryController.createCategory);
router
  .route("/:id")
  .patch(categoryController.updateCategoryType)
  .delete(categoryController.deleteCategoryType);

module.exports = router;
