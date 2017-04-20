import * as express from 'express';
import * as shortid from 'shortid';
import * as nodemailer from 'nodemailer';
import User from '../../app/model/user';
import config from '../../config/config';


export function getAllUser(req, res, next) {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ message: 'Users Not Found' })
        } else {
            res.status(200).json({ message: 'Users Found', data: users })
        }
    })
}

export function getUserById(req, res, next) {
    let params = req.params;
    let { user_id } = params;
    User.findById(params.user_id, (err, user) => {
        if (err) {
            return res.status(400).json({ message: 'User Not Found' })
        } else {
            res.status(200).json({ message: 'User Found', data: user })
        }
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
            return res.status(400).json({ message: 'Error' })
        }
        else {
            return res.status(200).json({ message: 'Change Password Successfully' })
        }
    })
}

export function resetPassword(req, res, next) {
    let body = req.body;
    let { email } = body;
    User.findOne({ email: body.email }, (err, user) => {
        if (err) return res.status(400).json({ message: 'Error' });
        else if (!user) {
            return res.status(200).json({ message: "user not found" })
        }
        else {
            let password = shortid.generate()
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: config.user,
                    pass: config.pass
                }
            });
            let mailOptions = {
                from: 'usamaayub2012@gmail.com',
                to: body.email,
                subject: 'Password Reset',
                text: 'Hello world ?',
                html: `<b>Hello world ?</b>${password}`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(400).json({ message: error });
                } else {
                    return res.status(200).json({ message: info });
                }
            });
        };
    })
}