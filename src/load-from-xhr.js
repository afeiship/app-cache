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
