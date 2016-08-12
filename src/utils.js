/** @module utils */

/**
 * Gets HTML from `DocumentFragment`.
 *
 * @param {DocumentFragment} documentFragment `DocumentFragment`.
 * @return {String} HTML string.
 */
function getHTMLFromDocumentFragment( documentFragment ) {
	if ( !( documentFragment instanceof DocumentFragment ) ) {
		throw new TypeError( 'HTML could be fetched only from DocumentFragment.' );
	}

	const elem = document.createElement( 'body' );

	elem.appendChild( documentFragment );

	return elem.innerHTML;
}

/**
 * Creates `DocumentFragment` from given HTML string.
 *
 * @param {String} html HTML string.
 * @return {DocumentFragment} Proper `DocumentFragment`.
 */
function createDocumentFragmentFromString( html ) {
	if ( typeof html !== 'string' ) {
		throw new TypeError( 'DocumentFragment could be created only from string.' );
	}

	const range = document.createRange();

	return range.createContextualFragment( html );
}

/**
 * Replaces element with its children.
 *
 * @param {HTMLElement} element DOM element.
 * @return {undefined}
 */
function replaceElementWithChildren( element ) {
	if ( !( element instanceof HTMLElement ) ) {
		throw new TypeError( 'Only HTMLElement could be replaced by its children.' );
	}

	const parent = element.parentNode;

	while ( element.firstChild ) {
		parent.insertBefore( element.firstChild, element );
	}

	parent.removeChild( element );
}

/**
 * Remove all children from element.
 *
 * @param {HTMLElement|DocumentFragment} element HTML element with children to be deleted.
 * @return {undefined}
 */
function removeAllChildren( element ) {
	if ( !( element instanceof HTMLElement ) && !( element instanceof DocumentFragment ) ) {
		throw new TypeError( 'Only HTMLElement and DocumentFragment could have their children removed.' );
	}

	while ( element.firstChild ) {
		element.removeChild( element.firstChild );
	}
}

export { getHTMLFromDocumentFragment };
export { createDocumentFragmentFromString };
export { replaceElementWithChildren };
export { removeAllChildren };
