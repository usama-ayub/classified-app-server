import * as express from 'express';
import { addPost, deletePost, updatePost } from './postController'
const router = express.Router();

router.post('/post/add', addPost);
router.post('/post/delete', deletePost);
router.post('/post/update', updatePost);

export default router;