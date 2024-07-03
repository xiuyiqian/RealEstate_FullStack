import express from 'express';
import { login, logout, register } from '../controllers/authControl.js';

const router = express.Router();

console.log("entering auth.js file");

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout); // Corrected path from /logouts to /logout

export default router;
