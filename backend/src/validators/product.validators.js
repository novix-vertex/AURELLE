import { body } from "express-validator"

export const productValidator = [
    body("name")
        .trim()
        .notEmpty().withMessage("Product name is required"),

    body("description")
        .trim()
        .notEmpty().withMessage("Product description is required"),

    body("price")
        .notEmpty().withMessage("Price is required").bail()
        .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

    body("category")
        .trim()
        .notEmpty().withMessage("Category is required"),

    body("size")
        .trim()
        .notEmpty().withMessage("Size is required"),

    body("stock")
        .notEmpty().withMessage("Stock is required").bail()
        .isInt({ min: 0 }).withMessage("Stock must be a positive number")
];