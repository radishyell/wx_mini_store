// 默认的配置
module.exports = {
  // 网络请求的域名地址
  eventUrl: 'https://product.com',

  // 是否是在开发环境下
  isDebug: false,

  // 动态加载工具方法。名字和tools下的文件命名一致
  methods: [ 
    'god', 'music', 'request', 'share', 'toast', 'watch', 'aldstat', 'updateManager', 'addFun'
  ],


  // 当前环境，默认是线上release环境  可选值 develop  trial  release
  env: 'release',

  // 阿拉丁统计的key
  aldAppKey: '',
}