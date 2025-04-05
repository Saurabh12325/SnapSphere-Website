import express from 'express';
import isAuthenticated from '../Middleware/isAuthenticated.js';
import { addComment, addPost, bookmarkPost, deletePost, DislikePost, getAllPosts, getCommentsOfPost, getUserPosts, likePost } from '../Controller/post.controller.js';
import upload from '../Middleware/multer';
const router = express.Router();


router.route('/addPost').post(isAuthenticated, upload.single('image'), addPost);
router.route('/all').get(isAuthenticated, getAllPosts);
router.route('userpost/all').post(isAuthenticated, getUserPosts);
router.route('/:id/like').post(isAuthenticated, likePost);
router.route('/:id/dislike').post(isAuthenticated, DislikePost);
router.route('/:id/comment').post(isAuthenticated, addComment);
router.route('/:id/comment/all').get(isAuthenticated, getCommentsOfPost);
router.route('/delete/:id').post(isAuthenticated, deletePost);
router.route('/:id/bookmark').post(isAuthenticated, bookmarkPost);
export default router;