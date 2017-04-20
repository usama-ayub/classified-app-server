"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    posts: String,
    createBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isLike: Boolean,
    createTime: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('Post', PostSchema);
