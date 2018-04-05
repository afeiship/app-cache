var expect = chai.expect;

describe('API: injectScript', function () {

    it('injectScript: inject inline script to html', function () {
      var scripts = 'window.test = "abc"';

      // before ineject:
      var beforeInjectTestVar = window.test;
      var scriptsLen = document.scripts.length;
      expect(beforeInjectTestVar).to.be.equal(undefined);

      // after inject:
      AppCache.injectScript(scripts);
      var afterInectTestVar = window.test;
      var scriptsLen2 = document.scripts.length;

      expect(afterInectTestVar).to.be.equal('abc');
      expect(scriptsLen2-scriptsLen).to.be.equal(1);
    });

});
