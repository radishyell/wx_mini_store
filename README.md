# wx_mini_store

初始化，在app.js里面初始化需要的方法


```

const radish = require('./radish_wx_mini_store/index');

App({
  store: radish.store,
  create: radish.create,
  regeneratorRuntime: radish.regeneratorRuntime,
  onLaunch() {
    // 初始化项目
    const params = {
      default: require('./utils/config/default'),
      develop: require('./utils/config/develop'),
      trial: require('./utils/config/trial'),
      prod: require('./utils/config/prod'),
    }
    radish.init(params);
  },
})
```


页面中使用

```
//  小程序主入口 授权 中转页面
const store = getApp().store;
const create = getApp().create;
const regeneratorRuntime = getApp().regeneratorRuntime;


create(store, {
	async onLoad() {

		
		console.log(this.store);
	},
});



```
