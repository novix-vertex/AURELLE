import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

const authenticateUser = (req, res, next) => {

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
        res.status(401).json({
            message: "Invalid or expired access token"
        })
    }
}

export default authenticateUser