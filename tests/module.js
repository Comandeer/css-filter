import * as lib from '../src/index';
import Filter from '../src/Filter';
import RuleParser from '../src/RuleParser';
import factory from '../src/factory';
import * as utils from '../src/utils';

describe( 'module', () => {
	it ( 'exports factory as default', () => {
		expect( lib.default ).to.equal( factory );
	} );

	it ( 'exports Filter', () => {
		expect( lib.Filter ).to.equal( Filter );
	} );

	it ( 'exports RuleParser', () => {
		expect( lib.RuleParser ).to.equal( RuleParser );
	} );

	it ( 'exports utils', () => {
		expect( lib.utils ).to.equal( utils );
	} );
} );
