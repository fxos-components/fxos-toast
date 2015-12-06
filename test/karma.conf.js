'use strict';
module.exports = function(config) {
  config.set({
    basePath: '..',
    browsers: ['firefox_latest'],
    client: {
      captureConsole: true,
      mocha: {'ui': 'tdd'}
    },

    frameworks: [
      'mocha',
      'sinon-chai'
    ],

    customLaunchers: {
      firefox_latest: {
        base: 'FirefoxNightly',
        prefs: {
          'dom.webcomponents.enabled': true
        }
      }
    },

    files: [
      'node_modules/fxos-component/fxos-component.js',
      'fxos-toast.js',
      'node_modules/axe-core/axe.min.js',
      'node_modules/test-utils/src/utils.js',
      'node_modules/test-utils/src/accessibility.js',
      'test/test-unit.js'
    ],

    proxies: {
      '/node_modules/': 'http://localhost:9876/base/node_modules/'
    }
  });
};
