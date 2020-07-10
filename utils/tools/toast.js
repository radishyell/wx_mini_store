
 /**
 * 接口请求
 * @param {string} 	 弹窗的文字内容
 * @param {boolean}  成功或者失败弹窗
 */

export default function (title = null, isSuccess = true, duration = 1500) {
	if (!title) {
		title = isSuccess ? 'success' : 'fail';
	}
	const image = isSuccess ? './toast/success.png' : './toast/fail.png';
	wx.showToast({ title , image, duration });
}