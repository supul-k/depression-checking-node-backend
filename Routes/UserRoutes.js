import express from 'express'
import * as UserController from '../Controllers/UserController.js';
const router = express.Router();
import * as JwtService  from '../Services/JwtService.js';
  
router.post("/register_user" , UserController.RegisterUser);
router.post("/login", UserController.Login);

export default router;