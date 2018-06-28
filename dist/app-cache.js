/*
 * app-cache 0.0.2
 * An app scripts cache solution based on localStorage.
 * https://github.com/afeiship/app-cache
 *
 * Copyright 2018, afei - 1290657123@qq.com
 * Released under the MIT license.
*/

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
  AppCache.VERSION = '0.0.3';
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

(function (AppCache) {

  var CONTENT_TYPE = 'content-type';
  var GET = 'GET';

  AppCache.prototype.loadFromXHR = function (inUrl, inSuccess, inError, inTimeout) {
    var xhr = new XMLHttpRequest();
    xhr.open(GET, inUrl);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || ( xhr.status === 0 && xhr.responseText )) {
          inSuccess({content: xhr.responseText, type: xhr.getResponseHeader(CONTENT_TYPE)});
        } else {
          inError(xhr.statusText);
        }
      }
    };
    // By default XHRs never timeout, and even Chrome doesn't implement the
    // spec for xhr.timeout. So we do it ourselves.
    setTimeout(function () {
      if (xhr.readyState < 4) {
        xhr.abort();
        inError(xhr.statusText);
      }
    }, inTimeout);
    xhr.send();
  };

}(AppCache));

(function (AppCache) {

  var JS = 'js';
  var APP_JS = 'application/javascript';
  var TEXT_CSS = 'text/css';


  AppCache.prototype.loadFromCache = function (inUrl, inSuccess, inError, inTimeout) {
    try {
      var index = inUrl.indexOf('?');
      var url = index === -1 ? inUrl : inUrl.slice(0, index);
      var stored = this.getStore(inUrl);
      var type = url.slice(-2) === JS ? APP_JS : TEXT_CSS;
      inSuccess({content: stored, type: type});
    } catch (err) {
      inError(err);
    }
  };

}(AppCache));

(function (AppCache) {

  AppCache.prototype.hasLoad = function (inUrl) {
    var manifest = this.getManifest();
    return manifest.files[inUrl];
  };

  AppCache.prototype.loadText = function (inUrl, inOptions) {
    var timeout = inOptions.timeout || 30 * 1000;
    var success = inOptions.success || AppCache.NOOP;
    var error = inOptions.error || AppCache.NOOP;
    this.hasLoad(inUrl) ? this.loadFromCache(inUrl, success, error, timeout) : this.loadFromXHR(inUrl, success, error, timeout);
  };

}(AppCache));

(function (AppCache) {

  var head = document.head || document.getElementsByTagName('head')[0];

  AppCache.injectScript = AppCache.prototype.injectScript = function(inText){
    var script = document.createElement('script');
    script.defer = true;
    // Have to use .text, since we support IE8,
    // which won't allow appending to a script
    script.text =inText;
    head.appendChild( script );
  };

}(AppCache));

(function (AppCache) {

  var head = document.head || document.getElementsByTagName('head')[0];
  var STYLE = 'style';
  var TEXT_CSS = 'text/css';

  AppCache.injectStyle = AppCache.prototype.injectStyle = function (inText) {
    var style = document.createElement(STYLE);
    style.type = TEXT_CSS;
    if (style.styleSheet) {
      style.styleSheet.cssText = inText
    } else {
      style.appendChild(document.createTextNode(inText));
    }
    head.appendChild(style);
  };

}(AppCache));

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
