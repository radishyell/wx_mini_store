
/**
 * 增加store的拓展方法
 */
export default function (key = null, params = null) {
  if (!params || !key) return;
  const isFun = Object.prototype.toString.call(params) === '[object Function]';
  const isName = Object.prototype.toString.call(key) === '[object String]';
  if (!isFun) return;
  this[key] = params;
}

