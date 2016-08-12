/* global chai, fixture */

import { getHTMLFromDocumentFragment } from '../src/utils';
import { createDocumentFragmentFromString } from '../src/utils';
import { replaceElementWithChildren } from '../src/utils';
import { removeAllChildren } from '../src/utils';

const expect = chai.expect;

describe( 'getHTMLFromDocumentFragment', () => {
	before( () => {
		fixture.setBase( 'tests/support/fixtures' );
	} );

	afterEach( () => {
		fixture.cleanup();
	} );

	it( 'is a function', () => {
		expect( getHTMLFromDocumentFragment ).to.be.a( 'function' );
	} );

	it( 'requires DocumentFragment', () => {
		expect( () => {
			getHTMLFromDocumentFragment( '' );
		} ).to.throw( TypeError, 'HTML could be fetched only from DocumentFragment.' );

		expect( () => {
			getHTMLFromDocumentFragment( {} );
		} ).to.throw( TypeError, 'HTML could be fetched only from DocumentFragment.' );

		expect( () => {
			getHTMLFromDocumentFragment( document.createElement( 'body' ) );
		} ).to.throw( TypeError, 'HTML could be fetched only from DocumentFragment.' );

		expect( () => {
			getHTMLFromDocumentFragment( document.createDocumentFragment() );
		} ).to.not.throw( TypeError, 'HTML could be fetched only from DocumentFragment.' );
	} );

	it( 'returns correct HTML string', () => {
		const htmlFixture = fixture.load( 'documentFragment.html' );
		const docFragment = document.createDocumentFragment();

		docFragment.appendChild( htmlFixture[ 0 ] );

		expect( getHTMLFromDocumentFragment( docFragment ) ).to.equal( htmlFixture[ 0 ].outerHTML );
	} );
} );

describe( 'createDocumentFragmentFromString', () => {
	before( () => {
		fixture.setBase( 'tests/support/fixtures' );
	} );

	afterEach( () => {
		fixture.cleanup();
	} );

	it( 'is a function', () => {
		expect( createDocumentFragmentFromString ).to.be.a( 'function' );
	} );

	it( 'requires string', () => {
		expect( () => {
			createDocumentFragmentFromString( 1 );
		} ).to.throw( TypeError, 'DocumentFragment could be created only from string.' );

		expect( () => {
			createDocumentFragmentFromString( [] );
		} ).to.throw( TypeError, 'DocumentFragment could be created only from string.' );

		expect( () => {
			createDocumentFragmentFromString( document.createDocumentFragment() );
		} ).to.throw( TypeError, 'DocumentFragment could be created only from string.' );

		expect( () => {
			createDocumentFragmentFromString( 'test' );
		} ).to.not.throw( TypeError, 'DocumentFragment could be created only from string.' );
	} );

	it( 'creates the proper DocumentFragment', () => {
		const htmlFixture = fixture.load( 'documentFragment.html' );
		const docFragment = createDocumentFragmentFromString( htmlFixture[ 0 ].outerHTML );

		expect( docFragment ).to.be.instanceOf( DocumentFragment );
		expect( htmlFixture[ 0 ].outerHTML ).to.equal( getHTMLFromDocumentFragment( docFragment ) );
	} );
} );

describe( 'replaceElementWithChildren', () => {
	before( () => {
		fixture.setBase( 'tests/support/fixtures' );
	} );

	afterEach( () => {
		fixture.cleanup();
	} );

	it( 'is a function', () => {
		expect( replaceElementWithChildren ).to.be.a( 'function' );
	} );

	it( 'requires HTMLElement', () => {
		const htmlFixture = fixture.load( 'documentFragment.html' );

		expect( () => {
			replaceElementWithChildren( 1 );
		} ).to.throw( TypeError, 'Only HTMLElement could be replaced by its children.' );

		expect( () => {
			replaceElementWithChildren( [] );
		} ).to.throw( TypeError, 'Only HTMLElement could be replaced by its children.' );

		expect( () => {
			replaceElementWithChildren( document.createDocumentFragment() );
		} ).to.throw( TypeError, 'Only HTMLElement could be replaced by its children.' );

		expect( () => {
			replaceElementWithChildren( htmlFixture[ 0 ] );
		} ).to.not.throw( TypeError, 'Only HTMLElement could be replaced by its children.' );
	} );

	it( 'replaces element with its children', () => {
		const htmlFixture = fixture.load( 'children.html' );
		const html = htmlFixture[ 0 ].innerHTML;

		replaceElementWithChildren( htmlFixture[ 0 ] );

		expect( fixture.el.innerHTML ).to.equal( html );
	} );
} );

describe( 'removeAllChildren', () => {
	before( () => {
		fixture.setBase( 'tests/support/fixtures' );
	} );

	afterEach( () => {
		fixture.cleanup();
	} );

	it( 'is a function', () => {
		expect( removeAllChildren ).to.be.a( 'function' );
	} );

	it( 'requires HTMLElement or DocumentFragment', () => {
		expect( () => {
			removeAllChildren( 1 );
		} ).to.throw( TypeError, 'Only HTMLElement and DocumentFragment could have their children removed.' );

		expect( () => {
			removeAllChildren( [] );
		} ).to.throw( TypeError, 'Only HTMLElement and DocumentFragment could have their children removed.' );

		expect( () => {
			removeAllChildren( document.createElement( 'body' ) );
		} ).to.not.throw( TypeError, 'Only HTMLElement and DocumentFragment could have their children removed.' );

		expect( () => {
			removeAllChildren( document.createDocumentFragment() );
		} ).to.not.throw( TypeError, 'Only HTMLElement and DocumentFragment could have their children removed.' );
	} );

	it( 'removes all children from the element', () => {
		const htmlFixture = fixture.load( 'children.html' );

		removeAllChildren( htmlFixture[ 0 ] );

		expect( htmlFixture[ 0 ].innerHTML ).to.equal( '' );
	} );
} );
