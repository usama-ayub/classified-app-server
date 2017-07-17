"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var post_1 = require("../../app/model/post");
function getAllPost(req, res, next) {
    post_1.default.find({}, function (err, post) {
        if (err) {
            return res.json({ success: false, data: null, error: 'Post Not Found' });
        }
        else {
            return res.json({ success: true, data: post, error: null });
        }
    });
}
exports.getAllPost = getAllPost;
function getPostById(req, res, next) {
    var params = req.params;
    var post_id = params.post_id;
    console.log("req", req.params);
    post_1.default.findById(params.post_id, function (err, post) {
        if (err) {
            return res.json({ success: false, data: null, error: 'Post Not Found' });
        }
        else {
            return res.json({ success: true, data: post, error: null });
        }
    });
}
exports.getPostById = getPostById;
function getPostByUserId(req, res, next) {
    var params = req.params;
    var user_id = params.user_id;
    post_1.default.find({ createBy: params.user_id }, function (err, post) {
        if (err) {
            return res.json({ success: false, data: null, error: 'User Post Not Found' });
        }
        else {
            return res.json({ success: true, data: post, error: null });
        }
    });
}
exports.getPostByUserId = getPostByUserId;
function getPostByCategory(req, res, next) {
    var params = req.params;
    var category = params.category;
    post_1.default.find({ category: params.category }, function (err, post) {
        if (err) {
            return res.json({ success: false, data: null, error: 'This Category Not Found' });
        }
        else {
            return res.json({ success: true, data: post, error: null });
        }
    });
}
exports.getPostByCategory = getPostByCategory;
function getPostByFeature(req, res, next) {
    var params = req.params;
    var feature = params.feature;
    post_1.default.find({ feature: params.feature }, function (err, post) {
        if (err) {
            return res.json({ success: false, data: null, error: 'This Feature Not Found' });
        }
        else {
            return res.json({ success: true, data: post, error: null });
        }
    });
}
exports.getPostByFeature = getPostByFeature;
function addPost(req, res, next) {
    console.log(req.file);
    var body = req.body;
    var createBy = body.createBy, description = body.description;
    /* let { createBy, title, description, isLike, category, imgName } = body;
    body.imgName = req.file.destination + req.file.originalname; */
    var post = new post_1.default(body);
    post.save(function (err) {
        if (err) {
            return res.json({ success: false, data: null, error: 'Error' });
        }
        else {
            return res.json({ success: true, data: post, error: null });
        }
    });
}
exports.addPost = addPost;
function deletePost(req, res, next) {
    var params = req.params;
    var post_id = params.post_id;
    post_1.default.findByIdAndRemove({ _id: params.post_id }, function (err, result) {
        if (err) {
            return res.json({ success: false, data: null, error: err });
        }
        else {
            return res.json({ success: true, data: 'Remove Post Successfully', error: null });
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
    var post_id = body.post_id, isLike = body.isLike;
    post_1.default.findByIdAndUpdate({ _id: body.post_id }, { isLike: body.isLike }, function (err, result) {
        if (err) {
            return res.json({ success: false, data: null, error: 'Error' });
        }
        else {
            return res.json({ success: true, data: 'Post Like', error: null });
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
