import bcrypt from "bcryptjs"
import userModel from "../models/user.model.js"
import { generateAccessToken, genereateRefreshToken, hashRefreshToken } from "../utility/token.js";
import { config } from "../config/config.js"
import jwt from "jsonwebtoken"

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
        const refreshTokenHash = await hashRefreshToken(refreshToken);

        user.refreshTokenHash = refreshTokenHash;
        await user.save();

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

export const getMeController = async (req, res) => {
    res.json({
        message: "Authenticated",
        data: {
            user: req.user
        }
    })
}

export const refreshTokenController = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                message: "Refresh token is required"
            })
        }

        const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
        const user = await userModel.findById(decoded.id).select("+refreshTokenHash");

        if (!user || !user.refreshTokenHash) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }

        const isTokenValid = await bcrypt.compare(token, user.refreshTokenHash);

        if (!isTokenValid) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }

        const newAccessToken = generateAccessToken(user._id);
        const refreshToken = genereateRefreshToken(user._id);
        const refreshTokenHash = await hashRefreshToken(refreshToken);

        user.refreshTokenHash = refreshTokenHash;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: config.ACCESS_TOKEN_EXPIRES_IN * 24 * 60 * 60 * 1000
        });


        return res.status(200).json({
            accessToken: newAccessToken
        })

    } catch (error) {
        console.error("Refresh Token Error:", error);
        res.status(500).json({
            message: "Refresh token is expired"
        })
    }
}

export const logoutController = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({
                message: "Refresh token required"
            });
        }

        const decoded = jwt.verify(
            token,
            config.REFRESH_TOKEN_SECRET
        );

        const user = await userModel.findById(decoded.id).select("+refreshTokenHash");

        if (!user || !user.refreshTokenHash) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }

        const isTokenValid = await bcrypt.compare(token, user.refreshTokenHash);

        if (!isTokenValid) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }


        await userModel.findByIdAndUpdate(user._id, {
            refreshTokenHash: null
        });

        res.clearCookie("refreshToken", {
            httpOnly: true
        });

        return res.status(200).json({
            message: "User logged out successfully."
        })


    } catch (error) {
        console.error("Logout Error", error);
        res.status(500).json({
            message: error.message
        })
    }
}