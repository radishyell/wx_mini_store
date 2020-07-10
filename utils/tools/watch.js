/**
 * 封装westore的onChange方法，监听某个字段或者某个对象内的数据发生改变
 * 
 * 
 * 
  onLoad() {
		this.store.watch(this.watch());
	},
  watch() {
		return {
			'userInfo': (value) => {
				console.log('userInfo 数据发生改变', value);
			}
		}
	},
 * 
 * @param {object} 
 */

export default function (obj) {
	if (!obj) return;
	this.onChange = (newVal) => {
		try {
			// 监听的key
			const watchKeys = JSON.parse(JSON.stringify(Object.keys(obj)));
			// 更新的key
			Object.keys(newVal).forEach(key => {
				const containKey = watchKeys.find(item => {
					return key.indexOf(item) > -1;
				});
				if (containKey) {
					// 有监听
					const callBack = obj[containKey];
					if (Object.prototype.toString.call(callBack) === '[object Function]') {
						callBack(newVal[key]);
					}
				}
			})
		} catch (error) {
			console.log('onChange error ', error);
		}
	}
}