import * as express from 'express';
import User from '../../app/model/user';
import config from '../../config/config';

export function getAllUser(req, res, next) {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ message: 'Users Not Found' })
        }
        res.status(200).json({ message: 'Users Found', data: users })
    })
}

export function getUserById(req, res, next) {
    let user_id = req.params;
    User.findById(user_id, (err, user) => {
        if (err) {
            return res.status(400).json({ message: 'User Not Found' })
        }
        res.status(200).json({ message: 'User Found', data: user })
    })
}

export function changePassword(req, res, next) {
    let body = req.body;
    let { user_id, oldPassword, changePassword } = body;
    let data = {
        password: body.oldPassword,
        changePassword: body.changePassword
    }

    User.findByIdAndUpdate({ _id: body.user_id }, data, (err, result) => {
        if (err) {
            return res.status(400).send({ message: 'Error' })
        }
        else {
            return res.status(200).send({ message: 'Change Password Successfully' })
        }
    })
}