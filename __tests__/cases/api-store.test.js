var expect = chai.expect;

describe('API: store module', function () {
  AppCache.PREFIX = '__TEST__';
  var appCache = new AppCache();

  it('store: set key with the value', function () {
    appCache.setStore('test', 'test-value');
    expect( localStorage.getItem('__TEST__test') ).to.be.equal('test-value');
  });


  it('store: get test key', function () {
    expect( appCache.getStore('test') ).to.be.equal('test-value');
  });


  it('store: remove the key you have set', function () {
    appCache.setStore('test1', 'test-value1');
    appCache.setStore('test2', 'test-value2');
    appCache.setStore('test3', 'test-value2');
    appCache.setStore('test4', 'test-value2');
    appCache.removeStore('test1');
    expect( appCache.getStore('test1') ).to.be.equal(null);
  });


  it('store: clear all keys', function () {
    appCache.clearStore();
    expect( appCache.getStore('test') ).to.be.equal(null);
    expect( appCache.getStore('test1') ).to.be.equal(null);
    expect( appCache.getStore('test2') ).to.be.equal(null);
    expect( appCache.getStore('test3') ).to.be.equal(null);
    expect( appCache.getStore('test4') ).to.be.equal(null);
  });

});
