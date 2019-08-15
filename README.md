<p align="center">
  <a href="https://github.com/afeiship/app-cache">
    <img src="./docs/app-cache.jpg" width="518" align="center">
  </a>
</p>


# app-cache
> An app scripts cache solution based on localStorage.
---

## size:
+ 8.0K	app-cache.js
+ 4.0K	app-cache.min.js
+ 3.04K app-cache.min.js[gzip]

## resources:
+ https://www.cnblogs.com/snandy/p/4867731.html
+ https://api.qunitjs.com/assert/async

## github path:
+ https://afeiship.github.io/app-cache/dist/app-cache.js
+ https://afeiship.github.io/app-cache/dist/app-cache.min.js


## lt ie9:
```html
<!--[if lt IE 9]>
<script type="text/javascript" src="https://cdn.polyfill.io/v2/polyfill.js?features=Array.prototype.indexOf,Array.prototype.filter,Object.keys"></script>
<![endif]-->
```

## import with script:
```html
<!-- production -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/afeiship/app-cache@1.0.1/dist/app-cache.min.js"></script>
```
## usage:
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

## todos:
- [x] clear old cache by version.
- [x] support css
- [x] store/manifest to standalone Class
- [x] set/get/clear Store
- [x] set/get/init/has Manifest
- [ ] unit test

