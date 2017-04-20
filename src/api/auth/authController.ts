import * as express from 'express';
import User from '../../app/model/user'
import config from '../../config/config';

export function login(req, res, next) {
    let body = req.body;
    let { email, password } = body;
    User.findOne({ email: body.email }, (err, user) => {
        if (err) return res.status(404).json({ message: 'Error' });
        if (!user) return res.status(404).json({ message: 'Email is invalid' });
        if (user.comparePassword(password)) {
            res.status(200).json({
                data: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    profile: user.profile,
                    userName: user.userName
                }, message: 'login successfully'
            });
        }
        else {
            res.status(404).json({
                message: 'Password is not Match'
            });
        }
    });
}

export function register(req, res, next) {
    let body = req.body;
    let { firstName, lastName, email, password } = body;
    let user = new User(body);
    User.findOne({ email: body.email }, (err, exist) => {
        if (err) return res.status(400).json({ message: 'Error' });
        if (exist) return res.status(200).json({ message: 'Email is already exist' });
        user.save((err) => {
            if (err) {
                res.status(400).json({
                    message: err
                });
            } else {
                res.status(200).json({
                    id: user._id,
                    message: 'User Created!!!'
                });
            }
        });
    })
}

export function social(req, res, next) {
    User.findOne({ socialID: req.body.socialID }, (err, user) => {
        if (err) {
            let body = req.body;
            let { firstName, lastName, email, password, userName, profile, socialID } = body;
            let user = new User(body);
            user.save((err, user) => {
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