import * as express from 'express';
import * as shortid from 'shortid';
import * as nodemailer from 'nodemailer';
import User from '../../app/model/user';
import config from '../../config/config';


export function tracker(req, res, next) {
    let body = req.body;
    console.log('tracker work' + body);
    console.log('tracker work' + body.latitude);
    console.log('tracker work' + body.longitude);
    /*   User.find({}, (err, users) => {
           if (err) {
               return res.json({ success: false, data: null, error: 'Users Not Found' })
           } else {
               return res.json({ success: true, data: users, error: null })
           }
       })*/
}
export function getAllUser(req, res, next) {
    User.find({}, (err, users) => {
        if (err) {
            return res.json({ success: false, data: null, error: 'Users Not Found' })
        } else {
            return res.json({ success: true, data: users, error: null })
        }
    })
}

export function getUserById(req, res, next) {
    let params = req.params;
    let { user_id } = params;
    User.findById(params.user_id, (err, user) => {
        if (err) {
            return res.json({ success: false, data: null, error: 'User Not Found' })
        } else {
            return res.json({ success: true, data: user, error: null })
        }
    })
}

export function userUpdateProfile(req, res, next) {
    console.log(req.file)
    let body = req.body;
    let { user_id, userName, profileName, firstName, lastName } = body;
    body.profileName = req.file.destination + req.file.originalname;
    let data = {
        userName: body.userName,
        profileName: body.profileName,
        firstName: body.firstName,
        lastName: body.lastName
    }
    User.findByIdAndUpdate(body.user_id, data, (err, update) => {
        if (err) {
            return res.json({ success: false, data: null, error: err })
        } else {
            return res.json({ success: true, data: update, error: null })
        }
    })
}

export function changePassword(req, res, next) {
    let body = req.body;
    let { user_id, oldPassword, newPassword } = body;
    User.findOne({ _id: body.user_id }, (err, user) => {
        if (err) return res.json({ success: false, data: null, error: err });
        if (!user) return res.json({ success: false, data: null, error: 'User is invalid' });
        if (user.comparePassword(oldPassword)) {
            user.password = newPassword
            user.save((err) => {
                if (err) {
                    return res.json({ success: false, data: null, error: err });
                } else {
                    return res.json({ success: true, data: "Password Successful Change", error: null });
                }
            });
        }
        else {
            return res.json({ success: false, data: null, error: 'Old Password is not Match' });
        }
    });

}

export function resetPassword(req, res, next) {
    let body = req.body;
    let { email } = body;
    User.findOne({ email: body.email }, (err, user) => {
        if (err) return res.json({ success: false, data: null, error: err })
        else if (!user) {
            return res.json({ success: false, data: null, error: "user not found" })
        }
        else {
            let password = shortid.generate()
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: config.user,
                    pass: config.pass
                }
            });
            let mailOptions = {
                from: 'usamaayub2012@gmail.com',
                to: body.email,
                subject: 'Password Reset',
                text: 'Hello world ?',
                html: `<b>Hello world ?</b>${password}`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.json({ success: false, data: null, error: err })
                } else {
                    return res.json({ success: true, data: info, error: null })
                }
            });
        };
    })
}