(function () {

  var JAVASCRIPT = 'javascript';
  var INJECT_STYLE = 'injectStyle';
  var INJECT_SCRIPT = 'injectScript';
  var DEFAULT_OPTIONS = { success: function(){} };

  //AppCache class:
  function AppCache() {
    this._manifest = this.getManifest();
    this._response = [];

    if (!this._manifest) {
      this.initManifest();
      this._manifest = this.getManifest();
    }
  }

  // static method:
  AppCache.VERSION = '__VERSION__';
  AppCache.PREFIX = '__app_cache__';
  AppCache.NOOP = function () {
  };
  AppCache._instance = null;

  AppCache.load = function (inFiles, inOptions) {
    if (!AppCache._instance) {
      AppCache._instance = new AppCache();
    }
    AppCache._instance.load(inFiles, inOptions);
    return AppCache._instance;
  };

  AppCache.diff = function (inArray1, inArray2) {
    return inArray1.filter(function (i) {
      return inArray2.indexOf(i) === -1;
    });
  };

  //instance methods:
  AppCache.prototype = {
    constructor: AppCache,
    loadQueue: function (inIndex) {
      var self = this;
      var success = this._loadOptions.success || AppCache.NOOP;
      var error = this._loadOptions.error || AppCache.NOOP;
      var url = this._loadFiles[inIndex];
      var length = this._loadFiles.length;

      self.loadText(url, {
        success: function (response) {
          var text = response.content;
          var type = response.type;
          var method = (type.indexOf(JAVASCRIPT) > -1) ? INJECT_SCRIPT : INJECT_STYLE;
          self._response.push(response);
          self[method](text);
          self._manifest.files[url] = true;
          self.setManifest(self._manifest);
          self.setStore(url, text);
          if (self._response.length === length) {
            success(self._response);
          } else {
            self.loadQueue(inIndex + 1);
          }
        },
        error: error
      })
    },
    load: function (inFiles, inOptions) {
      this._loadFiles = inFiles;
      this._loadOptions = inOptions || DEFAULT_OPTIONS;
      // sync && diff files:
      this.syncManifest(inFiles);
      this.loadQueue(0);
    }
  };

  window.AppCache = AppCache;

}());
