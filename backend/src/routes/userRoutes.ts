import { Router } from 'express';
import { createUser, deleteUser, listUsers } from '../controllers/userController';

const router = Router();

router.post('/users', createUser);
router.delete('/users/:id', deleteUser);
router.get('/users', listUsers)

export default router;
