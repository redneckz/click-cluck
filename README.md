# click-cluck

Postpones "click" event to prevent it in case of "dblclick" event

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Bundle size][bundlephobia-image]][bundlephobia-url]

## Installation

```shell
npm install --save @redneckz/click-cluck
```

## How-to

### Pure JS Example

```html
<div role="row" id="the-best-product">
  <span role="cell">The best price ever!<span>
  <span role="cell">Give me two!<span>
</div>
```

```javascript
import { ClickCluck } from '@redneckz/click-cluck';

const theBestProduct = ClickCluck(document.getElementById('the-best-product'));

theBestProduct.onclick = () => console.log('Just wait a bit...');
theBestProduct.ondblclick = () => console.log('Need a package?');
```

Press twice intermittently. And you will get:

```console
Just wait a bit...
Just wait a bit...
```

Make double click. And here it is:

```console
Need a package?
```

Also timeout can be configured:

```javascript
const theBestProduct = ClickCluck(
  document.getElementById('the-best-product'),
  500, // 500ms by default
);
```

# License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://badge.fury.io/js/%40redneckz%2Fclick-cluck.svg
[npm-url]: https://www.npmjs.com/package/%40redneckz%2Fclick-cluck
[travis-image]: https://travis-ci.org/redneckz/click-cluck.svg?branch=master
[travis-url]: https://travis-ci.org/redneckz/click-cluck
[coveralls-image]: https://coveralls.io/repos/github/redneckz/click-cluck/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/redneckz/click-cluck?branch=master
[bundlephobia-image]: https://badgen.net/bundlephobia/min/@redneckz/click-cluck
[bundlephobia-url]: https://bundlephobia.com/result?p=@redneckz/click-cluck
