import * as express from 'express';
import { login, register, social } from './authController'
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/social', social);

export default router;