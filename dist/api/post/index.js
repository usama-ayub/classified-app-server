"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require("multer");
var postController_1 = require("./postController");
var router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
router.get('/post', postController_1.getAllPost);
router.get('/post/:post_id', postController_1.getPostById);
router.get('/post/user/:user_id', postController_1.getPostByUserId);
router.post('/post/add', upload.single('postImg'), postController_1.addPost);
router.delete('/post/:post_id/delete', postController_1.deletePost);
router.put('/post/update', postController_1.updatePost);
router.put('/post/like', postController_1.likePost);
router.post('/post/of/number', postController_1.numberOfPost);
exports.default = router;
