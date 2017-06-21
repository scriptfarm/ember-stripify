import Ember from 'ember';
import config from '../config/environment';

export function initialize() {
  const application = arguments[1] || arguments[0];

  application.register('config:ember-stripify', config, { instantiate: false });

  if (!config.stripe && !config.stripe.publishableKey) {
    throw new Ember.Error('Stripify: Please set `ENV.stripe.publishableKey` in config.environment.js');
  }
}

export default {
  name: 'ember-stripify-service',
  initialize
};
