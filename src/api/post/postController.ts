import * as express from 'express';
import Post from '../../app/model/post'
import config from '../../config/config';

export function getAllPost(req, res, next) {
    Post.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ message: 'Post Not Found' })
        }
        res.status(200).json({ message: 'All Post Found', data: users })
    })
}

export function getPostById(req, res, next) {
    let params = req.params;
    let { post_id } = params
    Post.findById(params.post_id, (err, user) => {
        if (err) {
            return res.status(400).json({ message: 'User Not Found' })
        }
        else {
            res.status(200).json({ message: 'User Found', data: user })
        }
    })
}

export function addPost(req, res, next) {
    let body = req.body;
    let { createBy, posts, isLike } = body;
    let post = new Post(body);
    post.save((err) => {
        if (err) {
            return res.status(200).json({
                message: 'Error'
            });
        } else {
            res.status(200).json({
                id: post._id,
                message: 'Post Add!'
            });
        }
    });
}

export function deletePost(req, res, next) {
    let params = req.params;
    let { post_id } = params;

    Post.findByIdAndRemove({ _id: params.post_id }, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error' })
        }
        else {
            return res.status(200).json({ message: 'Remove Post Successfully' })
        }
    })

}

export function updatePost(req, res, next) {
    let body = req.body;
    let { post_id, posts } = body;

    Post.findByIdAndUpdate({ _id: body.post_id }, { posts: body.posts }, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error' })
        }
        else {
            return res.status(200).json({ message: 'Post Update Successfully' })
        }
    })
}

export function likePost(req, res, next) {
    let body = req.body;
    let { post_id, postLike } = body;

    Post.findByIdAndUpdate({ _id: body.post_id }, { postLike: body.postLike }, (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'Error' })
        }
        else {
            return res.status(200).json({ message: 'Post Like' })
        }
    })
}

export function numberOfPost(req, res, next) {
    let body = req.body;
    let { user_id } = body;
    Post.count({ createBy: body.user_id }, function (err, count) {
        if (err) {
            return res.status(400).json({ message: 'Error' })
        } else {
            return res.status(200).json({ message: count })
        }
    });

}