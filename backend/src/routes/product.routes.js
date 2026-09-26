import express from "express"
import { createProductController, deleteProductByIdController, getAllProductsController, getProductByIdController, updateProductByIdController } from "../controllers/product.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js"
const productRouter = express.Router();

productRouter.post("/create", authenticateUser, upload.array("images", 5), createProductController);
productRouter.get("/get-all-products", getAllProductsController);
productRouter.get("/get-product-by-id/:id", getProductByIdController);
productRouter.put("/update-product-by-id/:id", authenticateUser, upload.array("images", 5), updateProductByIdController);
productRouter.delete("/delete-product-by-id/:id", authenticateUser, deleteProductByIdController);

export default productRouter