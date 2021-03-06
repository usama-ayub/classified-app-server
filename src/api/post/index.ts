import * as express from 'express';
import * as multer from 'multer';
import { addPost, deletePost, updatePost, getAllPost, likePost, numberOfPost, getPostById, getPostByUserId, getPostByCategory, getPostByFeature } from './postController'
const router = express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })


router.get('/post', getAllPost);
router.get('/post/:post_id', getPostById);
router.get('/post/user/:user_id', getPostByUserId);
router.get('/post/category/:category', getPostByCategory);
router.get('/post/featureCategory/:feature', getPostByFeature);
router.post('/post/add', addPost);
//router.post('/post/add', upload.single('img'), addPost);
router.delete('/post/:post_id/delete', deletePost);
router.put('/post/update', updatePost);
router.put('/post/like', likePost);
router.post('/post/of/number', numberOfPost);

export default router;