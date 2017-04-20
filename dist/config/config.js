"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtSecret: 'mySecret',
    mongoURL: process.env.MONGODB_URI || 'mongodb://admin:admin@ds129610.mlab.com:29610/test-db',
    port: process.env.PORT || 3000
    // ,userRoles: ['guest', 'user', 'admin']
};
