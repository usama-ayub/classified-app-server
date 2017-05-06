import * as mongoose from 'mongoose';
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

export interface IUser extends mongoose.Document {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    password: string,
    profileName: string,
    role: string,
    socialId: string,
    createTime: Date,
    comparePassword: (password: string) => {}
}

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    let hash = bcrypt.hashSync(user.password, 5);
    user.password = hash;
    next();
});


UserSchema.methods = {
    comparePassword(password, cb) {
        let isMatch = bcrypt.compareSync(password, this.password)
        return isMatch
    }
}

export default mongoose.model<IUser>('User', UserSchema);