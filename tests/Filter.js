/* global chai, sinon, fixture */

import { default as Filter } from '../src/Filter';
import { default as RuleParser } from './support/mocks/RuleParser';
import { getHTMLFromDocumentFragment } from '../src/utils';
import { normalizeWhiteSpace } from './support/helpers';
import FilteredDocumentFragment from '../src/FilteredDocumentFragment';

const expect = chai.expect;

describe( 'Filter', () => {
	it( 'is a class', () => {
		expect( Filter ).to.be.a( 'function' );
	} );

	it( 'has private method _parseRules', () => {
		expect( Filter.prototype._parseRules ).to.be.a( 'function' );
	} );

	it( 'has method addRule', () => {
		expect( Filter.prototype.addRule ).to.be.a( 'function' );
	} );

	it( 'has method addRules', () => {
		expect( Filter.prototype.addRules ).to.be.a( 'function' );
	} );

	it( 'has method filter', () => {
		expect( Filter.prototype.filter ).to.be.a( 'function' );
	} );
} );

describe( 'Filter constructor', () => {
	it( 'requires strings or array of strings as a first param', () => {
		expect( () => {
			const parser = new RuleParser();
			new Filter( null, parser );
		} ).to.throw( TypeError, 'Rules must be supplied to filter\'s constructor as a string or an array of strings.' );

		expect( () => {
			const parser = new RuleParser();
			new Filter( 1, parser );
		} ).to.throw( TypeError, 'Rules must be supplied to filter\'s constructor as a string or an array of strings.' );
	} );

	it( 'requires proper rule parser as second param', () => {
		expect( () => {
			new Filter( '', 1 );
		} ).to.throw( TypeError, 'Filter constructor requires proper rules\' parser as a 2. parameter.' );

		expect( () => {
			new Filter( '', false );
		} ).to.throw( TypeError, 'Filter constructor requires proper rules\' parser as a 2. parameter.' );

		expect( () => {
			new Filter( '', {
				parse: 1
			} );
		} ).to.throw( TypeError, 'Filter constructor requires proper rules\' parser as a 2. parameter.' );

		expect( () => {
			new Filter( '', new RuleParser() );
		} ).to.not.throw( TypeError, 'Filter constructor requires proper rules\' parser as a 2. parameter.' );

		expect( () => {
			new Filter( '', {
				parse() {}
			} );
		} ).to.not.throw( TypeError, 'Filter constructor requires proper rules\' parser as a 2. parameter.' );
	} );

	it( 'properly saves passed rule without parsing', () => {
		const parser = new RuleParser();
		const filter = new Filter( 'b', parser );

		expect( filter.rules ).to.deep.equal( [ 'b' ] );
		expect( filter.parsedRule ).to.equal( null );
		expect( parser.parseCount ).to.equal( 0 );
		expect( parser.joinCount ).to.equal( 0 );
	} );

	it( 'properly saves passed rules without conversion', () => {
		const rules = [ 'a', 'b', 'c', 'd', 'e' ];
		const parser = new RuleParser();
		const filter = new Filter( rules, parser );

		expect( filter.rules ).to.deep.equal( rules );
		expect( filter.parsedRule ).to.equal( null );
		expect( parser.parseCount ).to.equal( 0 );
		expect( parser.joinCount ).to.equal( 0 );
	} );
} );

describe( 'Filter.prototype._parseRules', () => {
	it( 'parses existing rules to form valid CSS selector', () => {
		const rules = [ 'a', 'b', 'c', 'd' ];
		const parser = new RuleParser();
		const filter = new Filter( rules, parser );

		expect( filter.rules ).to.deep.equal( rules );
		expect( filter.parsedRule ).to.equal( null );
		expect( parser.parseCount ).to.equal( 0 );
		expect( parser.joinCount ).to.equal( 0 );

		filter._parseRules();

		expect( filter.rules ).to.deep.equal( rules );
		expect( filter.parsedRule ).to.equal( 'abcd' );
		expect( parser.parseCount ).to.equal( 4 );
		expect( parser.joinCount ).to.equal( 1 );
	} );
} );

describe( 'Filter.prototype.addRule', () => {
	it( 'requires string', () => {
		const parser = new RuleParser();
		const filter = new Filter( '', parser );

		expect( () => {
			filter.addRule( null );
		} ).to.throw( TypeError, 'New rule must be a string.' );

		expect( () => {
			filter.addRule( 1 );
		} ).to.throw( TypeError, 'New rule must be a string.' );

		expect( () => {
			filter.addRule( [] );
		} ).to.throw( TypeError, 'New rule must be a string.' );

		expect( () => {
			filter.addRule( {} );
		} ).to.throw( TypeError, 'New rule must be a string.' );

		expect( () => {
			filter.addRule( 'a' );
		} ).to.not.throw( TypeError, 'New rule must be a string.' );
	} );

	it( 'properly converts rule and adds it to the existing rule', () => {
		const parser = new RuleParser();
		const filter = new Filter( 'd', parser );

		filter.addRule( 'q' );

		expect( filter.rules ).to.deep.equal( [ 'd', 'q' ] );
		expect( filter.parsedRule ).to.equal( null );
		expect( parser.parseCount ).to.equal( 0 );
		expect( parser.joinCount ).to.equal( 0 );
	} );

	it( 'forces reparsing of rules if there is existing version of parsed CSS selector', () => {
		const parser = new RuleParser();
		const filter = new Filter( 'd', parser );

		filter._parseRules();
		parser.parseCount = parser.joinCount = 0;
		sinon.spy( filter, '_parseRules' );

		filter.addRule( 'q' );

		expect( filter.rules ).to.deep.equal( [ 'd', 'q' ] );
		expect( filter.parsedRule ).to.equal( 'dq' );
		expect( parser.parseCount ).to.equal( 2 );
		expect( parser.joinCount ).to.equal( 1 );
		expect( filter._parseRules ).to.have.been.calledOnce;
	} );

	it( 'does not force reparsing of rules if the second parameter is set to true', () => {
		const parser = new RuleParser();
		const filter = new Filter( 'd', parser );

		filter._parseRules();
		parser.parseCount = parser.joinCount = 0;
		sinon.spy( filter, '_parseRules' );

		filter.addRule( 'q', true );

		expect( filter.rules ).to.deep.equal( [ 'd', 'q' ] );
		expect( filter.parsedRule ).to.equal( 'd' );
		expect( parser.parseCount ).to.equal( 0 );
		expect( parser.joinCount ).to.equal( 0 );
		expect( filter._parseRules ).to.have.not.been.called;
	} );
} );

describe( 'Filter.prototype.addRules', () => {
	it( 'requires non-empty array', () => {
		const parser = new RuleParser();
		const filter = new Filter( '', parser );

		expect( () => {
			filter.addRules( null );
		} ).to.throw( TypeError, 'New rules must be passed inside an array.' );

		expect( () => {
			filter.addRules( 1 );
		} ).to.throw( TypeError, 'New rules must be passed inside an array.' );

		expect( () => {
			filter.addRules( 'a' );
		} ).to.throw( TypeError, 'New rules must be passed inside an array.' );

		expect( () => {
			filter.addRules( {} );
		} ).to.throw( TypeError, 'New rules must be passed inside an array.' );

		expect( () => {
			filter.addRules( [] );
		} ).to.throw( TypeError, 'New rules must be passed inside an array.' );

		expect( () => {
			filter.addRules( [ 'a' ] );
		} ).to.not.throw( TypeError, 'New rules must be passed inside an array.' );
	} );

	it( 'properly converts rules and adds them to the existing rule', () => {
		const parser = new RuleParser();
		const filter = new Filter( 'd', parser );

		filter.addRules( [ 'e', 'q', 'z' ] );

		expect( filter.rules ).to.deep.equal( [ 'd', 'e', 'q', 'z' ] );
		expect( filter.parsedRule ).to.equal( null );
		expect( parser.parseCount ).to.equal( 0 );
		expect( parser.joinCount ).to.equal( 0 );
	} );

	it( 'forces reparsing of rules if there is existing version of parsed CSS selector', () => {
		const parser = new RuleParser();
		const filter = new Filter( 'd', parser );

		filter._parseRules();
		parser.parseCount = parser.joinCount = 0;
		sinon.spy( filter, '_parseRules' );

		filter.addRules( [ 'e', 'q', 'z' ] );

		expect( filter.rules ).to.deep.equal( [ 'd', 'e', 'q', 'z' ] );
		expect( filter.parsedRule ).to.equal( 'deqz' );
		expect( parser.parseCount ).to.equal( 4 );
		expect( parser.joinCount ).to.equal( 1 );
		expect( filter._parseRules ).to.have.been.calledOnce;
	} );
} );

describe( 'Filter.prototype.filter', () => {
	before( () => {
		fixture.setBase( 'tests/support/fixtures' );
	} );

	afterEach( () => {
		fixture.cleanup();
	} );

	it( 'requires DocumentFragment, HTMLElement or string', () => {
		const parser = new RuleParser();
		const filter = new Filter( '', parser );

		expect( () => {
			filter.filter( 1 );
		} ).to.throw( TypeError, 'Filter method requires string, DocumentFragment or HTMLElement as an input.' );

		expect( () => {
			filter.filter( [] );
		} ).to.throw( TypeError, 'Filter method requires string, DocumentFragment or HTMLElement as an input.' );

		expect( () => {
			filter.filter( {} );
		} ).to.throw( TypeError, 'Filter method requires string, DocumentFragment or HTMLElement as an input.' );

		expect( () => {
			filter.filter( 'test' );
		} ).to.not.throw( TypeError, 'Filter method requires string, DocumentFragment or HTMLElement as an input.' );

		expect( () => {
			filter.filter( document.createElement( 'body' ) );
		} ).to.not.throw( TypeError, 'Filter method requires string, DocumentFragment or HTMLElement as an input.' );

		expect( () => {
			filter.filter( document.createDocumentFragment() );
		} ).to.not.throw( TypeError, 'Filter method requires string, DocumentFragment or HTMLElement as an input.' );
	} );

	it( 'triggers rules parsing', () => {
		const rules = [ 'a', 'b', 'c', 'd', 'e' ];
		const parser = new RuleParser();
		const filter = new Filter( rules, parser );

		filter.filter( '' );

		expect( filter.rules ).to.deep.equal( rules );
		expect( filter.parsedRule ).to.equal( 'abcde' );
		expect( parser.parseCount ).to.equal( 5 );
		expect( parser.joinCount ).to.equal( 1 );
	} );

	it( 'returns instance of FilteredDocumentFragment with filtered HTML for DocumentFragment', () => {
		const htmlFixture = fixture.load( 'filter.html' );
		const documentFragment = document.createDocumentFragment();
		const parser = new RuleParser();
		const filter = new Filter( '[data-to]:not(p), span[id], i', parser );

		documentFragment.appendChild( htmlFixture[ 0 ].children[ 0 ] );

		const result = filter.filter( documentFragment );

		expect( result ).to.be.instanceOf( FilteredDocumentFragment );
		expect( normalizeWhiteSpace( getHTMLFromDocumentFragment( result ) ) ).to.equal(
			normalizeWhiteSpace( htmlFixture[ 1 ].innerHTML ) );
	} );

	it( 'returns instance of FilteredDocumentFragment with filtered HTML for HTMLElement', () => {
		const htmlFixture = fixture.load( 'filter.html' );
		const parser = new RuleParser();
		const filter = new Filter( '[data-to]:not(p), span[id], i', parser );

		const result = filter.filter( htmlFixture[ 0 ].children[ 0 ] );

		expect( result ).to.be.instanceOf( FilteredDocumentFragment );
		expect( normalizeWhiteSpace( getHTMLFromDocumentFragment( result ) ) ).to.equal(
			normalizeWhiteSpace( htmlFixture[ 1 ].innerHTML ) );
	} );

	it( 'returns instance of FilteredDocumentFragment with filtered HTML for HTML code', () => {
		const htmlFixture = fixture.load( 'filter.html' );
		const parser = new RuleParser();
		const filter = new Filter( '[data-to]:not(p), span[id], i', parser );

		const result = filter.filter( htmlFixture[ 0 ].children[ 0 ].innerHTML );

		expect( result ).to.be.instanceOf( FilteredDocumentFragment );
		expect( normalizeWhiteSpace( getHTMLFromDocumentFragment( result ) ) ).to.equal(
			normalizeWhiteSpace( htmlFixture[ 1 ].innerHTML ) );
	} );
} );
