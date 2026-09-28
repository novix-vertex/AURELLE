import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

export const authenticateUser = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Access token is required"
            })
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Access token is required"
            })
        }

        const decoded = jwt.verify(
            token,
            config.ACCESS_TOKEN_SECRET
        )

        req.user = decoded;

        next();

    } catch (error) {
        console.error("Authenticate:", error);
        return res.status(401).json({
            message: "Invalid or expired access token"
        })
    }
}

export const authorizeSeller = (req, res, next) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({
            message: "Seller access required"
        });
    }

    next();
};

