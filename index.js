
// westore
import store from './utils/store';
import create from './utils/lib/westore/create';
// async
import regeneratorRuntime from './utils/lib/runtime';
// 初始化程序
const init = require('./utils/init');
module.exports = {
  store,
  create,
  regeneratorRuntime,
  init,
}