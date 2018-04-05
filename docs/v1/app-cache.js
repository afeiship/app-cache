(function () {

  var noop = function () {};
  var VERSION_MSG_REQUIRED = 'Version && prefix is required!';

  //AppCache class:
  function AppCache(inOptions) {
    this.options = inOptions;
    this.init();
    this._response = [];
  }

  //instance methods:
  AppCache.VERSION = '0.0.1';
  AppCache.prototype = {
    constructor: AppCache,
    init: function () {
      var version = this.options.version;
      var prefix = this.options.prefix;

      if (!version || !prefix) {
        throw new Error(VERSION_MSG_REQUIRED);
      }

      if (!this.hasManifest()) {
        this.initManifest();
      } else {
        if (this.hasUpdate()) {
          this.clearStore();
          this.initManifest();
        }
      }
    },
    hasUpdate: function () {
      var manifest = this.getManifest();
      return manifest.version !== this.options.version;
    },
    load: function (inScripts, inOptions) {
      var self = this;
      var length = inScripts.length;
      var success = inOptions.success || noop;
      var error = inOptions.error || noop;
      var manifest = this.getManifest();

      inScripts.forEach(function (url) {
        self.loadScript(url, {
          success: function (response) {
            var text = response.content;
            self._response.push(response);
            self.injectScript(text);
            manifest.scripts[url] = true;
            self.setManifest(manifest);
            self.setStore(url, text);
            if (self._response.length === length) {
              success(self._response);
            }
          },
          error: error
        });
      });
    }
  };

  window.AppCache = AppCache;

}());
