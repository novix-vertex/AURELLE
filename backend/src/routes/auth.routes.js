import express from "express"
import { getMeController, loginController, logoutController, refreshTokenController, registerController } from "../controllers/auth.controller.js";
import authenticateUser from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/get-me", authenticateUser, getMeController);
authRouter.get("/refresh-token", refreshTokenController);
authRouter.post("/logout", logoutController);

export default authRouter