/* global chai */

import { default as RuleParser } from '../src/RuleParser';

const expect = chai.expect;

describe( 'RuleParser', () => {
	it( 'is a class', () => {
		expect( RuleParser ).to.be.a( 'function' );
	} );

	it( 'has method parse', () => {
		expect( RuleParser.prototype.parse ).to.be.a( 'function' );
	} );

	it( 'has method join', () => {
		expect( RuleParser.prototype.join ).to.be.a( 'function' );
	} );
} );

describe( 'RuleParser.prototype.parse', () => {
	it( 'properly parses rules syntax into pure CSS', () => {
		const parser = new RuleParser();
		const rules = {
			'b': 'b',
			'a, b, i': 'a, b, i',
			'a[href]': 'a[href]',
			'a[href^=http]': 'a[href^=http]',
			'b{background-color}': 'b[style*="background-color" i]',
			'{color}{opacity}': '[style*="color" i][style*="opacity" i]',
			':not([border])': ':not([border])',
			':not({color})': ':not([style*="color" i])'
		};

		Object.keys( rules ).forEach( ( rule ) => {
			expect( parser.parse( rule ) ).to.equal( rules[ rule ] );
		} );
	} );
} );

describe( 'RuleParser.prototype.join', () => {
	it( 'properly join rules', () => {
		const parser = new RuleParser();
		const rules = [
			'a',
			'b',
			'b[style=*="background-color" i]'
		];

		expect( parser.join( rules ) ).to.equal( rules.join( ', ' ) );
	} );
} );
