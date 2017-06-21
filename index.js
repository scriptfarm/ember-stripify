/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-stripify',

  contentFor: function(type) {
    // we use body since Stripe must be available before
    if (type === 'body') {
      return '<script type="text/javascript" src="https://js.stripe.com/v3/"></script>';
    }
  },

  isDevelopingAddon: function() {
    return false;
  }
};
