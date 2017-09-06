[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jorgecasar/payment-request)


# \<payment-request\> API component

[Payment Request API](https://w3c.github.io/browser-payment-api/) web component build with using Polymer. You can take a look the [demo page](https://jorgecasar.github.io/payment-request/components/payment-request/demo/) to see how it works.

**Note:** It isn't supported by all browser, check [Payment Request API browser support](http://caniuse.com/#feat=payment-request).

## Installation

Install the component using [Bower](http://bower.io/):

```sh
$ bower install payment-request --save
```

Or [download as ZIP](https://github.com/jorgecasar/payment-request/archive/master.zip).

## Usage

1. Import Web Components' polyfill and Payment Request API shim:

	```html
	<script src="bower_components/webcomponentsjs/webcomponents.js"></script>
	<script src="https://storage.googleapis.com/prshim/v1/payment-shim.js"></script>
	```

2. Import Custom Elements:

	```html
	<link rel="import" href="bower_components/payment-request/payment-request-all.html">
	```

3. Start using it!

	```html
	<payment-request label="Total" currency="EUR">
		<payment-method slot="method" supported='["basic-card"]' data='{
				"supportedNetwork": ["amex", "mastercard", "visa" ],
				"supportedTypes": ["debit", "credit"]
		}'></payment-method>
		<payment-item label="Item 1" currency="EUR" value="1337"></payment-item>
		<button id="buyButton">Buy</button>
	</payment-request>
	```

4. Validate payment data and complete payment request.

	```javascript
	function onLastResponseChange(evt) {
		var paymentResponse = evt.detail.value;
		// Make your request to server for a real purchase.
		// Complete the paymnet.
		// More info: https://www.w3.org/TR/payment-request/#complete-method
		paymentResponse.complete('success');
	}
	var paymentRequestElement = document.querySelector('payment-request');
	paymentRequestElement.addEventListener('last-response-change', onLastResponseChange);
	```

## Viewing component docs & demo

First, make sure you have the [polymer-serve](https://www.npmjs.com/package/polymer-serve) installed and serve the component:

```
$ polyserve --protocol https/1.1
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History


## Credits

- [Payment Request API](https://w3c.github.io/browser-payment-api/)
- [
Payment Request API: an Integration Guide](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/)

## License

[MIT License](https://opensource.org/licenses/MIT)
