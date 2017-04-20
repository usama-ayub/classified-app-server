import * as express from 'express';
import Post from '../../app/model/post'
import config from '../../config/config';

export function addPost(req, res, next) {
      let body = req.body;
        let { user_id, posts } = body;
        let post = new Post(body);
        post.save((err, updatedTank) => {
            if (err) {
                return res.send(err);
            } else {
                res.status(200).json({
                    data: { id: updatedTank }, message: 'Post Add!'
                });
            }
        });
}

export function deletePost(req, res, next) {
    let body = req.body;
    let { firstName, lastName, email, password } = body;
    let user = new User(body);
    user.save((err, updatedTank) => {
        if (err) {
            return res.send(err);
        } else {
            res.status(200).json({
                data: { id: updatedTank, }, message: 'User Created!!!'
            });
        }
    });
}

export function updatePost(req, res, next) {
    User.findOne({ socialID: req.body.socialID }, (err, user) => {
        if (err) {
            let body = req.body;
            let { firstName, lastName, email, password, userName, profile, socialID } = body;
            let user = new User(body);
            user.save((err, user) => {
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