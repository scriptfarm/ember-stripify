# ember-stripify

Ember Addon which integrates [Stripe.js](https://stripe.com/docs/stripe.js) in Version 3.

## Features
- Injects and initializes Stripe.js in Version 3
- Makes the `stripe` service available in your Ember application
- ~~Delivers Stripe Elements as Ember components~~ Stripe Elements are an upcoming feature
- Supports all new Stripe v3 Features including:
  - `createSource`, `retrieveSource`
- Supports various payment sources

## Payment sources
`ember-stripify` supports the following payment sources by now:
- [x] [Credit Cards](https://stripe.com/docs/sources/cards)
- [x] [Giropay](https://stripe.com/docs/sources/giropay)
- [x] [SOFORT Überweisung](https://stripe.com/docs/sources/sofort)
- [x] [SEPA Direct Debit](https://stripe.com/docs/sources/sepa-debit)
- [x] [iDEAL](https://stripe.com/docs/sources/ideal)
- [x] [Bitcoin](https://stripe.com/docs/sources/bitcoin)
- [x] [Bancontact](https://stripe.com/docs/sources/bancontact)


## Installation

I did not release this as npm package, yet. Therefore you have to clone the repository manually.

## Configuration

### Stripe Publishable Key

You must set your [Stripe publishable key](https://support.stripe.com/questions/where-do-i-find-my-api-keys) in `config/environment.js`.

```js
ENV.stripe = {
  publishableKey: 'pk_thisisyourpublishablekey'
};
```

## Usage

### Stripe service

The `stripe` service lets you interact with Stripe.js in a way you would except in an Ember app .
After injecting the service you can start using promisified Stripe functionality.

The service exposes the following functions:

##### stripe.card.createToken(element[, cardData])
`stripe.card.createToken` generates a Stripe token for the corresponding element and card data.

##### stripe.bankAccount.createToken(bankAccountData)
`stripe.bankAccount.createToken` generates a single-use Stripe token for entered bank account information.

##### stripe.source.create(source)
`stripe.source.create` generates a Stripe payment source with the given data. This endpoint enables you to use Giropay, Bitcoin, SEPA Direct Debit, Bancontact, SOFORT and so on. Check the Stripe.js documention for further information.

##### stripe.source.retrieve(source_id, client_secret)
`stripe.source.retrieve` lets you retrieve information (e.g. status) about a previously generated Stripe payment source.

#### Example usage of Stripe service

The following example leverages the flexible Stripe payment source API via our `ember-stripify` service.

```js
import Ember from 'ember';

const {
  Controller,
  inject: { service },
  get
} = Ember;

exports default Controller.extend({
  stripe: service(),

  actions: {
    pay() {
      // Get access to stripe service
      let stripe = get(this, 'stripe');

      // Create payment source
      // e.g. Giropay
      stripe.source.create({
        type: 'giropay',
        amount: 100,
        currency: 'EUR',
        owner: {
          name: 'Jon Doe',
        },
        redirect: {
          return_url: 'https://foo.bar/giropay/redirect',
        },
      })
      .then((result) => {
        // Do this...
      })
      .catch((result) => {
        // Do that...
      });
    }
  }
});
```
