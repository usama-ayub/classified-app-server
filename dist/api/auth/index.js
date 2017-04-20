"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var authController_1 = require("./authController");
var router = express.Router();
router.post('/login', authController_1.login);
router.post('/register', authController_1.register);
router.post('/social', authController_1.social);
exports.default = router;
