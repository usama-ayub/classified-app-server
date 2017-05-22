"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shortid = require("shortid");
var nodemailer = require("nodemailer");
var user_1 = require("../../app/model/user");
var config_1 = require("../../config/config");
function getAllUser(req, res, next) {
    user_1.default.find({}, function (err, users) {
        if (err) {
            return res.json({ success: false, data: null, error: 'Users Not Found' });
        }
        else {
            return res.json({ success: true, data: users, error: null });
        }
    });
}
exports.getAllUser = getAllUser;
function getUserById(req, res, next) {
    var params = req.params;
    var user_id = params.user_id;
    user_1.default.findById(params.user_id, function (err, user) {
        if (err) {
            return res.json({ success: false, data: null, error: 'User Not Found' });
        }
        else {
            return res.json({ success: true, data: user, error: null });
        }
    });
}
exports.getUserById = getUserById;
function userUpdateProfile(req, res, next) {
    console.log(req.file);
    var body = req.body;
    var user_id = body.user_id, userName = body.userName, profileName = body.profileName, firstName = body.firstName, lastName = body.lastName;
    body.profileName = req.file.destination + req.file.originalname;
    var data = {
        userName: body.userName,
        profileName: body.profileName,
        firstName: body.firstName,
        lastName: body.lastName
    };
    user_1.default.findByIdAndUpdate(body.user_id, data, function (err, update) {
        if (err) {
            return res.json({ success: false, data: null, error: err });
        }
        else {
            return res.json({ success: true, data: update, error: null });
        }
    });
}
exports.userUpdateProfile = userUpdateProfile;
function changePassword(req, res, next) {
    var body = req.body;
    var user_id = body.user_id, oldPassword = body.oldPassword, newPassword = body.newPassword;
    user_1.default.findOne({ _id: body.user_id }, function (err, user) {
        if (err)
            return res.json({ success: false, data: null, error: err });
        if (!user)
            return res.json({ success: false, data: null, error: 'User is invalid' });
        if (user.comparePassword(oldPassword)) {
            user.password = newPassword;
            user.save(function (err) {
                if (err) {
                    return res.json({ success: false, data: null, error: err });
                }
                else {
                    return res.json({ success: true, data: "Password Successful Change", error: null });
                }
            });
        }
        else {
            return res.json({ success: false, data: null, error: 'Old Password is not Match' });
        }
    });
}
exports.changePassword = changePassword;
function resetPassword(req, res, next) {
    var body = req.body;
    var email = body.email;
    user_1.default.findOne({ email: body.email }, function (err, user) {
        if (err)
            return res.json({ success: false, data: null, error: err });
        else if (!user) {
            return res.json({ success: false, data: null, error: "user not found" });
        }
        else {
            var password = shortid.generate();
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: config_1.default.user,
                    pass: config_1.default.pass
                }
            });
            var mailOptions = {
                from: 'usamaayub2012@gmail.com',
                to: body.email,
                subject: 'Password Reset',
                text: 'Hello world ?',
                html: "<b>Hello world ?</b>" + password
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return res.json({ success: false, data: null, error: err });
                }
                else {
                    return res.json({ success: true, data: info, error: null });
                }
            });
        }
        ;
    });
}
exports.resetPassword = resetPassword;
