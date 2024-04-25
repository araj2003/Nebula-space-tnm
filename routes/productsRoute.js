const express = require("express");
const productController = require("./../controllers/productController");
const cartController = require("./../controllers/cartController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/names", productController.getProductNames);
router.get("/all", productController.getAllProducts);
router.get("/onHomepage", productController.getProductsOnHomepage);
router.get("/:subcategoryid", productController.getProductbySubcatid);
router.get("/one/:id", productController.getProductbyid);

router.use(authController.protect);

router.post("/one/:productid/addtocart", cartController.addItemToCart);
router.post("/addtocart", cartController.addItemToCart);

module.exports = router;
