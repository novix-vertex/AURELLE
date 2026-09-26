import { body } from "express-validator"

export const registerValidator = [

    body("name")
        .trim()
        .notEmpty().withMessage("Name is required"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required").bail()
        .isEmail().withMessage("Please enter a valid email"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),

    body("confirmPassword")
        .trim()
        .notEmpty().withMessage("Confirm Password is required"),
];