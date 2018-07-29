var webpackdev = require('./config/webpack.config.dev');
var webpackprod = require('./config/webpack.config.prod');

switch (process.env.NODE_ENV) {
    case 'dev':
        module.exports = webpackdev;
        break;
    case 'prod':
        module.exports = webpackprod;
        break;
    default:
        module.exports = webpackdev;
}