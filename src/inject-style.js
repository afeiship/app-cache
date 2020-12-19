(function (AppCache) {
  var head = document.head || document.getElementsByTagName('head')[0];
  var STYLE = 'style';
  var TEXT_CSS = 'text/css';

  AppCache.injectStyle = AppCache.prototype.injectStyle = function (inText) {
    var style = document.createElement(STYLE);
    style.type = TEXT_CSS;
    if (style.styleSheet) {
      style.styleSheet.cssText = inText;
    } else {
      style.appendChild(document.createTextNode(inText));
    }
    head.appendChild(style);
  };
})(AppCache);
