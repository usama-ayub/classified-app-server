"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require("multer");
var userController_1 = require("./userController");
var router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'profile/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
router.get('/user', userController_1.getAllUser);
router.get('/user/:user_id', userController_1.getUserById);
router.put('/user/updateProfile', upload.single('img'), userController_1.userUpdateProfile);
router.post('/user/changePassword', userController_1.changePassword);
router.post('/user/resetPassword', userController_1.resetPassword);
router.post('/tracker', userController_1.tracker);
exports.default = router;
