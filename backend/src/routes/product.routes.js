import express from "express"
import { createProductController, getAllProductsController, getProductByIdController } from "../controllers/product.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js"
const productRouter = express.Router();

productRouter.post("/create", authenticateUser, upload.array("images", 5), createProductController);
productRouter.get("/get-all-products", getAllProductsController);
productRouter.get("/get-product-by-id/:id", getProductByIdController);

export default productRouter