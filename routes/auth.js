import express from "express";
import { loginContoller, registerController } from "../controllers/auth";

const authRoute = express.Router();

authRoute.post("/login", loginContoller);
authRoute.post("/register", registerController);
