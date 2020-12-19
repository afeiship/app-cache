var expect = chai.expect;

describe('API: manifest module', function () {
  AppCache.PREFIX = '__TEST__';
  var appCache = new AppCache();

  it('manifest: if has manifest', function () {
    expect( appCache.hasManifest() ).to.be.equal(false);
  });


  it('manifest: init a manifest', function () {
    appCache.initManifest();
    var manifest = appCache.getManifest();
    expect( typeof appCache.hasManifest()!='undefined' ).to.be.equal(true);
  });

  it('manifest: add one file to files map', function () {
    appCache.syncManifest([
      '//cdn.bootcss.com/zepto/1.0rc1/zepto.min.js'
    ]);
    var manifest = appCache.getManifest();
    console.log(
      manifest
    );
  });

});
