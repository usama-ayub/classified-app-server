"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var post_1 = require("../../app/model/post");
function addPost(req, res, next) {
    var body = req.body;
    var user_id = body.user_id, posts = body.posts;
    var post = new post_1.default(body);
    post.save(function (err, updatedTank) {
        if (err) {
            return res.send(err);
        }
        else {
            res.status(200).json({
                data: { id: updatedTank }, message: 'Post Add!'
            });
        }
    });
}
exports.addPost = addPost;
function deletePost(req, res, next) {
    var body = req.body;
    var firstName = body.firstName, lastName = body.lastName, email = body.email, password = body.password;
    var user = new User(body);
    user.save(function (err, updatedTank) {
        if (err) {
            return res.send(err);
        }
        else {
            res.status(200).json({
                data: { id: updatedTank, }, message: 'User Created!!!'
            });
        }
    });
}
exports.deletePost = deletePost;
function updatePost(req, res, next) {
    User.findOne({ socialID: req.body.socialID }, function (err, user) {
        if (err) {
            var body = req.body;
            var firstName = body.firstName, lastName = body.lastName, email = body.email, password = body.password, userName = body.userName, profile = body.profile, socialID = body.socialID;
            var user_1 = new User(body);
            user_1.save(function (err, user) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.status(200).json({
                        data: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            profile: user.profile,
                            userName: user.userName
                        }, message: 'User created!'
                    });
                }
            });
        }
        else {
            res.status(200).json({
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    profile: user.profile,
                    userName: user.userName
                }, message: 'User Get Success'
            });
        }
    });
}
exports.updatePost = updatePost;
