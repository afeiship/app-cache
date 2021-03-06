# app-cache
> An app scripts cache solution based on localStorage.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

![snapshot](https://tva1.sinaimg.cn/large/0081Kckwgy1glt92a8oqwj31280cydi7.jpg)

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
]);
```

## resources
- https://www.cnblogs.com/snandy/p/4867731.html
- https://api.qunitjs.com/assert/async
- https://addyosmani.com/basket.js/


## lt ie9 polyfill
```html
<!--[if lt IE 9]>
<script type="text/javascript" src="https://cdn.polyfill.io/v2/polyfill.js?features=Array.prototype.indexOf,Array.prototype.filter,Object.keys"></script>
<![endif]-->
```

## license
Code released under [the MIT license](https://github.com/afeiship/app-cache/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/app-cache
[version-url]: https://npmjs.org/package/@jswork/app-cache

[license-image]: https://img.shields.io/npm/l/@jswork/app-cache
[license-url]: https://github.com/afeiship/app-cache/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/app-cache
[size-url]: https://github.com/afeiship/app-cache/blob/master/dist/app-cache.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/app-cache
[download-url]: https://www.npmjs.com/package/@jswork/app-cache

