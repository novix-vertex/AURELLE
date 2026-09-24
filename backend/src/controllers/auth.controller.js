import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const registerController = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;


        if (password != confirmPassword) {
            return res.status(400).json({
                message: "Passord and confirm password do not matched"
            });
        }

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const isUserExisted = await userModel.findOne({email});

        if (isUserExisted) {
            return res.status(409).json({
                message: "User already existed with this email address"
            })
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            passwordHash
        })
        return res.status(201).json({
            message: "User registered successfully.",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        })

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({
            message: error.message
        })
    }
}