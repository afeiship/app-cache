(function (AppCache) {

  AppCache.prototype.loadFromCache = function (inUrl, inSuccess, inError, inTimeout) {
    try {
      var stored = this.getStore(inUrl);
      inSuccess({
        content: stored,
        type: 'application/javascript'
      });
    } catch (err) {
      inError(err);
    }
  };

}(AppCache));
