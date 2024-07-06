import express from 'express';
import { getUsers,getUser,updateUser, deleteUser } from '../controllers/userControl.js';
import verifyToken from '../middleware/tokenVerification.js';

const router = express.Router();

console.log("entering user.js routing file");

router.get('/', getUsers);
router.get('/:id', verifyToken ,getUser);
router.put('/:id', verifyToken, updateUser); 
router.delete("/:id", verifyToken, deleteUser);

export default router;
