/* global Stripe */
import Ember from 'ember';

const {
  get,
  getOwner,
  Service,
  setProperties
} = Ember;

export default Service.extend({
  init() {
    this._super(...arguments);

    const config = getOwner(this).resolveRegistration('config:environment');

    if (!config.stripe && !config.stripe.publishableKey) {
      throw new Ember.Error('Stripify: Please set `ENV.stripe.publishableKey` in config.environment.js');
    }

    const {
      elements,
      createToken,
      createSource,
      retrieveSource
    } = new Stripe(config.stripe.publishableKey);

    setProperties(this, {
      elements,
      createToken,
      createSource,
      retrieveSource,
    });

    this.card = {
      createToken: this._cardCreateToken.bind(this),
    };

    this.bankAccount = {

    };

    this.source = {
      create: this._createSource.bind(this),
      retrieve: this._retrieveSource.bind(this)
    };
  },

  _cardCreateToken(cardData) {
    let createToken = get(this, 'createToken');

    return new Ember.RSVP.Promise((resolve, reject) => {
      createToken(cardData)
      .then((response) => {
        if (response.error) {
          reject(response);
        } else {
          resolve(response.source);
        }
      });
    });
  },

  _createSource(sourceData) {
    let createSource = get(this, 'createSource');

    return new Ember.RSVP.Promise((resolve, reject) => {
      createSource(sourceData)
      .then((response) => {
        if (response.error) {
          reject(response);
        } else {
          resolve(response.source);
        }
      });
    });
  },

  _retrieveSource(id, client_secret) {
    let retrieveSource = get(this, 'retrieveSource');

    return new Ember.RSVP.Promise((resolve, reject) => {
      retrieveSource({ id, client_secret })
      .then((response) => {
        if (response.error) {
          reject(response);
        } else {
          resolve(response.source);
        }
      })
    })
  },
});
