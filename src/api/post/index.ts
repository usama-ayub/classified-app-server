import * as express from 'express';
import { addPost, deletePost, updatePost, getAllPost, likePost, numberOfPost, getPostById, getPostByUserId } from './postController'
const router = express.Router();

router.get('/post', getAllPost);
router.get('/post/:post_id', getPostById);
router.get('/posts', getPostByUserId);
router.post('/post/add', addPost);
router.delete('/post/:post_id/delete', deletePost);
router.put('/post/update', updatePost);
router.put('/post/like', likePost);
router.post('/post/of/number', numberOfPost);

export default router;