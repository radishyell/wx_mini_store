/**
 * 往第三方后台发送点击事件
 * @param {string} 事件名称
 * @param {string} 事件参数
 */
export default function(event_name = null, event_value = null){
  if (!event_name) return;
  getApp().aldstat.sendEvent(event_name, event_value);
}