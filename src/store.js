(function (AppCache) {

  var appCacheProto = AppCache.prototype;
  var ENGINE = window.localStorage;

  //symbol string:
  var TYPE_JSON = 'json';
  var isString = function (inValue) {
    return typeof inValue === 'string';
  };

  appCacheProto.setStore = function (inKey, inValue) {
    var prefix = AppCache.PREFIX;
    var key = prefix + inKey;
    var value = isString(inValue) ? inValue : JSON.stringify(inValue);
    ENGINE.setItem(key, value);
  };

  appCacheProto.getStore = function (inKey, inType) {
    var prefix = AppCache.PREFIX;
    var key = prefix + inKey;
    var stored = ENGINE.getItem(key);
    return inType === TYPE_JSON ? JSON.parse(stored) : stored;
  };

  appCacheProto.removeStore = function (inKey) {
    var prefix = AppCache.PREFIX;
    var key = prefix + inKey;
    ENGINE.removeItem(key);
  };

  appCacheProto.clearStore = function () {
    var allKeys = Object.keys(ENGINE);
    var prefix = AppCache.PREFIX;
    allKeys.forEach(function (key) {
      if (key.indexOf(prefix) === 0) {
        ENGINE.removeItem(key);
      }
    });
  };


}(AppCache));
