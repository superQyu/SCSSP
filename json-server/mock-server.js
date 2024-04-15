const jsonServer = require('json-server');
const server = jsonServer.create();

const middlewares = jsonServer.defaults();
// 添加中间件
server.use([middlewares]);
