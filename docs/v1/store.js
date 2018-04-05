(function (AppCache) {

  var appCacheProto = AppCache.prototype;
  var engine = AppCache.debug ? 'sessionStoreage' : 'localStorage';

  //symbol string:
  var TYPE_JSON = 'json';
  var isString = function (inValue) {
    return typeof inValue === 'string';
  };

  appCacheProto.setStore = function (inKey, inValue) {
    var prefix = this.options.prefix;
    var key = prefix + inKey;
    var value = isString(inValue) ? inValue : JSON.stringify(inValue);
    window[engine].setItem(key, value);
  };

  appCacheProto.getStore = function (inKey, inType) {
    var prefix = this.options.prefix;
    var key = prefix + inKey;
    var stored = window[engine].getItem(key);
    return inType === TYPE_JSON ? JSON.parse(stored) : stored;
  };

  appCacheProto.clearStore = function () {
    var allKeys = Object.keys(window[engine]);
    var prefix = this.options.prefix;
    allKeys.forEach(function (key) {
      if (key.indexOf(prefix) === 0) {
        window[engine].removeItem(key);
      }
    });
  };


}(AppCache));
