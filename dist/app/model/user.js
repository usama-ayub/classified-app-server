"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    password: String,
    profileName: String,
    role: { type: String, default: "user" },
    createTime: {
        type: Date,
        default: Date.now
    },
    socialId: String
});
UserSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    var hash = bcrypt.hashSync(user.password, 5);
    user.password = hash;
    next();
});
UserSchema.methods = {
    comparePassword: function (password, cb) {
        var isMatch = bcrypt.compareSync(password, this.password);
        return isMatch;
    }
};
exports.default = mongoose.model('User', UserSchema);
