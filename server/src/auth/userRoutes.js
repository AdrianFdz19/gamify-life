// user/userRoutes.js
import { Router } from "express";
import { getUserProfile } from "./userControllers.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const users = Router();

users.get("/me", authenticate, getUserProfile);

export default users;
