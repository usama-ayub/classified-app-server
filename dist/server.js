"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
//config
var config_1 = require("./config/config");
var app = express();
var port = config_1.default.port;
/*app.use((req, res, next) => {
    console.log('req', req.file);
    next;
})*/
//server routes
var user_1 = require("./api/user");
var auth_1 = require("./api/auth");
var post_1 = require("./api/post");
// mongoose connection check
mongoose.connect(config_1.default.mongoURL);
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to');
});
mongoose.connection.on('error', function (err) {
    console.log("Mongoose default connection error: " + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
// App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/upload', express.static(path.join(__dirname, '../upload')));
app.use('/profile', express.static(path.join(__dirname, '../profile')));
app.use('/api', auth_1.default, user_1.default, post_1.default);
app.listen(port, function () {
    console.log("Server Running  " + port);
});
;
