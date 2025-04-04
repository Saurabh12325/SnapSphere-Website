import express from 'express';
import { login, logout, register } from '../Controller/user.controller.js';
import isAuthenticated from '../Middleware/isAuthenticated.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/:id/profile').get(isAuthenticated,getProfile)
router.route('/profile/edit').post(isAuthenticated,getProfile)
