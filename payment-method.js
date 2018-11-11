/*
`payment-method`
PaymentMethodData dictionary implementation from browser payment API
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="payment-method">
  <template>
    <style>
      :host {
        display: none;
      }
    </style>
  </template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);

export const PaymentMethod = class extends PolymerElement {

  static get is() {
    return 'payment-method';
  }

  static get properties() {
    return {
      supported: {
        type: Array
      },
      data: {
        type: Object,
        value: function() {
          return {};
        }
      },
      dictionary: {
        type: Object,
        computed: '_computeDictionary(supported, data)'
      }
    }
  }

  _computeDictionary(supported, data) {
    return {
      supportedMethods: supported,
      data: data
    };
  }
};

window.customElements.define(PaymentMethod.is, PaymentMethod);
