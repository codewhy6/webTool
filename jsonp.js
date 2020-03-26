// jsonp函数封装
function jsonp(options) {
  // 1.创建script标签
  let script = document.createElement('script');

  // 6.拼接用户传递过来的参数
  let params = '';
  for (const key in options.data) {
    params += `&${key}=${options.data[key]}`;
  }
  // 5.将定义在外部的全局函数封装到函数中
  // 这时这个全局函数没有函数名，且不是全局的函数？怎么办？
  // 动态创建函数名称，防止多次请求被覆盖的问题
  let fnName = 'myJsonp' + Math.random().toString().replace('.', '');
  // window.fn = options.success;
  window[fnName] = options.success;
  // 2.设置script的src属性值
  script.src = options.url + '?callback=' + fnName + params;
  // 3.将script标签添加到页面中
  document.body.appendChild(script);
  // 4.单标签加载完成，就把他删除
  script.onload = function () {
    document.body.removeChild(script)
  }
}