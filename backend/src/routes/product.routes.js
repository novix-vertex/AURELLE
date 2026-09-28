import express from "express"
import { createProductController, deleteProductByIdController, getAllProductsController, getProductByIdController, getSellerProductsController, updateProductByIdController, updateProductStatusController } from "../controllers/product.controller.js";
import { authenticateUser, authorizeSeller } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js"
import { productIdValidator, productValidator } from "../validators/product.validators.js";
import validate from "../middlewares/validation.middleware.js";
const productRouter = express.Router();

productRouter.post("/", authenticateUser, authorizeSeller, upload.array("images", 5), productValidator, validate, createProductController);
productRouter.get("/seller", authenticateUser, authorizeSeller, getSellerProductsController);
productRouter.get("/", getAllProductsController);
productRouter.get("/:id", productIdValidator, validate, getProductByIdController);
productRouter.put("/:id", authenticateUser, authorizeSeller, upload.array("images", 5), productIdValidator, productValidator, validate, updateProductByIdController);
productRouter.delete("/:id", authenticateUser, authorizeSeller, productIdValidator, validate, deleteProductByIdController);
productRouter.patch("/:id/status", authenticateUser, authorizeSeller, productIdValidator, validate, updateProductStatusController);

export default productRouter    