import express from 'express';
import {verifyToken} from "../middleware/tokenVerification.js"
import { getPosts, getPost, addPost, putPost, deletePost } from '../controllers/postControl.js';
const router = express.Router();

router.get("/",getPosts);
router.get("/:postId",getPost);

router.post("/", verifyToken, addPost);
router.put("/:postId",verifyToken, putPost);
router.delete("/:postId",verifyToken, deletePost);

export default router;
