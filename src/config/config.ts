export default {
  jwtSecret: 'mySecret',
  mongoURL: process.env.MONGODB_URI || 'mongodb://admin:admin@ds129610.mlab.com:29610/test-db',
  port: process.env.PORT || 3000,
  from:'usamaayub2012@gmail.com',
  user:'',
  pass:''
  // ,userRoles: ['guest', 'user', 'admin']
};

