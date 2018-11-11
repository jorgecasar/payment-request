import { PolymerElement } from '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="payment-address">
  <template>
    <style>
      :host {
        display: none;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

export const PaymentAddressElement = class extends PolymerElement {
  static get is() {
    return 'payment-address';
  }
  static get properties() {
    return {
      country: String,
      addressLine: Array,
      region: String,
      city: String,
      dependentLocality: String,
      postalCode: String,
      sortingCode: String,
      languageCode: String,
      organization: String,
      recipient: String,
      phone: String
    };
  }
};

window.customElements.define(PaymentAddressElement.is, PaymentAddressElement);
