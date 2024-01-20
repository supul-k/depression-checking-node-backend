import express from 'express'
import * as ActivityController from '../Controllers/ActivityController.js';
import * as jwtService from '../Services/JwtService.js';
const router = express.Router();

router.post('/chat_activity', jwtService.ValidateUser, ActivityController.ChatActivityDefine);
router.post('/chat_activity_message', jwtService.ValidateUser, ActivityController.ActivityMessage);

export default router;