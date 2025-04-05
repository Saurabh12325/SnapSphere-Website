import express from 'express';
import { getMessages, sendMessage } from '../Controller/message.controller.js';
import isAuthenticated from '../Middleware/isAuthenticated.js';

const router = express.Router();
router.route('/send/:id').post(isAuthenticated,sendMessage);
router.route('/get/:id').get(isAuthenticated,getMessages)

export default router;