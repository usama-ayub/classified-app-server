"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    title: String,
    description: String,
    imgName: String,
    category: String,
    createBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isLike: Boolean,
    createTime: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose.model('Post', PostSchema);
