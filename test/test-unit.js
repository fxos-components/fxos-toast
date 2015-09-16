/* jshint maxlen:120 */
/* global sinon, suite, setup, teardown, test, toast, assert */
suite('GaiaToast', function() {
  'use strict';

  var accessibility = window['test-utils'].accessibility;

  setup(function() {
    this.sinon = sinon.sandbox.create();
    this.dom = document.createElement('div');
    document.body.appendChild(this.dom);
  });

  teardown(function() {
    this.sinon.restore();
    document.body.removeChild(this.dom);
    this.dom = null;
  });

  suite('accessibility', function() {
    /**
     * Accessibility test utils module tests the following things, amongst other
     * checks (all at once).:
     *  - ARIA attributes specific checks
     *  - accesskey uniqueness if applicable
     *  - Presence of alternative descriptions, labels and names
     *  - Color contrast
     *  - Markup is semantically correct from a11y standpoint
     *  - Heading order
     *  - Frame/document title and language
     *  - Landmarks if applicable
     *  - Keyboard focusability and tabindex
     *
     * Its checks are called at different stages and within different states of
     * the component.
     */

    test('Check that in its default state gaia-toast passes all ' +
      'accessibility checks mentioned above', function(done) {
      this.dom.innerHTML = '<gaia-toast id="toast" timeout="2000">Like toast from a toaster</gaia-toast>';
      assert.equal(toast.els.inner.getAttribute('role'), 'alert');
      accessibility.check(this.dom).then(done, done);
    });

    test('Check that when shown gaia-toast passes all accessibility checks ' +
      'mentioned above', function(done) {
      this.dom.innerHTML = '<gaia-toast id="toast" timeout="10000">Like toast from a toaster</gaia-toast>';
      // Since hide timeout is set to 10s, gaia-toast should be visible for the
      // duration of the accessibility checks
      toast.show();
      setTimeout(() => {
        // Animation for show takes 300ms
        assert.isTrue(toast.els.inner.classList.contains('visible'));
        assert.isTrue(toast.els.bread.classList.contains('animate-in'));
        accessibility.check(this.dom).then(done, done);
      }, 400);
    });

    test('Check that when hidden gaia-toast passes all accessibility checks ' +
      'mentioned above', function(done) {
      this.dom.innerHTML = '<gaia-toast id="toast" timeout="1000ms">Like toast from a toaster</gaia-toast>';
      // Since hide timeout is set to 1000ms, gaia-toast should be hidden by the
      // time accessibility checks are performed
      toast.show();
      setTimeout(() => {
        // Animation for show takes 300ms
        assert.isFalse(toast.els.inner.classList.contains('visible'));
        assert.isFalse(toast.els.bread.classList.contains('animate-in'));
        assert.isFalse(toast.els.bread.classList.contains('animate-out'));
        accessibility.check(this.dom).then(done, done);
      }, 1050);
    });
  });
});
