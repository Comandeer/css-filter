/* global chai, fixture */

import FilteredDocumentFragment from '../src/FilteredDocumentFragment';
import { getHTMLFromDocumentFragment } from '../src/utils';

const expect = chai.expect;

describe( 'FilteredDocumentFragment', () => {
	it( 'is a class', () => {
		expect( FilteredDocumentFragment ).to.be.a( 'function' );
	} );

	it( 'has innerHTML property', () => {
		const documentFragment = new FilteredDocumentFragment();

		expect( documentFragment.innerHTML ).to.be.a( 'string' );
	} );
} );

describe( 'FilteredDocumentFragment#innerHTML', () => {
	before( () => {
		fixture.setBase( 'tests/support/fixtures' );
	} );

	afterEach( () => {
		fixture.cleanup();
	} );

	it( 'reflects the content of DocumentFragment', () => {
		const htmlFixture = fixture.load( 'documentFragment.html' );
		const html = htmlFixture[ 0 ].outerHTML;
		const documentFragment = new FilteredDocumentFragment();

		documentFragment.appendChild( htmlFixture[ 0 ] );

		expect( documentFragment.innerHTML ).to.equal( html );
	} );

	it( 'allows to set the content of DocumentFragment', () => {
		const htmlFixture = fixture.load( 'documentFragment.html' );
		const html = 'qwerty';
		const documentFragment = new FilteredDocumentFragment();

		documentFragment.appendChild( htmlFixture[ 0 ] );
		documentFragment.innerHTML = html;

		expect( getHTMLFromDocumentFragment( documentFragment ) ).to.equal( html );
	} );
} );
