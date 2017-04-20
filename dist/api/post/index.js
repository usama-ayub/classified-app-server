"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var postController_1 = require("./postController");
var router = express.Router();
router.post('/post/add', postController_1.addPost);
router.post('/post/delete', postController_1.deletePost);
router.post('/post/update', postController_1.updatePost);
exports.default = router;
