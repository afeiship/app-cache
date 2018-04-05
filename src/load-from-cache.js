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
