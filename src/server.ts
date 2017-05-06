import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as fs from 'fs';
import * as Busboy from 'busboy';
import * as randomstring from 'randomstring';
import * as mime from 'mime-types';
import * as cors from 'cors';
import * as shortid from 'shortid';
import * as nodemailer from 'nodemailer';
import * as multer from 'multer';


//config
import config from './config/config';

//server routes
import userRoutes from './api/user';
import authRoutes from './api/auth';
import postRoutes from './api/post';


// mongoose connection check

mongoose.connect(config.mongoURL);
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to');
});
mongoose.connection.on('error', function (err) {
    console.log(`Mongoose default connection error: ${err}`);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});


// App
const app = express();
const port = config.port;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/upload', express.static(path.join(__dirname,'../upload')));
app.use('/profile', express.static(path.join(__dirname,'../profile')));

app.use('/api', authRoutes, userRoutes, postRoutes);


app.listen(port, () => {
    console.log(`Server Running  ${port}`);
});
;
