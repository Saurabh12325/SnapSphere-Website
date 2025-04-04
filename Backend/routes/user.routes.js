import express from 'express';
import { editprofile, followUserOrUnfollow, getProfile, getSuggestedUsers, login, logout, register } from '../Controller/user.controller.js';
import isAuthenticated from '../Middleware/isAuthenticated.js';
import upload from '../Middleware/multer.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/:id/profile').get(isAuthenticated,getProfile)
router.route('/profile/edit').post(isAuthenticated,upload.single('profilePicture'),editprofile)
router.route('/suggested').get(isAuthenticated,getSuggestedUsers)
router.route('/followorunfollow/:id').post(isAuthenticated,followUserOrUnfollow)
export default router;