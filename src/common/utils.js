// 防抖函数debounce，解决服务器调用频繁的问题
export function debounce(fun,delay){
    let timer = null;
    return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            // console.log("------");
            fun.apply(this,args)
        },delay)
    }
}

// 时间戳转换成字符串
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };