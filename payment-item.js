import { PolymerElement } from '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="payment-item">
  <template>
    <style>
      :host {
        display: none;
      }
    </style>
  </template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);

/*
`payment-item`
PaymentItem dictionary implementation from browser payment API
*/
export const PaymentItem = class extends PolymerElement {

  static get is() {
    return 'payment-item';
  }

  static get properties() {
    return {
      /**
       * This is a human-readable description of the item.
       * The user agent may display this to the user.
       */
      label: String,
      /**
       * A valid decimal monetary value containing a monetary amount of the item.
       */
      value: Number,
      /**
       * A string containing a currency identifier of the item.
       * The value of currency can be any string that is valid within
       * the currency system indicated by currencySystem.
       */
      currency: String,

      /**
       * A URL that indicates the currency system
       * that the currency identifier belongs to
       */
      currencySystem: {
        type: String,
        value: 'urn:iso:std:iso:4217'
      },

      /**
       * Contain the monetary amount for the item.
       */
      amount: {
        type: Object,
        computed: '_computeAmount(value, currency, currencySystem)'
      },

      /**
       * When set to true this flag means that the amount member is not final.
       * This is commonly used to show items such as shipping or tax amounts
       * that depend upon selection of shipping address or shipping option.
       */
      pending: {
        type: Boolean,
        value: false
      },

      dictionary: {
        type: Object,
        computed: '_computeDictionary(label, amount, pending)'
      }
    }
  }

  _computeAmount(value, currency, currencySystem) {
    return {
      value: value,
      currency: currency,
      currencySystem: currencySystem
    };
  }

  _computeDictionary(label, amount, pending) {
    return {
      label: label,
      amount: amount,
      pending: pending
    };
  }
};

window.customElements.define(PaymentItem.is, PaymentItem);
