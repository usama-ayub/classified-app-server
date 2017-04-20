"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var post_1 = require("../../app/model/post");
function getAllPost(req, res, next) {
    post_1.default.find({}, function (err, users) {
        if (err) {
            return res.status(400).json({ message: 'Post Not Found' });
        }
        res.status(200).json({ message: 'All Post Found', data: users });
    });
}
exports.getAllPost = getAllPost;
function getPostById(req, res, next) {
    var params = req.params;
    var post_id = params.post_id;
    post_1.default.findById(params.post_id, function (err, user) {
        if (err) {
            return res.status(400).json({ message: 'User Not Found' });
        }
        else {
            res.status(200).json({ message: 'User Found', data: user });
        }
    });
}
exports.getPostById = getPostById;
function addPost(req, res, next) {
    var body = req.body;
    var createBy = body.createBy, posts = body.posts, isLike = body.isLike;
    var post = new post_1.default(body);
    post.save(function (err) {
        if (err) {
            return res.status(200).json({
                message: 'Error'
            });
        }
        else {
            res.status(200).json({
                id: post._id,
                message: 'Post Add!'
            });
        }
    });
}
exports.addPost = addPost;
function deletePost(req, res, next) {
    var params = req.params;
    var post_id = params.post_id;
    post_1.default.findByIdAndRemove({ _id: params.post_id }, function (err, result) {
        if (err) {
            return res.status(400).json({ message: 'Error' });
        }
        else {
            return res.status(200).json({ message: 'Remove Post Successfully' });
        }
    });
}
exports.deletePost = deletePost;
function updatePost(req, res, next) {
    var body = req.body;
    var post_id = body.post_id, posts = body.posts;
    post_1.default.findByIdAndUpdate({ _id: body.post_id }, { posts: body.posts }, function (err, result) {
        if (err) {
            return res.status(400).json({ message: 'Error' });
        }
        else {
            return res.status(200).json({ message: 'Post Update Successfully' });
        }
    });
}
exports.updatePost = updatePost;
function likePost(req, res, next) {
    var body = req.body;
    var post_id = body.post_id, postLike = body.postLike;
    post_1.default.findByIdAndUpdate({ _id: body.post_id }, { postLike: body.postLike }, function (err, result) {
        if (err) {
            return res.status(400).json({ message: 'Error' });
        }
        else {
            return res.status(200).json({ message: 'Post Like' });
        }
    });
}
exports.likePost = likePost;
function numberOfPost(req, res, next) {
    var body = req.body;
    var user_id = body.user_id;
    post_1.default.count({ createBy: body.user_id }, function (err, count) {
        if (err) {
            return res.status(400).json({ message: 'Error' });
        }
        else {
            return res.status(200).json({ message: count });
        }
    });
}
exports.numberOfPost = numberOfPost;
