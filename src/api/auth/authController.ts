import * as express from 'express';
import User from '../../app/model/user'
import config from '../../config/config';

export function login(req, res, next) {
    let body = req.body;
    let { email, password } = body;
    User.findOne({ email: body.email }, (err, user) => {
        if (err) return res.json({ success: false, data: null, error: err });
        if (!user) return res.json({ success: false, data: null, error: 'Email is invalid' });
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

export function register(req, res, next) {
    let body = req.body;
    let { firstName, lastName, email, password } = body;
    let user = new User(body);
    User.findOne({ email: body.email }, (err, exist) => {
        if (err) return res.json({ success: false, data: null, error: 'Error' });
        if (exist) return res.json({ success: false, data: null, error: 'Email is already exist' });
        user.save((err) => {
            if (err) {
                res.json({
                    success: false, data: null, error: err
                });
            } else {
                res.json({
                    success: true, data: user, error: null
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
                    return res.json({ success: false, data: null, error: err });
                }
                else {
                   return res.json({ success: true, data: user, error: null });
                }
            });
        }
        else {
             return res.json({ success: true, data: user, error: null });
        }

    });
}