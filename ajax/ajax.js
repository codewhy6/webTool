// restful请求：http://localhost:3000/ajax/restfulGet/admin&123
// 普通请求：http://localhost:3000/ajax/restfulGet?uname=admin&upwd=123

function ajax(options) {
  // options:形参，且是一个obj。
  // 定义一个变量，存储用户查询的路径（路由）
  let params = '';
  // console.log(params);//--admin&123
  // options对象中有method属性，就是使用 restful请求方法
  if ('method' in options && options.method == 'restful') {
    for (const key in options.data) {
      params += options.data[key] + '&';
    };
  } else {
    // 普通的请求方法
    for (const key in options.data) {
      params += `${key}=${options.data[key]}&`;
    };
  };
  // 去除拼接字符串最后面的一个 &
  params = params.substr(0, params.length - 1);
  // console.log(params);

  // 创建Ajax异步对象
  let xhr = new XMLHttpRequest();
  // 4.接收请求
  xhr.onreadystatechange = function () {
    // 响应状态码是200（正确接收到服务器的数据），
    if (xhr.readyState == 4 && xhr.status == 200) {
      // 接收服务器端发送的数据
      let response = xhr.responseText;
      // 调用options形参下的success函数，并传入接收到服务器的数据
      options.success(response)
    }
    // else {
    //   let response = xhr.responseText;
    //   options.error(response, xhr)
    // }
  };

  // 如果封装的ajax函数的形参options有method属性，
  // 就说明是 restful请求方法
  if ('method' in options && (options.type == 'get' || options.type == 'delete')) {
    // 是restful请求，就拼接路径
    options.url = options.url + '/' + params;
  } else {
    // 如果没有该属性，就是普通的ajax请求，再拼接路径
    options.url = options.url + '?' + params;
  }
  // 2.创建请求，打开连接
  xhr.open(options.type, options.url, true);
  // 如果是post 或者是 put 请求，就添加请求头和发送请求主体
  if (options.type == 'post' || options.type == 'put') {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(params)
  } else {
    // 3.发送请求（普通的get，delete）
    xhr.send();
  }
}
