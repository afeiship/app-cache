(function (AppCache) {
  AppCache.prototype.hasLoad = function (inUrl) {
    var manifest = this.getManifest();
    return manifest.files[inUrl];
  };

  AppCache.prototype.loadText = function (inUrl, inOptions) {
    var timeout = inOptions.timeout || 30 * 1000;
    var success = inOptions.success || AppCache.NOOP;
    var error = inOptions.error || AppCache.NOOP;
    this.hasLoad(inUrl)
      ? this.loadFromCache(inUrl, success, error, timeout)
      : this.loadFromXHR(inUrl, success, error, timeout);
  };
})(AppCache);
