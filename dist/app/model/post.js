"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    posts: String,
    numberOfPost: Number,
    createBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createTime: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('Post', PostSchema);
