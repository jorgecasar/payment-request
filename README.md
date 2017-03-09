# \<payment-request\>

[Payment Request API](https://w3c.github.io/browser-payment-api/) implementation in Polymer. You can take a look the [demo page](https://jorgecasar.github.io/payment-request/components/payment-request/demo/).

Note: It isn't supported by all browser, check [Payment Request API browser support](http://caniuse.com/#feat=payment-request).

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
	<link rel="import" href="bower_components/payment-request/payment-request.html">
  <link rel="import" href="bower_components/payment-request/payment-item.html">
	```

3. Start using it!

	```html
	<payment-request>
		<payment-method
			supported='["basic-card"]'
			data='{
				"supportedNetwork": ["amex", "mastercard", "visa" ],
				"supportedTypes": ["debit", "credit"]
			}'></payment-method>
    <payment-item class="item" label="Item 1" currency="EUR" value="1337"></payment-item>
    <button id="buyButton">Buy</button>
  </payment-request>
	```

## Viewing component docs & demo

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed and serve the component:

```
$ polymer serve
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

## License

Copyright 2017

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.