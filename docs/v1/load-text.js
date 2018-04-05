(function (AppCache) {

  var noop = function () {
  };

  AppCache.prototype.hasLoad = function (inUrl) {
    var manifest = this.getManifest();
    return manifest.scripts[inUrl];
  };

  AppCache.prototype.loadScript = function (inUrl, inOptions) {
    var timeout = inOptions.timeout || 30 * 1000;
    var success = inOptions.success || noop;
    var error = inOptions.error || noop;
    this.hasLoad(inUrl) ? this.loadFromCache(inUrl, success, error, timeout) : this.loadFromXHR(inUrl, success, error, timeout);
  };

}(AppCache));
