# css-filter

[![Build Status](https://travis-ci.org/Comandeer/css-filter.svg?branch=master)](https://travis-ci.org/Comandeer/css-filter) [![Dependency Status](https://david-dm.org/Comandeer/css-filter.svg)](https://david-dm.org/Comandeer/css-filter) [![devDependency Status](https://david-dm.org/Comandeer/css-filter/dev-status.svg)](https://david-dm.org/Comandeer/css-filter#info=devDependencies)

Library for filtering HTML with CSS selectors.

---

## Installation

```bash
npm install @comandeer/css-filter [--save]
```
## Usage

Include script in your site:

```html
<script src="node_modules/@comandeer/css-filter/dist/css-filter.umd.js"></script>
```

Under `window.cssFilter` you will find our library with some fancy methods (see API docs for details).

The simplest way to use the library is to create filter using the factory:

```javascript
const filter = cssFilter.default( 'i' );
const filtered = filter.filter( `<div>
	<span>
		<i>Only i tag will be preserved</i>
	</span>
</div>` );

console.log( filtered.innerHTML ); // <i>Only i tag will be preserved</i>
```

All valid CSS selectors could be used as a rule (however not all valid CSS selectors make sense as such rules…).

## Documentation

API docs are available at http://comandeer.github.io/css-filter
