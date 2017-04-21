"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../../app/model/user");
function login(req, res, next) {
    var body = req.body;
    var email = body.email, password = body.password;
    user_1.default.findOne({ email: body.email }, function (err, user) {
        if (err)
            return res.json({ success: false, data: null, error: err });
        if (!user)
            return res.json({ success: false, data: null, error: 'Email is invalid' });
        if (user.comparePassword(password)) {
            return res.json({ success: true, data: user, error: null });
        }
        else {
            res.json({
                success: false, data: null, error: 'Password is not Match'
            });
        }
    });
}
exports.login = login;
function register(req, res, next) {
    var body = req.body;
    var firstName = body.firstName, lastName = body.lastName, email = body.email, password = body.password;
    var user = new user_1.default(body);
    user_1.default.findOne({ email: body.email }, function (err, exist) {
        if (err)
            return res.json({ success: false, data: null, error: 'Error' });
        if (exist)
            return res.json({ success: false, data: null, error: 'Email is already exist' });
        user.save(function (err) {
            if (err) {
                res.json({
                    success: false, data: null, error: err
                });
            }
            else {
                res.status(200).json({
                    success: true, data: user._id, error: null
                });
            }
        });
    });
}
exports.register = register;
function social(req, res, next) {
    user_1.default.findOne({ socialID: req.body.socialID }, function (err, user) {
        if (err) {
            var body = req.body;
            var firstName = body.firstName, lastName = body.lastName, email = body.email, password = body.password, userName = body.userName, profile = body.profile, socialID = body.socialID;
            var user_2 = new user_1.default(body);
            user_2.save(function (err, user) {
                if (err) {
                    res.status(400).json({
                        message: 'Error'
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
exports.social = social;
