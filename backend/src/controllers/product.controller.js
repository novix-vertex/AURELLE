import imagekit from "../config/imagekit.js";
import productModel from "../models/product.model.js";
import { toFile } from "@imagekit/nodejs";

export const createProductController = async (req, res) => {
    let product = null;
    const uploadedImages = [];

    try {
        const { name, description, price, category, size, stock } = req.body;
        const files = req.files || [];

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

        const updatedProduct = await productModel.findByIdAndUpdate(product._id, { images: uploadedImages }, { returnDocument: "after" });

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

export const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find();
        console.log(products);
        return res.status(200).json({
            message: "Products fetched successfully",
            data: {
                products
            }
        })
    } catch (error) {
        console.error("Get All Products Error:", error);
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Product id required"
            });
        }
        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product found successfully",
            data: {
                product
            }
        })

    } catch (error) {
        console.error("Get Product By Id Error:", error);
        return res.status(500).json({
            message: error.message
        })
    }
}

export const updateProductByIdController = async (req, res) => {
    let uploadedImages = [];

    try {
        const { id } = req.params;

        const { name, description, price, category, size, stock } = req.body;
        const files = req.files || [];

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (files.length > 0) {
            const folder = `/Aurelle/products/${product._id}`;

            for (const file of files) {
                const result = await imagekit.files.upload({
                    file: await toFile(
                        file.buffer,
                        file.originalname
                    ),
                    fileName: "img-" + Date.now() + file.originalname,
                    folder
                });

                uploadedImages.push({
                    url: result.url,
                    fileId: result.fileId
                });
            }

            for (const image of product.images) {
                try {
                    await imagekit.files.delete(image.fileId);
                } catch (error) {
                    console.error(error.message);
                }
            }
            product.images = uploadedImages;

        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.category = category;
        product.size = size;
        product.stock = stock;

        await product.save();

        return res.status(200).json({
            message: "Product updated successfully",
            data: { product }
        });
    } catch (error) {
        console.error("Update Product Error:", error);
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const folderPath = `/Aurelle/products/${product._id}`;
        try {
            await imagekit.folders.delete({
                folderPath
            });
        } catch (error) {
            console.error(error.message);
        }

        await productModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Product deleted successfully"
        })

    } catch (error) {
        console.error("Delete Product By Id Error:", error);
        return res.status(500).json({
            message: error.message
        })
    }
}