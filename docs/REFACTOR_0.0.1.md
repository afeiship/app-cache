## REFACTOR_0.0.1

## xhr.getResponseHeader('content-type')
```conf
js: application/javascript / application/x-javascript
css: text/css
```

## 思路
```js
//1. init 解析参数：
function AppCache(inOptions){
  //1.1 存好prefix
  //1.2 根据prefix 取 manifest 信息 存好
  //1.3 存好当前version值
}

//2. load
function load(){
  // 2.1 根据已经存好的 manifest 对比出来，哪些文件是true/哪些文件是false 
  // 2.2 继续更新到 manifest 的files的key上去
  // 2.3 把这个最新的 version/files 更新到 manifest 再存入缓存
  // 2.4 根据 manifest 上的files 信息 去load数据
  // 2.5 先 load text [css/js] 完成后，把所有的key同步为true，重新存到 ls 中
}


// manifest的几个状态：init / loading / loaded


```

## manifest的样子：
```json
{
    "status" : "done",
    "version": "1.0.0-de6b9851198853c27691",
    "files": {
        "//cdn.bootcss.com/react/15.6.1/react.min.js": true,
        "//cdn.bootcss.com/react/15.6.1/react-dom.min.js": true,
        "//cdn.bootcss.com/spinkit/1.2.5/spinkit.min.css": true,
        "vendors.3038f8d0b9773010001b.js": true,
        "common-928b048d34278a82ecf7.min.js": false,
        "main-928b04.bundle.js": false
    }
}
```


## usage:
```js
var appCache = new AppCache({ prefix:'__app_cache__', version:'1.0.0-de6b9851198853c27691' });
appCache.load([
  '//cdn.bootcss.com/react/15.6.1/react.min.js'
  '//cdn.bootcss.com/react/15.6.1/react-dom.min.js',
  '//cdn.bootcss.com/spinkit/1.2.5/spinkit.min.css',
  '//cdn.bootcss.com/antd/3.1.0/antd.min.css'
],{
  success: function(){
    // do yourself!
  }
});
```


