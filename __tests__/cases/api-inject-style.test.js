var expect = chai.expect;

describe('API: injectStyle', function () {

    it('injectScript: inject inline style to html', function () {
      var cssText = 'body{ border:1px solid #fff; }';
      var styleLen = document.styleSheets.length;
      AppCache.injectStyle(cssText);
      styleLen2 = document.styleSheets.length;

      var bodyStyle = getComputedStyle( document.body )
      expect(bodyStyle.border).to.be.equal('1px solid rgb(255, 255, 255)');
      expect(styleLen2-styleLen).to.be.equal(1);
    });

});
