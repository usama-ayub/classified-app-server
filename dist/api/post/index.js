"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var postController_1 = require("./postController");
var router = express.Router();
router.get('/post', postController_1.getAllPost);
router.get('/post/:post_id', postController_1.getPostById);
router.post('/post/add', postController_1.addPost);
router.delete('/post/:post_id/delete', postController_1.deletePost);
router.put('/post/update', postController_1.updatePost);
router.put('/post/like', postController_1.likePost);
router.post('/post/of/number', postController_1.numberOfPost);
exports.default = router;
