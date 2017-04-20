"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shortid = require("shortid");
var nodemailer = require("nodemailer");
var user_1 = require("../../app/model/user");
var config_1 = require("../../config/config");
function getAllUser(req, res, next) {
    user_1.default.find({}, function (err, users) {
        if (err) {
            return res.status(400).json({ message: 'Users Not Found' });
        }
        else {
            res.status(200).json({ message: 'Users Found', data: users });
        }
    });
}
exports.getAllUser = getAllUser;
function getUserById(req, res, next) {
    var params = req.params;
    var user_id = params.user_id;
    user_1.default.findById(params.user_id, function (err, user) {
        if (err) {
            return res.status(400).json({ message: 'User Not Found' });
        }
        else {
            res.status(200).json({ message: 'User Found', data: user });
        }
    });
}
exports.getUserById = getUserById;
function changePassword(req, res, next) {
    var body = req.body;
    var user_id = body.user_id, oldPassword = body.oldPassword, changePassword = body.changePassword;
    var data = {
        password: body.oldPassword,
        changePassword: body.changePassword
    };
    user_1.default.findByIdAndUpdate({ _id: body.user_id }, data, function (err, result) {
        if (err) {
            return res.status(400).json({ message: 'Error' });
        }
        else {
            return res.status(200).json({ message: 'Change Password Successfully' });
        }
    });
}
exports.changePassword = changePassword;
function resetPassword(req, res, next) {
    var body = req.body;
    var email = body.email;
    user_1.default.findOne({ email: body.email }, function (err, user) {
        if (err)
            return res.status(400).json({ message: 'Error' });
        else if (!user) {
            return res.status(200).json({ message: "user not found" });
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
                    return res.status(400).json({ message: error });
                }
                else {
                    return res.status(200).json({ message: info });
                }
            });
        }
        ;
    });
}
exports.resetPassword = resetPassword;
