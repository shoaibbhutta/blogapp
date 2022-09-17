import { Router } from "express";
import authController from "../controller/auth.controller";
import { isAuthenticated } from "../utils/auth";
const router: Router = Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/loggedInUser", isAuthenticated, authController.getLoggedInUser);

export default router;
