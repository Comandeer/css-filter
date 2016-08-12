import difference from 'lodash.difference';
import { createDocumentFragmentFromString } from './utils';
import { replaceElementWithChildren } from './utils';
import FilteredDocumentFragment from './FilteredDocumentFragment';

function checkParser( parser ) {
	if ( typeof parser !== 'object' || typeof parser.parse !== 'function' ) {
		throw new TypeError( 'Filter constructor requires proper rules\' parser as a 2. parameter.' );
	}
}

function parseRulesParam( rules ) {
	if ( typeof rules === 'string' ) {
		return [ rules ];
	} else if ( Array.isArray( rules ) ) {
		return rules;
	}

	throw new TypeError( 'Rules must be supplied to filter\'s constructor as a string or an array of strings.' );
}

function parseFilterInput( input ) {
	if ( input instanceof DocumentFragment ) {
		return input;
	}

	if ( input instanceof HTMLElement ) {
		const documentFragment = document.createDocumentFragment();

		documentFragment.appendChild( input );

		return documentFragment;
	}

	if ( typeof input === 'string' ) {
		return createDocumentFragmentFromString( input );
	}

	throw new TypeError( 'Filter method requires string, DocumentFragment or HTMLElement as an input.' );
}

/** Class performing the filtering. */
class Filter {
	/**
	 * Creates new filter's instance.
	 *
	 * @param {String|String[]} rules Rules passed as a string or an array of strings.
	 * @param {RuleParser|Object} parser Rules' syntax to CSS parser.
	 * @class
	 */
	constructor( rules, parser ) {
		checkParser( parser );

		this.rules = parseRulesParam( rules );
		this.parsedRule = null;
		this.parser = parser;
	}

	/**
	 * Add given rule to the current's filter instance.
	 *
	 * @param {String} rule Rule to be added.
	 * @param {Boolean} [disableReparse=false] Indicates if reparsing the rules should be forbidden.
	 * @return {undefined}
	 */
	addRule( rule, disableReparse = false ) {
		if ( typeof rule !== 'string' ) {
			throw new TypeError( 'New rule must be a string.' );
		}

		this.rules.push( rule );

		if ( this.parsedRule && !disableReparse ) {
			this._parseRules();
		}
	}

	/**
	 * Add given rules to the current's filter instance.
	 *
	 * @param {String[]} rules Rules to be added.
	 * @return {undefined}
	 */
	addRules( rules ) {
		if ( !Array.isArray( rules ) || rules.length < 1 ) {
			throw new TypeError( 'New rules must be passed inside an array.' );
		}

		for ( let rule of rules ) { // eslint-disable-line prefer-const
			this.addRule( rule, true );
		}

		if ( this.parsedRule ) {
			this._parseRules();
		}
	}

	/**
	 * Filters given HTML string/DocumentFragment using CSS selectors.
	 *
	 * @param {DocumentFragment|HTMLElement|String} input DocumentFragment will be constructed from
	 * this parameter.
	 * @return {FilteredDocumentFragment} Filtered DocumentFragment.
	*/
	filter( input ) {
		const documentFragment = parseFilterInput( input );
		const allElements = documentFragment.querySelectorAll( '*' );
		const filteredDocumentFragment = new FilteredDocumentFragment();

		if ( typeof this.parsedRule !== 'string' ) {
			this._parseRules();
		}

		const allowedElements = documentFragment.querySelectorAll( this.parsedRule );
		const elementsToRemove = difference( allElements, allowedElements );

		for ( let element of elementsToRemove ) { // eslint-disable-line prefer-const
			replaceElementWithChildren( element );
		}

		filteredDocumentFragment.appendChild( documentFragment );

		return filteredDocumentFragment;
	}

	/**
	 * Parsed filter's rules into valid CSS selectors using passed in parser.
	 *
	 * @return {undefined}
	 * @private
	 */
	_parseRules() {
		this.parsedRule = this.parser.join( this.rules.map( this.parser.parse ) );
	}
}

export default Filter;
