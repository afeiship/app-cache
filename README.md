# app-cache
> An app scripts cache solution based on localStorage.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

![snapshot](https://tva1.sinaimg.cn/large/0081Kckwgy1glt8fky51zj30io06cdg9.jpg)

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


## lt ie9 polyfill
```html
<!--[if lt IE 9]>
<script type="text/javascript" src="https://cdn.polyfill.io/v2/polyfill.js?features=Array.prototype.indexOf,Array.prototype.filter,Object.keys"></script>
<![endif]-->
```

## license
Code released under [the MIT license](https://github.com/afeiship/boilerplate-cli/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@boilerplate-scope/boilerplate-cli
[version-url]: https://npmjs.org/package/@boilerplate-scope/boilerplate-cli

[license-image]: https://img.shields.io/npm/l/@boilerplate-scope/boilerplate-cli
[license-url]: https://github.com/afeiship/boilerplate-cli/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@boilerplate-scope/boilerplate-cli
[size-url]: https://github.com/afeiship/boilerplate-cli/blob/master/dist/boilerplate-cli.min.js

[download-image]: https://img.shields.io/npm/dm/@boilerplate-scope/boilerplate-cli
[download-url]: https://www.npmjs.com/package/@boilerplate-scope/boilerplate-cli

