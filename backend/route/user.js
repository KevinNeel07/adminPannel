import express from 'express';
const user = express.Router();

import { registerUser, loginUser } from '../controller/user_Controller.js'
import auth from '../middleware/auth.js'

user.post('/signUp', registerUser)
user.post('/signIn',loginUser)

export default user;