import imagekit from "../config/imagekit.js";
import productModel from "../models/product.model.js";
import { toFile } from "@imagekit/nodejs";

export const createProductController = async (req, res) => {
    let product = null;
    const uploadedImages = [];

    try {
        const { name, description, price, category, size, stock } = req.body;
        const files = req.files || [];

        if (!name || !description || !price || !category || !size || stock === undefined) {
            return res.status(400).json({
                message: "All product fields are required"
            });
        }

        product = await productModel.create({
            name,
            description,
            price,
            category,
            size,
            stock,
            images: []
        })

        const folder = `/Aurelle/products/${product._id}`;
        for (const file of files) {

            const result = await imagekit.files.upload({
                file: await toFile(file.buffer, file.originalname),
                fileName: "img-" + Date.now() + file.originalname,
                folder
            });

            uploadedImages.push({
                url: result.url,
                fileId: result.fileId
            });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(product._id, { images: uploadedImages }, { new: true });

        return res.status(201).json({
            message: "Product created successfully",
            updatedProduct
        });


    } catch (error) {
        console.error("Create Product Error:", error);
        return res.status(500).json({
            message: error.message
        })
    }

}