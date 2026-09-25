import jwt from "jsonwebtoken"
import { config } from "../config/config.js"

export const generateAccessToken = (userId) => {

    return jwt.sign(
        { userId },
        config.ACCESS_TOKEN_SECRET,
        {
            expiresIn: config.ACCESS_TOKEN_EXPIRES_IN + config.ACCESS_TOKEN_EXPIRES_UNIT
        }
    );

}


export const genereateRefreshToken = (userId) => {

    return jwt.sign(
        { userId },
        config.REFRESH_TOKEN_SECRET,
        {
            expiresIn: config.REFRESH_TOKEN_EXPIRES_IN + config.REFRESH_TOKEN_EXPIRES_UNIT
        }
    );

}