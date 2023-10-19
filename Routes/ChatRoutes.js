import express from 'express'
import * as ChatController from '../Controllers/ChatController.js';
const router = express.Router();

router.post('/receive_message', ChatController.ReceiveMessage);

export default router;