"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../../app/model/user");
function getAllUser(req, res, next) {
    user_1.default.find({}, function (err, users) {
        if (err) {
            return res.status(400).json({ message: 'Users Not Found' });
        }
        res.status(200).json({ message: 'Users Found', data: users });
    });
}
exports.getAllUser = getAllUser;
function getUserById(req, res, next) {
    var user_id = req.params;
    user_1.default.findById(user_id, function (err, user) {
        if (err) {
            return res.status(400).json({ message: 'User Not Found' });
        }
        res.status(200).json({ message: 'User Found', data: user });
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
            return res.status(400).send({ message: 'Error' });
        }
        else {
            return res.status(200).send({ message: 'Change Password Successfully' });
        }
    });
}
exports.changePassword = changePassword;
