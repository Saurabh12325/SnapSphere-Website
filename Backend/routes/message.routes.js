import express from 'express';
import { getMessages, sendMessage } from '../Controller/message.controller';
import isAuthenticated from '../Middleware/isAuthenticated';

const router = express.Router();
router.route('send/:id').post(isAuthenticated,sendMessage);
router.route('/get/:id').get(isAuthenticated,getMessages)

export default router;