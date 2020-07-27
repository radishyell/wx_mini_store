
// westore
import store from './utils/store';
import create from './utils/lib/westore/create';
// async
import regeneratorRuntime from './utils/lib/runtime';
// 初始化程序
import init from './utils/init';

// TODO 将cofig assign后的主体放到index.js底下。 不要耦合到store里面

module.exports = {
  store,
  create,
  regeneratorRuntime,
  init,
}