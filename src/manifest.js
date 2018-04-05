(function (AppCache) {

  var appCacheProto = AppCache.prototype;

  //symbol string:
  var TYPE_JSON = 'json';
  var MANIFEST = 'manifest';

  appCacheProto.initManifest = function () {
    this.setStore(MANIFEST, {
      prefix: AppCache.PREFIX,
      files: {}
    });
  };


  appCacheProto.syncManifest = function (inFiles) {
    var files = this._manifest.files;
    var oldFiles = Object.keys(files);
    var shouldAdd = AppCache.diff(inFiles, oldFiles);
    var shouldRemove = AppCache.diff(oldFiles, inFiles);

    var index, length, value;

    // add to map:
    for (index = 0, length = shouldAdd.length; index < length; index++) {
      value = shouldAdd[index];
      files[value] = false;
    }

    // remove from cache
    for (index = 0, length = shouldRemove.length; index < length; index++) {
      value = shouldRemove[index];
      delete files[value];
      this.removeStore(value);
    }

    this._manifest.files = files;
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
