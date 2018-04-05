(function (AppCache) {

  var appCacheProto = AppCache.prototype;

  //symbol string:
  var TYPE_JSON = 'json';
  var MANIFEST = 'manifest';


  appCacheProto.initManifest = function () {
    var version = this.options.version;
    this.setStore(MANIFEST, {
      version: version,
      scripts: {}
    });
  };

  appCacheProto.hasManifest = function () {
    return !!this.getStore(MANIFEST);
  };

  appCacheProto.getManifest = function () {
    return this.getStore(MANIFEST, TYPE_JSON);
  };

  appCacheProto.setManifest = function (inValue) {
    this.setStore(MANIFEST, inValue);
  };

}(AppCache));
