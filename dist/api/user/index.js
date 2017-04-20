"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var userController_1 = require("./userController");
var router = express.Router();
router.get('/user', userController_1.getAllUser);
router.get('/user/:user_id', userController_1.getUserById);
router.get('/user/changePassword', userController_1.changePassword);
exports.default = router;
