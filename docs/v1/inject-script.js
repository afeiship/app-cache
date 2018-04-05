(function (AppCache) {

  var head = document.head || document.getElementsByTagName('head')[0];

  AppCache.prototype.injectScript = function(inText){
    var script = document.createElement('script');
    script.defer = true;
    // Have to use .text, since we support IE8,
    // which won't allow appending to a script
    script.text =inText;
    head.appendChild( script );
  };

}(AppCache));
