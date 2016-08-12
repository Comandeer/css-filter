import { getHTMLFromDocumentFragment } from './utils';
import { removeAllChildren } from './utils';
import { createDocumentFragmentFromString } from './utils';

/** Represents filtered DOM tree */
class FilteredDocumentFragment extends DocumentFragment {
	/**
	 * Creates new instance of filter's results.
	 *
	 * @extends DocumentFragment
	 * @class
	 */
	constructor() {
		super();

		/**
		 * Allows to get or set the content of the `DocumentFragment` as a HTML code.
		 *
		 * @name innerHTML
		 * @type {String}
		 * @memberof FilteredDocumentFragment
		 * @instance
		 */
		Object.defineProperty( this, 'innerHTML', {
			get() {
				return getHTMLFromDocumentFragment( this );
			},

			set( value ) {
				const documentFragment = createDocumentFragmentFromString( value );

				removeAllChildren( this );
				this.appendChild( documentFragment );
			}
		} );
	}
}

export default FilteredDocumentFragment;
