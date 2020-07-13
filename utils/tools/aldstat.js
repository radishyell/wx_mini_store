/**
 * 往第三方后台发送点击事件
 * @param {string} 事件名称
 * @param {string} 事件参数
 */
export default function(event_name = '', event_value = ''){
  try {
    if (!event_name || !event_name.length) return;
    getApp().aldstat.sendEvent(event_name, event_value);
  } catch (error) {
    console.log(' ald send event error', error);
  }
}