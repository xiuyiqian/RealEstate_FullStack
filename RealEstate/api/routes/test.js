import express from 'express';
import { shouldLogin,shouldAdmin, shouldLogout } from '../controllers/testControl.js';
import verifyToken from '../middleware/tokenVerification.js';
const router = express.Router();

router.get('/shouldLogin', verifyToken, shouldLogin);
router.get('/shouldAdmin', shouldAdmin);
router.get('/shouldLogout', shouldLogout);

export default router;
