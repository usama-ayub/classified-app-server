import * as express from 'express';
import { getAllUser, getUserById, changePassword } from './userController'
const router = express.Router();

router.get('/user', getAllUser);
router.get('/user/:user_id', getUserById);
router.get('/user/changePassword', changePassword);

export default router;