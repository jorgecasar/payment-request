/*
  Prepare for 2.0
  <link rel="import" href="../polymer/lib/utils/flattened-nodes-observer.html">
*/
/**
`payment-request`
Payment request API implementation

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-selector/iron-selector.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer.js'
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="payment-request">
  <template>
    <style>
       :host {
        display: block;
      }
    </style>
    <slot id="methods" name="method"></slot>
    <slot id="total" name="total"></slot>
    <iron-selector id="shippingOptionsSelector" attr-for-selected="id" selected-attribute="selected" selected="{{shippingOptionSelected}}">
      <slot id="shippingOptions" name="shipping-option"></slot>
    </iron-selector>
    <slot id="buyButton" name="button"></slot>
    <slot id="items"></slot>
  </template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);

/**
 * Fired when user interaction begins for the payment request.
 *
 * @event response
 * @param {PaymentResponse} paymentResponse The payment information to process.
 */

/**
 * Fired when a PaymentRequest is created.
 *
 * @event request
 * @param {PaymentRequest} paymentRequest The payment request.
 */

/**
 * Fired when the payment request is aborted
 *
 * @event aborted
 */

/**
 * Fired when payment request generate an error.
 *
 * @event error
 * @param {Error} error The request error.
 */

/**
 * Fired when PaymentRequest object can be used to make a payment.
 *
 * @event can-make-payment
 */

/**
 * Fired when PaymentRequest object cannot be used to make a payment.
 *
 * @event cannot-make-payment
 */
export const PaymentRequestElement = class extends PolymerElement {
  static get is() {
    return 'payment-request';
  }

  static get importMeta() {
    return import.meta;
  }

  static get properties() {
    return {
      /**
       * This is a human-readable description of the total.
       * The user agent may display this to the user.
       */
      label: String,

      /**
       * A valid decimal monetary value containing a monetary amount of the total
       */
      value: Number,

      /**
       * A string containing a currency identifier of the total.
       * The value of currency can be any string that is valid within
       * the currency system indicated by currencySystem.
       */
      currency: {
        type: String,
        value: 'EUR'
      },

      /**
       * Contains line items for the payment request that the user agent may display.
       */
      items: {
        type: Array,
        readOnly: true,
        notify: true,
        value: () => {
          return [];
        },
      },

      /**
       * Contains the total amount of the payment request.
       */
      total: {
        type: Object,
        readOnly: true,
        notify: true,
        value: () => {
          return {};
        }
      },

      /**
       * Is used to store supported payment methods and
       * any associated payment method specific data for those methods.
       */
      methods: {
        type: Array,
        readOnly: true,
        value: () => {
          return [];
        }
      },

      /**
       * Provides information about the requested transaction.
       */
      details: {
        type: Object,
        computed: '_computeDetails(total, items, shippingItem)',
      },

      payerName: {
        type: Boolean,
        value: false
      },
      payerEmail: {
        type: Boolean,
        value: false
      },
      payerPhone: {
        type: Boolean,
        value: false
      },
      shipping: {
        type: Boolean,
        value: false
      },
      shippingType: {
        type: String,
        value: 'shipping'
      },

      options: {
        type: Object,
        computed: '_computeOptions(payerName, payerEmail, payerPhone, shipping, shippingType)'
      },

      shippingOptions: {
        type: Array,
        value: () => {
          return [];
        }
      },

      shippingOptionSelected: {
        type: String
      },

      shippingItem: {
        type: Object,
        value: () => {
          return null;
        }
      },

      lastRequest: {
        type: Object,
        notify: true,
        observer: '_dispatchRequest'
      },

      lastResponse: {
        type: Object,
        readOnly: true,
        notify: true,
        observer: '_dispatchResponse'
      },

      lastError: {
        type: Object,
        readOnly: true,
        notify: true,
        observer: '_dispatchError'
      },

      lastCanMakePayment: {
        type: Boolean,
        value: false,
        notify: true
      }
    }
  }

  static get observers() {
    return [
      '_updateTotal(items.length, shippingItem)',
      '_updateShippingOptions(shippingOptionSelected)',
      '_updateLastRequest(methods.*, details.*, options.*)',
      'checkCanMakePayment(methods, lastRequest)'
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    afterNextRender(this, this._updatePropertiesFromNodes);
    this.buyButtonTap = this.buyButtonTap.bind(this);
    this.onShippingAddressChange = this.onShippingAddressChange.bind(this);
    this.onShippingOptionChange = this.onShippingOptionChange.bind(this);
    this.__updatePropertyFromNodes = this.__updatePropertyFromNodes.bind(this);
    this.$.buyButton.addEventListener('tap', this.buyButtonTap);
  }

  disconnectedCallback() {
    super.connectedCallback();
    this.__unobserveNodes('methods');
    this.__unobserveNodes('items');
    this.__unobserveNodes('shippingOptions');
    this.$.buyButton.removeEventListener('tap', this.buyButtonTap);
  }

  _updatePropertiesFromNodes() {
    this.__observeNodes('methods');
    this.__observeNodes('items');
    this.__observeNodes('shippingOptions');
  }

  __updatePropertyFromNodes(observerInfo) {
    var property = observerInfo.target.id;
    if (!observerInfo) {
      observerInfo = {
        target: this.$[property],
        addedNodes: dom(this.$[property]).getDistributedNodes(),
        removedNodes: []
      };
      this.splice(property, 0, this[property].length - 1);
    }
    // Add items from added nodes
    observerInfo.addedNodes.filter(this._isElementNode).forEach(function(node) {
      this.splice(property, this[property].length, 0, node.dictionary);
    }.bind(this));
    // Remove items from removed nodes
    observerInfo.removedNodes.filter(this._isElementNode).forEach(function(node) {
      this.splice(property, this[property].indexOf(node.dictionary), 1);
    }.bind(this));
  }

  _isElementNode(node) {
    return (node.nodeType === Node.ELEMENT_NODE && node.dictionary);
  }

  __observerNode(node) {
    return '_' + node + 'Observer';
  }

  __observeNodes(property) {
    // Watch for future updates.
    if (!this[this.__observerNode(property)]) {
      this[this.__observerNode(property)] = new FlattenedNodesObserver(this.$[property], this.__updatePropertyFromNodes);
    }
  }

  __unobserveNodes(property) {
    if (this[this.__observerNode(property)]) {
      dom(this).unobserveNodes(this[this.__observerNode(property)]);
    }
  }

  _updateTotal() {
    var totalDom = dom(this.$.total);
    var total = totalDom.getDistributedNodes()[0];
    if (!total) {
      total = document.createElement('payment-item');
      total.setAttribute('slot', 'total');
      totalDom.appendChild(total);
      import(PaymentRequestElement.importMeta.url + '/../payment-item.js')
        .then(() => this._updateTotal())
        .catch((err) => console.error(err));
      return;
    }
    var currency = this.items.length && this.items[0]?
      this.items[0].amount.currency :
      this.currency;
    var value = 0;
    for (var i = 0; i < this.items.length; i++) {
      value += this.items[i] ? this.items[i].amount.value : 0;
    }
    if (this.shippingItem) {
      value += this.shippingItem.amount.value;
    }
    total.label = this.label || 'Total';
    total.value = value || 0;
    total.currency = currency || 'EUR';

    this._setTotal(total.dictionary);
  }

  _computeDetails(total, items, shippingItem) {
    return {
      total: total,
      displayItems: shippingItem ? items.concat(shippingItem): items
    };
  }

  _computeOptions(payerName, payerEmail, payerPhone, shipping, shippingType) {
    return {
      requestPayerName: payerName,
      requestPayerEmail: payerEmail,
      requestPayerPhone: payerPhone,
      requestShipping: shipping,
      shippingType: shippingType
    };
  }

  /**
   * Construct a PaymentRequest using the supplied methodData list including any
   * payment method specific data, the payment details, and the payment options
   *
   * @return  {PaymentRequest}
   */
  _updateLastRequest(methods, details, options) {
    methods = methods.base;
    details = details.base;
    options = options.base;
    this.updateLastRequest(methods, details, options);
  }

  updateLastRequest(methods, details, options) {
    methods = methods || this.methods;
    details = details || this.details;
    options = options || this.options;
    if (methods.length &&
        details.displayItems.length &&
        details.total.amount.currency &&
        window.PaymentRequest) {
      this.lastRequest = new PaymentRequest(methods, details, options);
      this.addRequestListeners();
    } else {
      this.lastRequest = null;
    }
  }

  addRequestListeners() {
    if (this.shipping) {
      this.lastRequest.addEventListener('shippingaddresschange', this.onShippingAddressChange);
      this.lastRequest.addEventListener('shippingoptionchange', this.onShippingOptionChange);
    }
  }

  removeRequestListeners() {
    if (this.shipping) {
      this.lastRequest.removeEventListener('shippingaddresschange', this.onShippingAddressChange);
      this.lastRequest.removeEventListener('shippingoptionchange', this.onShippingOptionChange);
    }
  }

  /**
   * Method executed when payButton is tapped.
   * You can override it to do something more complex.
   */
  buyButtonTap() {
    if ('PaymentRequest' in window) {
      this.show();
    } else {
      this._setLastError({
        detail: 'Payment Request API not supported'
      });
    }
  }

  /**
   * Determine if the PaymentRequest object can be used to make a payment.
   *
   * @return {Promise}
   */
  checkCanMakePayment(methods, lastRequest) {
    var promise;
    if (methods.length && lastRequest && lastRequest.canMakePayment) {
      promise = lastRequest.canMakePayment()
        .then(this.set.bind(this, 'lastCanMakePayment'))
        .then(this._setLastError.bind(this, null))
        .catch(this._setLastError.bind(this));
    } else {
      promise = new Promise(function(resolve, reject) {
        resolve();
      });
    }
    return promise;
  }

  /**
   * Begin user interaction for the payment request.
   *
   * @return {Promise}
   */
  show() {
    if (this.lastRequest) {
      return this.lastRequest.show()
        .then(this._setLastResponse.bind(this))
        .catch(this._setLastError.bind(this))
        .then(this.updateLastRequest.bind(this));
    } else {
      var detail;
      if (!this.methods.length) {
        detail = 'There aren\'t payment methods';
      } else if (!this.details.displayItems.length) {
        detail = 'There aren\'t items to pay';
      } else {
        detail = 'Payment Request wasn\'t be created';
      }
      this._setLastError({ detail: detail });
    }
  }

  /**
   * Abort the payment request
   * @return {Promise}
   */
  abort() {
    var promise;
    if (this.lastRequest) {
      promise = this.lastRequest.abort()
        .then(function() {
          this._setLastResponse(null);
          this.dispatchEvent(
            new CustomEvent('aborted')
          );
        }.bind(this));
    } else {
      promise = new Promise(function(resolve, reject) {
        resolve('There aren\'t any active request');
      });
    }
    return promise
      .catch(this._setLastError.bind(this));
  }

  onShippingAddressChange(evt) {
    evt.updateWith(this.updateWithShippingAddress(evt));
  }

  onShippingOptionChange(evt) {
    evt.updateWith(this.updateWithShippingOptions(evt));
  }

  updateWithShippingAddress(evt) {
    this.changeShippingOption(evt.target.shippingOption);
    this._updateTotal();
    this._updateShippingOptions();
    return Promise.resolve(this.details);
  }

  updateWithShippingOptions(evt) {
    this.changeShippingOption(evt.target.shippingOption);
    this._updateTotal();
    this._updateShippingOptions();
    return Promise.resolve(this.details);
  }

  changeShippingOption(shippingOption) {
    shippingOption = shippingOption || this.$.shippingOptionsSelector.selected;
    // Add shipping option to displayed items
    if (shippingOption) {
      this.$.shippingOptionsSelector.select(shippingOption);
      this.shippingItem = this.$.shippingOptionsSelector.selectedItem.dictionary;
    }
  }

  _updateShippingOptions() {
    this.set('details.shippingOptions', this.$.shippingOptionsSelector.items.map(function(item) {
      return item.dictionary;
    }));
  }

  _dispatchError(error) {
    if (error) {
      this.dispatchEvent(
        new CustomEvent('error', {
          detail: error
        })
      );
    }
    return error;
  }

  _dispatchResponse(response) {
    if (response !== null) {
      this.dispatchEvent(
        new CustomEvent('response', {
          detail: response
        })
      );
    }
    return response;
  }

  _dispatchRequest(request) {
    this.dispatchEvent(
      new CustomEvent('request', {
        detail: request
      })
    );
    return request;
  }

};

window.customElements.define(PaymentRequestElement.is, PaymentRequestElement);
