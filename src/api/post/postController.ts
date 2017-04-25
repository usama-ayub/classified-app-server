import * as express from 'express';
import Post from '../../app/model/post'
import config from '../../config/config';

export function getAllPost(req, res, next) {
    Post.find({}, (err, posts) => {
        if (err) {
            return res.json({ success: false, data: null, error: 'Post Not Found' })
        }
        else {
            return res.json({ success: true, data: posts, error: null })
        }
    })
}

export function getPostById(req, res, next) {
    let params = req.params;
    let { post_id } = params
    console.log("req", req.params)
    Post.findById(params.post_id, (err, post) => {
        if (err) {
            return res.json({ success: false, data: null, error: 'Post Not Found' })
        }
        else {
            return res.json({ success: true, data: post, error: null })
        }
    })
}

export function getPostByUserId(req, res, next) {
    let params = req.params;
    let { user_id } = params
    Post.find({ createBy: params.user_id }, (err, post) => {
        if (err) {
            return res.json({ success: false, data: null, error: 'User Post Not Found' })
        }
        else {
            return res.json({ success: true, data: post, error: null })
        }
    })
}

export function addPost(req, res, next) {
    //console.log(req.file)
    let body = req.body;
    let { createBy, name, description, isLike, category, img  } = body;
    body.img = req.file.originalname 
    //console.log(body)
    let post = new Post(body);
    post.save((err) => {
        if (err) {
            return res.json({ success: false, data: null, error: 'Error' });
        } else {
            return res.json({ success: true, data: post, error: null });
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
    let { post_id, isLike } = body;

    Post.findByIdAndUpdate({ _id: body.post_id }, { isLike: body.isLike }, (err, result) => {
        if (err) {
            return res.json({ success: false, data: null, error: 'Error' });
        }
        else {
            return res.json({ success: true, data: 'Post Like', error: null });
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