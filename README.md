# wx_mini_store

#### 待解决
* TODO : 获取到config进行深度assign



#### 使用示例
初始化，在app.js里面初始化需要的方法


```

const wx_mini_store = require('radish_wx_mini_store');

App({
  
  // westore
  store: wx_mini_store.store,
  create: wx_mini_store.create,
  regeneratorRuntime: wx_mini_store.regeneratorRuntime, // 异步处理
  onLaunch(options) {

    // 初始化项目
    wx_mini_store.init({
      default: require('./utils/config/default'),
      develop: require('./utils/config/develop'),
      trial: require('./utils/config/trial'),
      prod: require('./utils/config/prod'),
    });

      
    //强制切换到体验的配置
    if (options.query.type === 'debug') {
      Object.assign(wx_mini_store.store.data, require('./utils/config/trial'));
    }

    //  ============  设置配置 ============
    wx_mini_store.store.data.imageUrl = 'https://xxxx/images/';
    if (wx_mini_store.store.data.isDebug) { // 配置图片的地址
      wx_mini_store.store.data.imageUrl = 'https://uat-xxxx/images/';
    }
    wx_mini_store.store.data.shareConfig = { // 设置分享
      title: 'share title',
      imageUrl: wx_mini_store.store.data.imageUrl + 'share.jpg',
      path: '/pages/landing/index',
    }
    wx_mini_store.store.data.toastPath = { // 设置toast的图片
      success: '/asset/toast/success.png',
      fail: '/asset/toast/fail.png'
    }
    // 是否主动开启debug， 开发环境下默认开启debug
    if (wx_mini_store.store.data.isDebug) {
      wx.setEnableDebug({ enableDebug: true });
    }
    // ============  配置项目中定义的方法 ============ 
    wx_mini_store.store.addFun('track', require('./utils/tools/track').default);
    
  },
})
```


页面中使用

```

const { store, create, regeneratorRuntime, pageType } = getApp();
create(store, {
	data: {
		imageUrl: null,
	},
	onLoad(options) {
		this.store.data.config = wx.getSystemInfoSync();
	},
	async checkReserve() {
		const req = {
			path: '/checkUser',       
			params: {
				isUpdate: 0,
				openid: this.store.data.userInfo.openid,
				test: this.store.data.isDebug ? 'test' : 'pord',
			},
			method: 'POST'
		};
		const result =	await this.store.request(req, false, false);
		if (!result.isSuccess) {
			const message = (result.code === 1004 || 
				result.code === 5000 ||
				result.code === 1004) ? (result.errMsg || null) : null
			if (message) {
				this.store.toast(message, false);
			}
		}
	},
	onShareAppMessage(options) {
		return this.store.share(options);
	},
});


```
