import * as express from 'express';
import { getAllUser, getUserById, changePassword, resetPassword } from './userController'
const router = express.Router();

router.get('/user', getAllUser);
router.get('/user/:user_id', getUserById);
router.put('/user/changePassword', changePassword);
router.post('/user/resetPassword', resetPassword);

export default router;