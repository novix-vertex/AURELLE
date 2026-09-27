import express from "express"
import { createProductController, deleteProductByIdController, getAllProductsController, getProductByIdController, updateProductByIdController } from "../controllers/product.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js"
import { productIdValidator, productValidator } from "../validators/product.validators.js";
import validate from "../middlewares/validation.middleware.js";
const productRouter = express.Router();

productRouter.post("/", authenticateUser, upload.array("images", 5), productValidator, validate, createProductController);
productRouter.get("/", getAllProductsController);
productRouter.get("/:id", productIdValidator, validate, getProductByIdController);
productRouter.put("/:id", authenticateUser, upload.array("images", 5), productIdValidator, productValidator, validate, updateProductByIdController);
productRouter.delete("/:id", authenticateUser, productIdValidator, validate, deleteProductByIdController);


export default productRouter    