# css-filter

[![Build Status](https://travis-ci.org/Comandeer/css-filter.svg?branch=master)](https://travis-ci.org/Comandeer/css-filter) · [![Dependency Status](https://david-dm.org/Comandeer/css-filter.svg)](https://david-dm.org/Comandeer/css-filter) · [![devDependency Status](https://david-dm.org/Comandeer/css-filter/dev-status.svg)](https://david-dm.org/Comandeer/css-filter#info=devDependencies) · [![Known Vulnerabilities](https://snyk.io/test/github/bemquery/bemquery-package-boilerplate/badge.svg)](https://snyk.io/test/github/Comandeer/css-filter) · [![npm version]([![npm version](https://badge.fury.io/js/%40comandeer%2Fcss-filter.svg)](https://badge.fury.io/js/%40comandeer%2Fcss-filter))]([![npm version](https://badge.fury.io/js/%40comandeer%2Fcss-filter.svg)](https://badge.fury.io/js/%40comandeer%2Fcss-filter)) · [![Bower version](https://badge.fury.io/bo/css-filter.svg)](https://badge.fury.io/bo/css-filter) · [![codecov](https://codecov.io/gh/Comandeer/css-filter/branch/master/graph/badge.svg)](https://codecov.io/gh/Comandeer/css-filter)

Library for filtering HTML with CSS selectors.

---

## Installation

You can install this package from npm:
```bash
npm install @comandeer/css-filter [--save]
```
You can also install it from bower:
```bash
bower install css-filter
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
