import express from "express";
const router = express.Router();
import { postAddRole, deleteRole } from "../controller/role.controller";
import { isAuthenticated } from "../utils/auth";

router.post("/addRole", isAuthenticated, postAddRole);
router.delete("/role/:id", isAuthenticated, deleteRole);

export default router;
