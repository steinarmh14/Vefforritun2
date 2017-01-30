describe('LoginController homepage', function() {
  it('valid username and password', function() {
    browser.get('http://localhost:8089/src/#/');

    element(by.model('username')).sendKeys('steinarmh14');
    element(by.model('password')).sendKeys('steinarmh14');
    element(by.id('loginBtn')).click();
    expect(browser.getLocationAbsUrl()).toBe('/about');
  });


  it('invalid username and password', function() {
    browser.get('http://localhost:8089/src/#/');

    element(by.model('username')).sendKeys('steinarmh14');
    element(by.model('password')).sendKeys('adsasdf');
    element(by.id('loginBtn')).click();
    expect(browser.getLocationAbsUrl()).toBe('/');
  });

    it('invalid username and password', function() {
    browser.get('http://localhost:8089/src/#/');

    element(by.model('username')).sendKeys('steinamh14');
    element(by.model('password')).sendKeys('adsasdf');
    element(by.id('loginBtn')).click();
    expect(browser.getLocationAbsUrl()).toBe('/');
    expect($('[ng-if=errorMessage]').isDisplayed()).toBeTruthy();

  });
});