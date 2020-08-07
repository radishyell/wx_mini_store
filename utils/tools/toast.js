
 /**
 * 接口请求
 * @param {string} 	 弹窗的文字内容
 * @param {boolean}  成功或者失败弹窗
 */
export default function (title = null, isSuccess = true, duration = 1500) {
	if (!title) {
		title = isSuccess ? 'success' : 'fail';
	}
	// 显示加载图标，此时 title 文本最多显示 7 个汉字长度
	const params = { title, duration }
	if (isSuccess && this.data.toastPath && this.data.toastPath.success) {
		params.image = this.data.toastPath.success;
	} else if (!isSuccess && this.data.toastPath && this.data.toastPath.fail){
		params.image = this.data.toastPath.fail;
	} else {
		params.icon = isSuccess ? 'success' : 'none';
	}

	if (title.length > 7) {
		params.icon = 'none';
	}
	wx.showToast(params);
}