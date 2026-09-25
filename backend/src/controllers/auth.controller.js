import bcrypt from "bcryptjs"
import userModel from "../models/user.model.js"
import { generateAccessToken, genereateRefreshToken } from "../utility/token.js";
import { config } from "../config/config.js"
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

        const isUserExisted = await userModel.findOne({ email });

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

export const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const user = await userModel.findOne({ email }).select("+passwordHash");
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = genereateRefreshToken(user._id);

        user.refreshTokenHash = refreshToken;
        user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: config.ACCESS_TOKEN_EXPIRES_IN * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User login successfully.",
            accessToken,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            }
        })
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            message: error.message
        })
    }
}