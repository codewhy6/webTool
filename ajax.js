// 封装Ajax
function ajax(options) {
  // 默认值
  let defaults = {
    type: 'get',
    url: '',
    data: {},
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function () { },
    error: function () { }
  }

  // 使用assign会将options中的属性覆盖defaults中的属性
  Object.assign(defaults, options)
  // 1.创建Ajax对象
  let xhr = new XMLHttpRequest();
  // 5.请求传递参数，get在url地址后面。post在send（）中
  let params = '';
  // 5.1 处理传递参数的格式【username='chen'&age=18】
  for (const key in defaults.data) {
    if (defaults.data.hasOwnProperty(key)) {
      let element = defaults.data[key];
      params += `${key}=${element}&`;
    }
  }
  // 5.3 去除最后面的 & 符号
  params = params.substr(0, params.length - 1);
  // 5.2 是get请求方式，在url地址拼接传递的参数
  if (defaults.type === 'get') {
    defaults.url = defaults.url + '?' + params;
  }
  // 2.告诉Ajax对象向哪发送请求，用什么方式发送请求
  xhr.open(defaults.type, defaults.url);

  // 6.处理get和post不同请求方式
  if (defaults.type == 'post') {
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // 设置请求参数格式的类型
    let contentType = defaults.header['Content-Type'];

    // 6.1 用户希望向服务器端传递的请求参数的类型
    xhr.setRequestHeader('Content-Type', contentType);
    // 请求参数是json数据格式
    if (contentType == 'application/json') {
      xhr.send(JSON.stringify(defaults.data))
    } else {
      // 普通请求参数
      xhr.send(params);
    }
  } else {
    // 3.发送请求
    xhr.send();
  }
  // 4.获取服务端响应的客户端的数据
  xhr.addEventListener('load', function () {
    // 获取响应头中的数据‘
    let contentType = xhr.getResponseHeader('Content-Type');
    // 服务器端返回的数据
    let responseText = xhr.responseText;
    // 服务器返回数据是json，就转换成对象格式
    if (contentType.includes('application/json')) {
      responseText = JSON.parse(responseText)
    }
    // 当http状态码是200时，
    if (xhr.status == 200) {
      defaults.success(responseText, xhr)
    } else {
      defaults.error(responseText, xhr)

    }
  })
}

function ajax2(options) {
  let defaults = {
    type: 'get',
    url: '',
    data: {},
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function () { },
    error: function () { }
  }

  Object.assign(defaults, options);

  let xhr = new XMLHttpRequest();

  let params = '';
  for (const key in defaults.data) {
    params += `${key}=${defaults.data[key]}&`
  }
  params = params.substr(0, params.length - 1);
  
  if (defaults.type.toLocaleLowerCase() == 'get') {
    defaults.url = defaults.url + '?' + params;
  }

  xhr.open(defaults.type, defaults.url);

  if (defaults.type.toLowerCase() == 'post') {
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let contentType = defaults.header['Content-Type'];
    xhr.setRequestHeader('Content-Type', contentType);
    if (contentType == 'application/json') {
      xhr.send(JSON.stringify(defaults.data))
    } else {
      xhr.send(params)
    }
  } else {
    xhr.send()
  }

  xhr.addEventListener('load', function () {
    let responseText = xhr.responseText;
    let contentType = xhr.getResponseHeader('Content-type');
    if (contentType.includes('application/json')) {
      responseText = JSON.parse(responseText);
    }

    if (xhr.status == 200) {
      defaults.success(responseText, xhr)
    } else {
      defaults.error(responseText, xhr)
    }
  })
}