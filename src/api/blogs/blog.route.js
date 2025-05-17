import { Router } from "express";
import { getPosts, createPosts, getPostById, updatePost, deletePost } from "./blog.controller.js";

const router = Router();

router.get('/', getPosts)
router.get('/:postId', getPostById)
router.post('/', createPosts)
router.put('/:postId', updatePost)
router.delete('/:postId', deletePost)

export default router