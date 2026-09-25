import express from "express"
import { createProductController } from "../controllers/product.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js"
const productRouter = express.Router();

productRouter.post("/create", authenticateUser, upload.array("images", 5), createProductController);

export default productRouter