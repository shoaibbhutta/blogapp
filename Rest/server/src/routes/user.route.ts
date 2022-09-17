import express from "express";
const router = express.Router();
import { updateUser } from "../controller/user.controller";
import { isAuthenticated } from "../utils/auth";
import { userImageHandler } from "../utils/imageUpload";

router.put("/edit", isAuthenticated, userImageHandler, updateUser);

export default router;
