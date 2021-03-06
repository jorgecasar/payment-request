import {PolymerElement} from '@polymer/polymer/polymer-element.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="payment-shipping-option">
  <template>
    <style>
       :host {
        display: none;
      }
    </style>

  </template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);

export const PaymentShippingOption = class extends PolymerElement {

  static get is() {
    return 'payment-shipping-option';
  }
  static get properties() {
    return {
      id: String,
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
        readOnly: true,
        computed: '_computeAmount(value, currency, currencySystem)'
      },

      /**
       * This is set to true to indicate that this is the default
       * selected PaymentShippingOption in a sequence
       */
      selected: {
        type: Boolean,
        value: false
      },

      dictionary: {
        type: Object,
        computed: '_computeDictionary(id, label, amount, selected)'
      }
    };
  }

  _computeAmount(value, currency, currencySystem) {
    return {
      value: value,
      currency: currency,
      currencySystem: currencySystem
    };
  }

  _computeDictionary(id, label, amount, selected) {
    return {
      id: id,
      label: label,
      amount: amount,
      selected: selected
    };
  }
};

window.customElements.define(PaymentShippingOption.is, PaymentShippingOption);
