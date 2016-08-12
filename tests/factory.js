import factory from '../src/factory';
import RuleParser from '../src/RuleParser';
import Filter from '../src/Filter';

describe( 'factory', () => {
	it( 'is a function', () => {
		expect( factory ).to.be.a( 'function' );
	} );

	it( 'returns new Filter instance with proper parser and rules', () => {
		const rules = [ 'a', 'b' ];
		const filter = factory( rules );

		expect( filter ).to.be.an.instanceOf( Filter );
		expect( filter.rules ).to.be.deep.equal( rules );
		expect( filter.parser ).to.be.an.instanceOf( RuleParser );
	} );
} );
