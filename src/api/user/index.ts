import * as express from 'express';
import * as multer from 'multer';
import { getAllUser, getUserById, changePassword, resetPassword,userUpdateProfile } from './userController'
const router = express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profile/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

router.get('/user', getAllUser);
router.get('/user/:user_id', getUserById);
router.put('/user/updateProfile', upload.single('img'), userUpdateProfile);
router.post('/user/changePassword', changePassword);
router.post('/user/resetPassword', resetPassword);

export default router;