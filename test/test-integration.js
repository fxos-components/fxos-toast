/* global marionette, setup, test */

'use strict';

var assert = require('chai').assert;
marionette.plugin('helper', require('marionette-helper'));

marionette('gaia-toast', function() {
  var client = marionette.client({
    profile: {
      prefs: {
        // Disable first time run UI
        'browser.feeds.showFirstRunUI': false,
        // Disable default browser check
        'browser.shell.checkDefaultBrowser': false,
        // Disable UI tutorial
        'browser.uitour.enabled': false,
        // Enable chrome debugging
        'devtools.chrome.enabled': true,
        'devtools.debugger.remote-enabled': true,

        // Load integration test page on startup
        'startup.homepage_welcome_url': __dirname + '/test-integration.html',

        // Allow loading test resources oudside of test/ directory
        // (e.g. bower-components)
        'security.fileuri.strict_origin_policy': false,

        // Enable web components
        'dom.webcomponents.enabled': true,
        // Enable touch events
        'dom.w3c_touch_events.enabled': 1
      }
    },
    desiredCapabilities: { raisesAccessibilityExceptions: true }
  });

  var toast = { selector: '#toast' };

  /**
   * Perform a marionette operation and assert if an error is thrown.
   * @param  {Function} testFn operation to perform
   * @param  {String} message error message for the assert statement
   */
  function failOnA11yError(testFn, message) {
    try {
      testFn();
    } catch (err) {
      // Marionette raises an ElementNotAccessibleError exception when
      // raisesAccessibilityExceptions is set to true.
      assert(false, message);
    }
  }

  setup(function() {
    toast.element = client.findElement(toast.selector);
  });

  test('gaia-toast is present and visible to the assistive technology',
    function() {
      // Element was found
      assert.ok(toast.element, toast.selector);
      // Element is visible to all (inlcuding assistive technology)
      assert.isTrue(toast.element.displayed());
    });

  test('when hidden gaia-toast bread is hidden from the assistive technology',
    function() {
      client.switchToShadowRoot(toast.element);
      var bread = client.findElement('.bread');
      failOnA11yError(function() {
        assert.isFalse(bread.displayed());
      }, 'gaia-toast .bread element should be hidden both normally and from ' +
        'assistive technology by default.');
      client.switchToShadowRoot();
    });

  test('when shown and then hidden, gaia-toast bread has correct visibility ' +
    'state both normally and from the assistive technology standpoint',
    function() {
      toast.element.scriptWith(function(el) {
        el.wrappedJSObject.show();
      });
      client.switchToShadowRoot(toast.element);
      failOnA11yError(function() {
        client.helper.waitForElement('.bread');
      }, 'gaia-toast .bread element should be visible both normally and to ' +
        'assistive technology.');
      failOnA11yError(function() {
        client.helper.waitForElementToDisappear('.bread');
      }, 'gaia-toast .bread element should be hidden both normally and from ' +
        'assistive technology.');
      client.switchToShadowRoot();
    });
});
