import express from 'express'
import * as ChatController from '../Controllers/ChatController.js';
import * as jwtService from '../Services/JwtService.js';
const router = express.Router();

router.post('/receive_message',jwtService.ValidateUser, ChatController.ReceiveMessage);
router.post('/evaluate',jwtService.ValidateUser, ChatController.EvaluateMessage);

export default router;