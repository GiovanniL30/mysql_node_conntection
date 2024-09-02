import express from "express";
import { loginController, registerController } from "../controllers/auth.js";

const authRoute = express.Router();

authRoute.post("/login", loginController);
authRoute.post("/register", registerController);

export default authRoute;
