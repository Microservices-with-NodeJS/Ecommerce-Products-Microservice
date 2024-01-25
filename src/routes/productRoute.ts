import express from "express";
import * as productController from "../controller/productController";
import {
  verifyTokenAndAdminMiddleware,
  verifyTokenMiddleware,
} from "../middlewares/jwtMiddlewares";

const router = express.Router();

// Create new product
router.post(
  "/",
  verifyTokenAndAdminMiddleware,
  productController.createProduct
);

// Get all product
router.get("/", verifyTokenMiddleware, productController.getAllProducts);

// Get product by id
router.get("/:id", verifyTokenMiddleware, productController.getProductById);

// Update product by id
router.put(
  "/:id",
  verifyTokenAndAdminMiddleware,
  productController.updateProduct
);

// Delete product by id
router.delete(
  "/:id",
  verifyTokenAndAdminMiddleware,
  productController.deleteProduct
);

export default router;
