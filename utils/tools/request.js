
/**
// 单个请求
params = {
    path: '',       // 请求路径 
    params: {},     // 请求参数
    method: 'GET'   // 请求方法
}

// 多个请求
params = [{
        path: '',       // 请求路径 
        params: {},     // 请求参数
        method: 'GET'   // 请求方法
    },
    {
        path: '',       // 请求路径 
        params:  {},     // 请求参数
        method: 'GET'   // 请求方法
    }
]
 * */

import toast from "./toast";

 /**
 * 接口请求
 * @param {object/array} 	 请求参数，可以是单个（对象）或者多个（数组对象）请求。
 * @param {boolean}} 是否显示菊花转圈
 * @param {boolean}} 是否错误的弹窗
 */

export default function (params = { path: null, params: {}, method: 'GET' }, isShowMask = true, isShowToast = true) {
	if (isShowMask) {
		wx.showLoading({ title: '加载中', mask: true });
	}
	// 判断传入是多个请求还是单个请求
	const isArray = Array.isArray(params);
	// 不管是单个还是多个，都拼接成数组的请求
	params = isArray ? params : [params]; 
	// 请求列表
	const requestList = params.map(item => {
		const url = `${this.data.eventUrl || ''}${item.path}`;
		const method = item.method || 'GET';
		const data = item.params || {};
		const token = this.data.token || '';
		return request(url, method, data, token)
	});
	return Promise.all(requestList).then(result => {
		const errorInfo = result.find(item => !item.isSuccess);
		if (errorInfo && isShowToast) {
			const errorMessage = ((this.data && this.data.isDebug) || false) ? (errorInfo.message || '网络开小差') : '网络开小差';
			if (this.toast) {
				this.toast(errorMessage, false);
			}
		} else {
			if (isShowMask) {
				wx.hideLoading();
			}
		}
		return isArray ? result : result[0];
	});
}

function request(url, method, data = {}, token = '') {
	return new Promise((resolve) => {
		wx.request({
			url,
			method, //请求方法
			header: {
				'content-type': 'application/json', // 默认header头
				'Authorization': token,
			},
			data, //请求参数
			success: (res) => { //成功回调
				console.log(url, data, res);
				const result = Object.assign({
					data: res.data.data || null,
					isSuccess: res.data.code === 0,
					message: res.data.message || '',
					code: res.data.code || 0
				}, res.data)
				resolve(result);
			},
			fail: () => { //失败回调
				resolve({ data: null, message: `网络开小差`, isSuccess: false });
			},
		});
	})
}
