<p align="center">
  <a href="https://github.com/afeiship/app-cache">
    <img src="./docs/app-cache.jpg" width="518" align="center">
  </a>
</p>


# app-cache
> An app scripts cache solution based on localStorage.
---

## installation
```shell
npm i @jswork/app-cache
```

## usage
```js
  AppCache.load([
    '//cdn.bootcss.com/antd/3.1.0/antd.min.css',
    '//cdn.bootcss.com/zepto/1.0rc1/zepto.min.js',
    '//cdn.bootcss.com/q.js/1.4.1/q.min.js'
  ],{
    success:function(resp){
      //console.log($(document.body),'page1 loaded!');
    }
  });
```


## resources
- https://www.cnblogs.com/snandy/p/4867731.html
- https://api.qunitjs.com/assert/async


## lt ie9 polyfill
```html
<!--[if lt IE 9]>
<script type="text/javascript" src="https://cdn.polyfill.io/v2/polyfill.js?features=Array.prototype.indexOf,Array.prototype.filter,Object.keys"></script>
<![endif]-->
```
