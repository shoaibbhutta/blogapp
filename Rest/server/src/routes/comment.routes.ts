import express from "express";
const router = express.Router();
import { postAddComment, getComments } from "../controller/comment.controller";
import { isAuthenticated } from "../utils/auth";

router.post("/addComment/:id", isAuthenticated, postAddComment); //id is post id and it is required
// router.delete("/role/:id", isAuthenticated, deleteRole);
router.get("/getComment/", isAuthenticated, getComments);
export default router;
