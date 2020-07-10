


/**
 * 初始化store
 * @param default 默认配置
 * @param develop 开发环境配置
 * @param trial   体验版配置
 * @param prod    正式版配置
 * */ 
module.exports = (params = {}) => {
  try {
    const store = require('./store').default;
    if (!params.default) {
      params.default = require('./config/default');
      console.error(' 最少需要传入一种默认配置 配置如下', params.default);
    }

    if (!params.develop && !params.trial && !params.prod) {
      console.warn(' 建议传入三种不同环境下的配置 ');
    }
    // 加载配置
    const config = fetchConfig(params);
    if (config) {
      Object.assign(params.default, config);
    }
    // 挂载初始化的data属性到store底下
    Object.assign(store.data, params.default);
    if (store.data.methods) {
      delete store.data.methods;
    }
    // 挂载方法到store底下
    const methods = params.default.methods;
    if (methods && methods.length) {
      methods.forEach(item => {
        const tempFun = require(`./tools/${item}.js`).default;
        if (tempFun){
          store[item] = tempFun;
        }
      });
    }
    // 监听版本更新
    updateInfo(store);
    // 佛祖保佑
    godInfo(store);
  } catch (error) {
    console.log('framework init error ', error);
  }
}


// 根据当前小程序环境获取不同配置
function fetchConfig (params) {
  try {
    const envVersion = wx.getAccountInfoSync().miniProgram.envVersion;
    if (envVersion === 'develop') {
      return params.develop || require('./config/develop');
    } else if (envVersion === 'trial') {
      return params.trial || require('./config/trial');
    } else if (envVersion === 'release') {
      return params.prod || require('./config/prod');
    }
    return;
  } catch (error) {
    console.error('=== config error ===', error);
    return;
  }
}



function godInfo(store) {
  try {
    if (store.god) {
      store.god();
    } else {
      throw new Error('没有佛主保佑的代码是不安全的');
    }
  } catch (error) {
    console.error(error.message);
  }
}


function updateInfo(store) {
  try {
    if (store.updateManager) {
      store.updateManager();
    } 
  } catch (error) {
    console.error(error.message);
  }
}